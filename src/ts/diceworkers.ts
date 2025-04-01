const checkForCritical = (dice: number[]) => {
  if (dice.length === 1) return 0;

  return dice.every((die) => die === 1)
    ? -1
    : dice.every((die) => die >= 6 && die === dice.at(0))
      ? 1
      : 0;
};

const handleClick = async (btn: string, id: string) => {
  switch (btn) {
    case 'basicattack':
    case 'weaponattack':
    case 'spell':
    case 'ritual':
    case 'check':
    case 'checkrepeat':
    case 'initiative':
    case 'ability':
      return rollAction(btn, id);
    default:
      return sendToChat(btn, id);
  }
};

const getSendChatRequest = (key: string, id: string) => {
  const entries = Object.entries(CLICK_LISTENERS);
  const entry: string[] = entries.filter(([rpt, val]) => key === val).at(0) ?? [''];
  const fieldset = entry.at(0).split(':').at(0);

  let request: string[];
  let prefix: string = '';
  if (fieldset.includes('repeating')) {
    prefix = `${fieldset}_${id}_`;
    const attributes = ACTION_REQUEST[key].reduce(
      (memo: { [key: string]: string }, v: string) => ((memo[v] = prefix + v), memo),
      {}
    );
    request = Object.values(attributes);
  } else {
    request = ACTION_REQUEST[key] ?? [];
  }

  return { request, prefix };
};

const chatData = (key: string, prefix: string, values: { [key: string]: string }) => {
  const attrPrefix = (function () {
    switch (key) {
      case 'otheractionchat':
        return 'action_';
      case 'specialrulechat':
        return 'special_';
      case 'raregearchat':
        return 'raregear_';
      case 'armorchat':
      case 'npcarmorchat':
        return 'armor_';
      case 'shieldchat':
      case 'npcshieldchat':
        return 'shield_';
      case 'accessorychat':
        return 'accessory_';
      case 'weaponattack':
      case 'weaponchat':
        return 'weapon_';
      case 'basicattack':
        return 'attack_';
      case 'spell':
        return 'spell_';
      case 'ritual':
        return 'ritual_';
      case 'skill1':
      case 'skill2':
      case 'skill3':
      case 'skill4':
      case 'skill5':
      case 'skill6':
        return `class_${key}_`;
      case 'bond1':
      case 'bond2':
      case 'bond3':
      case 'bond4':
      case 'bond5':
      case 'bond6':
      case 'artifact':
      case 'creature':
      case 'discovery':
      case 'feature':
      case 'friend':
      case 'location':
      case 'note':
      case 'project':
      case 'quest':
      case 'quirk':
      case 'zero':
        return `${key}_`;
    }
  })();

  return ACTION_REQUEST[key]?.reduce(
    (memo: { [key: string]: string }, attr: string) => (
      (memo[attr.replace(attrPrefix, '')] = values[prefix + attr]), memo
    ),
    {}
  );
};

const signedInteger = (value: string | number): string => {
  return +value < 0 ? `${value}` : `+${value}`;
};

const simpleTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};
  template.name = values.name;

  if (values.special) template.special = values.special;
  if (values.effect) template.effect = values.effect;

  return template;
};

const armorTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string | number } = {};

  let martial = values.is_martial === 'on';
  if (martial) {
    template.def = +values.defense || 0;
    template.martial = 'true';
  } else {
    template.def = 'DEX size ' + signedInteger(+values.defense_bonus || 0);
  }

  template.name = values.name;
  template.mdef = 'INS size ' + signedInteger(+values.magic_defense_bonus || 0);
  template.init = signedInteger(+values.initiative || 0);
  template.cost = values.cost;

  if (values.special) template.special = values.special;
  if (values.effect) template.effect = values.effect;

  return template;
};

const shieldTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};

  let martial = values.is_martial === 'on';
  if (martial) {
    template.martial = 'true';
  }

  template.name = values.name;
  template.def = signedInteger(+values.defense_bonus || 0);
  template.mdef = signedInteger(+values.magic_defense_bonus || 0);
  template.init = signedInteger(+values.initiative || 0);
  template.cost = values.cost;

  if (values.special) template.special = values.special;
  if (values.effect) template.effect = values.effect;

  return template;
};

const fabulaAccuracy = (att1: string, att2: string, accuracy: string | number) => {
  if (att2) return `【${att1}+${att2}】` + (accuracy != 0 ? signedInteger(accuracy) : '');

  return `【${att1}】` + (accuracy != 0 ? signedInteger(accuracy) : '');
};

const fabulaDamage = (damage: string | number) => {
  const hr = getTranslationByKey('hr') || 'HR';
  return `【${hr}${signedInteger(damage)}】`;
};

const weaponTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};

  let martial = values.is_martial === 'on';
  if (martial) {
    template.martial = 'true';
  }

  template[values.range] = 'true';

  template.type = getTranslationByKey(values.type) || values.type;
  template.category = getTranslationByKey(values.category) || values.category;

  template.name = values.name;
  template.cost = values.cost;

  const att1_i18n = getTranslationByKey(values.attr1) || values.attr;
  const att2_i18n = getTranslationByKey(values.attr2) || values.attr;
  const accuracy = fabulaAccuracy(att1_i18n, att2_i18n, values.accuracy);
  const damage = fabulaDamage(values.damage);

  template.accuracy = accuracy;
  template.damage = damage;

  template.hands = values.hands;

  if (values.special) template.special = values.special;
  if (values.effect) template.effect = values.effect;

  return template;
};

const studyTemplate = (chat: string, values: { [key: string]: string }) => {
  const study = +chat.match(/\d+/)?.shift();
  const template: { [key: string]: string } = {};

  template.action = getTranslationByKey('study') || 'Study';
  template.study = 'true';

  // The NPCs Rank, Species, maximum HP, and maximum MP.
  if (study >= STUDY_THRESHOLDS[0]) {
    template.rank = getTranslation(values.rank, values.rank);
    template.species = getTranslation(values.species, values.species);
    template.hp_max = values.hp_max;
    if (+values.hp <= +values.hp_crisis) template.crisis = 'true';

    template.mp_max = values.mp_max;
    template.special = values.description;
  }

  // All the above, plus Traits, Attributes, Defense, Magic Defense, Affinities.
  if (study >= STUDY_THRESHOLDS[1]) {
    template.traits = values.traits;
    Object.keys(ATTR_ABBREVIATIONS).forEach((attr) => {
      template[attr] = values[`${attr}_max`];
    });

    template.def = values.defense;
    template.mdef = values.magic_defense;

    AFFINITIES.forEach((affinity) => {
      if (values[affinity] !== '') {
        template[affinity] = getTranslation(values[affinity], values[affinity]);
      }
    });
  }

  // All the above, plus basic attacks and spells.
  if (study >= STUDY_THRESHOLDS[2]) {
    template.basicattacks = '// TODO Reveal Basic Attacks';
    template.spells = '// TODO Reveal Spells';
  }

  return template;
};

const bondTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};

  template.action = getTranslationByKey('bond') || 'Bond';
  template.name = values.name;
  template.level = values.level;

  template.bond = 'true';
  template.approval = getTranslationByKey(values.approval) || '';
  template.allegiance = getTranslationByKey(values.allegiance) || '';
  template.fondness = getTranslationByKey(values.fondness) || '';

  template.special = values.description;

  return template;
};

const classTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};

  const benefitValue = CLASS_BENEFIT[values.class_benefit];
  const benefitUpper = values.class_benefit.toUpperCase();

  template.benefit =
    getTranslationByKey(`plus${benefitUpper}`) || `+${benefitValue} ${benefitUpper}`;
  template.name = values.class_name;
  template.character_level = values.character_level;
  template.level = values.class_level;

  template.effect = values.class_skills_taken;
  template.special = values.class_description;

  return template;
};

const skillTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};

  template.name = values.name;
  template.subtitle = `【${values.class_name}】`;
  template.level = values.level;

  template.special = values.description;

  return template;
};

const fabulaPointsTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};

  const current = +values.fabula_points ?? 0;
  const newValue = current - 1;
  const fabula_points = getTranslationByKey('fabula_points') || 'Fabula Points';

  if (newValue >= 0) {
    template.name = `${fabula_points} (${current} - 1 = ${newValue})`;
    template.special = values.spend_fabula_points;
    setAttrs({ spend_fabula_points: '', fabula_points: newValue }, { silent: true });
  } else {
    template.name = `${fabula_points} (0)`;
    template.special = getTranslationByKey('spend_fabula_failed') || 'No fabula points...';
  }

  return template;
};

const inventoryTemplate = (item: string, values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};
  const data = INVENTORY_DATA[item];

  template.name = getTranslationByKey(item) || data.label;
  template.special = getTranslationByKey(`${item}_effect`) || data.effect;
  template.cost = data.cost;
  template[item] = 'true';
  template.action = getTranslationByKey('item') || 'Item';

  return template;
};

const projectTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};

  template.name = values.name;
  template.subtitle = `${values.clock} / ${values.clock_max}`;

  template.cost = values.cost;
  template.special = values.special;

  template.action = getTranslation('projects', 'Projects');

  return template;
};

const quirkTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};

  template.name = values.name;
  template.subtitle = values.type;

  template.special = values.description;
  template.effect = values.effect;

  template.action = getTranslation('quirk_name', 'Quirk');

  return template;
};

const zeroPowerTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};

  template.name = values.name;
  template.subtitle = `${values.clock} / ${values.clock_max}`;
  template.description = values.description;

  template.zeropower = 'true';

  const per_trigger = getTranslation('per_trigger', 'per Trigger');

  template.trigger = `${values.trigger} (+${values.trigger_step} ${per_trigger})`;
  template.trigger_effect = values.trigger_effect;
  template.effect = values.effect;
  template.effect_description = values.effect_description;

  template.action = getTranslation('zero_power', 'Zero Power');

  return template;
};

const featureTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};

  template.name = values.name;
  template.subtitle = `【${values.class}】`;

  template.feature1 = values.detail1;
  template.feature2 = values.detail2;
  template.feature3 = values.detail3;

  // template.action = getTranslation('projects', undefined);

  return template;
};

const sendToChat = async (chat: string, id: string) => {
  const { request, prefix } = getSendChatRequest(chat, id);
  console.group('sendToChat');
  console.log(request, prefix);
  getAttrs([...ROLLTEMPLATE_REQUESTS, ...request], (v) => {
    const avatar = v['character_avatar'].replace(/\?\d+$/g, '');
    const action = getTranslationByKey('info') || 'Info';

    const data = chatData(chat, prefix, v);
    console.log('data => ', data);
    const template = (function () {
      switch (chat) {
        case 'armorchat':
        case 'npcarmorchat':
          return armorTemplate(data);
        case 'shieldchat':
        case 'npcshieldchat':
          return shieldTemplate(data);
        case 'weaponchat':
          return weaponTemplate(data);
        case 'study7':
        case 'study10':
        case 'study13':
          return studyTemplate(chat, data);
        case 'bond1':
        case 'bond2':
        case 'bond3':
        case 'bond4':
        case 'bond5':
        case 'bond6':
          return bondTemplate(data);
        case 'classchat':
          return classTemplate(data);
        case 'skill1':
        case 'skill2':
        case 'skill3':
        case 'skill4':
        case 'skill5':
        case 'skill6':
          return skillTemplate(data);
        case 'fabulapoints':
          return fabulaPointsTemplate(data);
        case 'elixir':
        case 'remedy':
        case 'tonic':
        case 'elementalshard':
        case 'magictent':
          return inventoryTemplate(chat, data);
        case 'project':
          return projectTemplate(data);
        case 'feature':
          return featureTemplate(data);
        case 'quirk':
          return quirkTemplate(data);
        case 'zero':
          return zeroPowerTemplate(data);
        case 'otheractionchat':
        case 'specialrulechat':
        case 'raregearchat':
        case 'notechat':
        default:
          return simpleTemplate(data);
      }
    })();

    console.log('template => ', template);

    chimeraRoll(
      'fabula-chat',
      {
        avatar: avatar,
        sheet_type: v.sheet_type,
        action: action,
        character: `@{character_name}`,
        ...template,
      },
      {},
      ({ rollId, results }) => {
        finishRoll(rollId, results);
      }
    );
  });
  console.groupEnd();
};

const rollAction = async (btn: string, id: string) => {
  const { request, prefix } = getSendChatRequest(btn, id);
  getAttrs([...ROLLTEMPLATE_REQUESTS, ...request], (v) => {
    const avatar = v['character_avatar'].replace(/\?\d+$/g, '');

    const data = chatData(btn, prefix, v);
    const template = (function () {
      switch (btn) {
        case 'basicattack':
        case 'weaponattack':
          return basicAttackTemplate(data);
        case 'spell':
          return spellTemplate(data);
        case 'ritual':
          return ritualTemplate(data);
        case 'ability':
          return abilityTemplate(id, data);
        case 'check':
        default:
          return customCheckTemplate(id, data);
      }
    })();

    const i18n = {
      action: getTranslation('action', 'Action'),
      att1: getTranslation(template.att1, template.att1.toUpperCase()),
      att2: '',
      hr: getTranslation('hr', 'HR'),
      dmg: getTranslation('dmg', 'DMG'),
      mod: getTranslation('mod', 'MOD'),
    };

    if (template.att2) {
      i18n.att2 = getTranslation(template.att2, template.att2.toUpperCase());
    }

    const accuracy = template.accuracy ?? 0;
    const accuracyLabel = fabulaAccuracy(i18n.att1, i18n.att2, accuracy);
    const damage = template.damage ?? 0;
    const damageLabel = fabulaDamage(damage);

    // include roll modifier from settings
    const rollmods = v.roll_mods === 'on' && !template.noaction ? ` + ?{${i18n.mod}|0}` : ``;

    const accuracyRoll =
      `1d@{${template.att1}}[${i18n.att1}]` +
      (template.att2 ? `+ 1d@{${template.att2}}[${i18n.att1}]` : '') +
      `+ ${accuracy} ${rollmods}`;

    const rolls: { [key: string]: string } = {};
    if (!template.noaction) {
      rolls.roll = accuracyRoll;
      rolls.damage = `0[${i18n.hr}] + ${damage}[${i18n.dmg}]`;
      rolls.critical = `0`;
    }

    chimeraRoll(
      'fabula-attack',
      {
        avatar: avatar,
        sheet_type: v.sheet_type,
        action: i18n.action,
        character: `@{character_name}`,
        check: accuracyLabel,
        hr: damageLabel,

        ...template,
      },
      rolls,
      ({ rollId, results }) => {
        if (!Object.keys(results).length) return finishRoll(rollId, results);

        const hr = results.roll.dice.reduce((memo, die) => Math.max(memo, die), 0);
        const critical = checkForCritical(results.roll.dice);

        finishRoll(rollId, {
          damage: hr + results.damage.result,
          critical: critical,
        });
      }
    );
  });
};

const basicAttackTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};
  template.name = values.attack_name || values.name;
  template.att1 = values.attr1;
  template.att2 = values.attr2;
  template.accuracy = values.accuracy_total;
  template.damage = values.damage_total;

  template[values.range] = values.range;
  template.type = getTranslation(values.type) || values.type;
  template.special = values.special;

  template.action = getTranslation('attack', 'Attack');
  return template;
};

const spellTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};
  template.name = values.name;
  template.att1 = values.attr1;
  template.att2 = values.attr2;
  template.accuracy = values.accuracy_total;
  template.damage = values.damage_total;

  const noaction = values.is_offensive === 'on' ? null : 'noaction';
  template[noaction] = 'noaction';

  template.spell = 'spell';
  template.type = getTranslation(values.type) || values.type;

  template.mp = values.mp;
  template.target = values.target;
  template.duration = values.duration;
  template.special = values.effect;

  template.action = getTranslationByKey('spell') || 'Spell';
  return template;
};

const ritualTemplate = (values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};
  template.name = values.name;
  template.att1 = values.attr1;
  template.att2 = values.attr2;
  template.accuracy = values.accuracy_total;

  template.mp = values.mp;
  template.potency = getTranslation(values.potency, values.potency);
  template.area = getTranslation(values.area, values.area);
  template.disciple = getTranslation(values.disciple, values.disciple);

  const dl = getTranslation('ritual_difficulty', 'DL');
  template.vs = `[[${values.difficulty}[${dl}]]]`;

  template.special = values.effect;

  template.nodamage = 'nodamage';
  template.ritual = 'ritual';

  template.action = getTranslationByKey('ritual') || 'Ritual';
  return template;
};

const abilityTemplate = (ability: string, values: { [key: string]: string }) => {
  const template: { [key: string]: string } = {};
  template.name = getTranslation(`${ability}_title`, ability);
  template.att1 = ability;

  template.nodamage = 'nodamage';

  template.action = getTranslationByKey('check') || 'Check';
  return template;
};

const customCheckTemplate = (action: string, values: { [key: string]: string }) => {
  const check = action.split('_').at(-1);

  const template: { [key: string]: string } = {};
  if (Object.hasOwn(COMMON_CHECKS, check)) {
    const [att1, att2] = COMMON_CHECKS[check].attrs as string[2];
    template.att1 = att1;
    template.att2 = att2;
    template.name = (getTranslationByKey(action) || COMMON_CHECKS[check].label)
      .match(/^[^【]+/)
      .shift();
    template.special = getTranslationByKey(`${action}_title`) || COMMON_CHECKS[check].title;
    template.accuracy = values[COMMON_CHECKS[check].accuracy];
  } else {
    template.att1 = values.check_attr1;
    template.att2 = values.check_attr2;

    const name = values.check_description;
    const custom = getTranslationByKey('custom') || 'Custom';
    template.name = name || custom;

    setAttrs({ check_description: '' }, { silent: true });
  }

  template.nodamage = 'nodamage';

  return template;
};
