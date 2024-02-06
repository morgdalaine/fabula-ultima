const checkForCritical = (dice: number[]) => {
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
      return rollAction(btn, id);
    case 'otheractionchat':
    case 'specialrulechat':
    case 'raregearchat':
    case 'notechat':
    case 'weaponchat':
    case 'shieldchat':
    case 'armorchat':
      return sendToChat(btn, id);
  }
};

const rollAction = async (action: string, id: string) => {
  switch (action) {
    case 'basicattack':
      return rollBasicAttack(id);
    case 'weaponattack':
      return rollWeaponAttack(id);
    case 'spell':
      return rollSpellAction(id);
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
    const attributes = SEND_TO_CHAT[key].reduce(
      (memo: { [key: string]: string }, v: string) => ((memo[v] = prefix + v), memo),
      {}
    );
    request = Object.values(attributes);
  } else {
    request = SEND_TO_CHAT[key];
  }

  return { request, prefix };
};

const chatData = (chat: string, prefix: string, values: { [key: string]: string }) => {
  const attrPrefix = (function () {
    switch (chat) {
      case 'otheractionchat':
        return 'action_';
      case 'specialrulechat':
        return 'special_';
      case 'raregearchat':
        return 'raregear_';
      case 'notechat':
        return 'note_';
      case 'armorchat':
        return 'armor_';
      case 'shieldchat':
        return 'shield_';
      case 'weaponchat':
        return 'weapon_';
    }
  })();

  return SEND_TO_CHAT[chat].reduce(
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
  const template: { [key: string]: string } = {};

  let martial = values.is_martial === 'on';
  if (martial) {
    template.def = values.defense;
    template.martial = 'true';
  } else {
    template.def = 'DEX size ' + signedInteger(values.defense_bonus);
  }

  template.name = values.name;
  template.mdef = 'INS size ' + signedInteger(values.magic_defense_bonus);
  template.init = signedInteger(values.initiative);
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
  template.def = signedInteger(values.defense_bonus);
  template.mdef = signedInteger(values.magic_defense_bonus);
  template.init = signedInteger(values.initiative);
  template.cost = values.cost;

  if (values.special) template.special = values.special;
  if (values.effect) template.effect = values.effect;

  return template;
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
  const hr_i18n = getTranslationByKey('hr') || 'HR';

  const accuracy =
    `【 ${att1_i18n} + ${att2_i18n}` +
    (+values.accuracy > 0 ? ` + ${values.accuracy}` : ``) +
    ` 】`;
  const damage = `【 ${hr_i18n} + ${values.damage + values.extra_damage} 】`;

  template.accuracy = accuracy;
  template.damage = damage;

  template.hands = values.hands;

  if (values.special) template.special = values.special;
  if (values.effect) template.effect = values.effect;

  return template;
};

const sendToChat = async (chat: string, id: string) => {
  const { request, prefix } = getSendChatRequest(chat, id);
  getAttrs([...ROLLTEMPLATE_REQUESTS, ...request], (v) => {
    const avatar = v['character_avatar'].replace(/\?\d+$/g, '');
    const action = getTranslationByKey('info') || 'Info';

    const data = chatData(chat, prefix, v);
    const template = (function () {
      switch (chat) {
        case 'otheractionchat':
        case 'specialrulechat':
        case 'raregearchat':
        case 'notechat':
          return simpleTemplate(data);
        case 'armorchat':
          return armorTemplate(data);
        case 'shieldchat':
          return shieldTemplate(data);
        case 'weaponchat':
          return weaponTemplate(data);
      }
    })();

    chimeraRoll(
      'fabula-chat',
      {
        avatar: avatar,
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
};

// TODO prettier code / consolidation across makeRolls
const rollBasicAttack = async (id: string) => {
  const prefix = `repeating_basic-attacks_${id}_`;
  const attributes = SEND_TO_CHAT.basicattack.reduce(
    (memo: { [key: string]: string }, v: string) => ((memo[v] = prefix + v), memo),
    {}
  );

  const request = Object.values(attributes);
  getAttrs([...ROLLTEMPLATE_REQUESTS, ...request], (v) => {
    const att1 = v[prefix + 'attack_attr1'];
    const att2 = v[prefix + 'attack_attr2'];

    const att1_i18n = getTranslationByKey(att1) || att1;
    const att2_i18n = getTranslationByKey(att2) || att2;

    const hr_i18n = getTranslationByKey('hr') || 'HR';
    const dmg_i18n = getTranslationByKey('dmg') || 'DMG';

    const accuracy = +v[prefix + 'attack_accuracy_total'] ?? 0;
    const damage = v[prefix + 'attack_damage_total'];

    const action = getTranslationByKey('attack') || 'Attack';
    const range = v[prefix + 'attack_range'];

    const accuracyRoll =
      `【 ${att1_i18n} + ${att2_i18n}` + (accuracy > 0 ? ` + ${accuracy}` : ``) + ` 】`;
    const damageRoll = `【 ${hr_i18n} + ${damage} 】`;

    const avatar = v['character_avatar'].replace(/\?\d+$/g, '');

    chimeraRoll(
      'fabula-attack',
      {
        avatar: avatar,
        action: action,
        character: `@{character_name}`,
        name: v[prefix + 'attack_name'],
        type: getTranslationByKey(v[prefix + 'attack_type']) || '',
        special: v[prefix + 'attack_special'],
        check: accuracyRoll,
        hr: damageRoll,

        [range]: range,
      },
      {
        roll: `1d@{${att1}}[${att1_i18n}] + 1d@{${att2}}[${att2_i18n}] + ${accuracy}`,
        damage: `0[${hr_i18n}] + ${damage}[${dmg_i18n}]`,
        critical: '0',
      },
      ({ rollId, results }) => {
        // HR + damage
        const hr = results.roll.dice.reduce((memo, die) => Math.max(memo, die), 0);
        const critical = checkForCritical(results.roll.dice);

        finishRoll(rollId, {
          // TODO calculate VU and RS damage
          damage: hr + results.damage.result,
          critical: critical,
        });
      }
    );
  });
};

const rollWeaponAttack = async (id: string) => {
  const prefix = `repeating_weapons_${id}_`;
  const attributes = SEND_TO_CHAT.weaponattack.reduce(
    (memo: { [key: string]: string }, v: string) => ((memo[v] = prefix + v), memo),
    {}
  );

  const request = Object.values(attributes);
  getAttrs([...ROLLTEMPLATE_REQUESTS, ...request], (v) => {
    const att1 = v[prefix + 'weapon_attr1'];
    const att2 = v[prefix + 'weapon_attr2'];

    const attackName = v[prefix + 'weapon_attack_name'] || v[prefix + 'weapon_name'];

    const att1_i18n = getTranslationByKey(att1) || att1;
    const att2_i18n = getTranslationByKey(att2) || att2;

    const hr_i18n = getTranslationByKey('hr') || 'HR';
    const dmg_i18n = getTranslationByKey('dmg') || 'DMG';

    const accuracy = +v[prefix + 'weapon_accuracy_total'] ?? 0;
    const damage = v[prefix + 'weapon_damage_total'];

    const action = getTranslationByKey('attack') || 'Attack';
    const range = v[prefix + 'weapon_range'];

    const accuracyRoll =
      `【 ${att1_i18n} + ${att2_i18n}` + (accuracy > 0 ? ` + ${accuracy}` : ``) + ` 】`;
    const damageRoll = `【 HR + ${damage} 】`;

    const avatar = v['character_avatar'].replace(/\?\d+$/g, '');

    chimeraRoll(
      'fabula-attack',
      {
        avatar: avatar,
        action: action,
        character: `@{character_name}`,
        name: attackName,
        type: getTranslationByKey(v[prefix + 'weapon_type']) || '',
        special: v[prefix + 'weapon_special'],
        check: accuracyRoll,
        hr: damageRoll,

        [range]: range,
      },
      {
        roll: `1d@{${att1}}[${att1_i18n}] + 1d@{${att2}}[${att2_i18n}] + ${accuracy}`,
        damage: `0[${hr_i18n}] + ${damage}[${dmg_i18n}]`,
        critical: '0',
      },
      ({ rollId, results }) => {
        // HR + damage
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

const rollSpellAction = async (id: string) => {
  const prefix = `repeating_spells_${id}_`;
  const attributes = SEND_TO_CHAT.spell.reduce(
    (memo: { [key: string]: string }, v: string) => ((memo[v] = prefix + v), memo),
    {}
  );

  const request = Object.values(attributes);
  getAttrs([...ROLLTEMPLATE_REQUESTS, ...request], (v) => {
    const att1 = v[prefix + 'spell_attr1'];
    const att2 = v[prefix + 'spell_attr2'];

    const attackName = v[prefix + 'spell_attack_name'] || v[prefix + 'spell_name'];

    const att1_i18n = getTranslationByKey(att1) || att1;
    const att2_i18n = getTranslationByKey(att2) || att2;

    const hr_i18n = getTranslationByKey('hr') || 'HR';
    const dmg_i18n = getTranslationByKey('dmg') || 'DMG';

    const accuracy = +v[prefix + 'spell_accuracy_total'] ?? 0;
    const damage = v[prefix + 'spell_damage_total'];

    const action = getTranslationByKey('spell') || 'Spell';
    const range = 'spell';

    const accuracyRoll =
      `【 ${att1_i18n} + ${att2_i18n}` + (accuracy > 0 ? ` + ${accuracy}` : ``) + ` 】`;
    const damageRoll = `【 HR + ${damage} 】`;

    const avatar = v['character_avatar'].replace(/\?\d+$/g, '');

    const noaction = v[prefix + 'spell_is_offensive'] === 'on' ? null : 'noaction';

    chimeraRoll(
      'fabula-attack',
      {
        avatar: avatar,
        action: action,
        character: `@{character_name}`,
        name: attackName,
        type: getTranslationByKey(v[prefix + 'spell_type']) || '',
        mp: v[prefix + 'spell_mp'],
        target: v[prefix + 'spell_target'],
        duration: v[prefix + 'spell_duration'],
        special: v[prefix + 'spell_effect'],
        check: accuracyRoll,
        hr: damageRoll,

        [range]: range,
        [noaction]: 'true',
      },
      {
        roll: `1d@{${att1}}[${att1_i18n}] + 1d@{${att2}}[${att2_i18n}] + ${accuracy}`,
        damage: `0[${hr_i18n}] + ${damage}[${dmg_i18n}]`,
        critical: '0',
      },
      ({ rollId, results }) => {
        // HR + damage
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
