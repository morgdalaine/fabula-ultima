const handleCalculations = (attr: string, eventInfo: EventInfo) => {
  switch (attr) {
    case 'dexterity':
    case 'insight':
    case 'might':
    case 'willpower':
      return calculateAttribute(attr);

    case 'hp':
      return calculateMaxHP();
    case 'mp':
      return calculateMaxMP();
    case 'ip':
      return calculateMaxIP();
    case 'ultima_points':
      return calculateUltimaPoints();

    case 'initiative':
      return calculateInitiative();

    case 'defense':
    case 'magic_defense':
      return calculateDefenses();

    case 'basic_attacks':
      return calculateBasicAccuracyDamage();
    case 'weapons':
      return calculateWeaponAccuracyDamage();
    case 'spells':
      return calculateSpellAccuracyDamage();
    case 'rituals':
      return calculateRitualAccuracyDifficulty();

    case 'level':
      return calculateCharacterLevel();
    case 'bonds':
      return calculateBondLevels();

    case 'equipped':
      return manageEquipment(eventInfo);

    case 'villain':
      return makeVillainString();

    case 'projects':
      return calculateProjectClock(eventInfo);
  }
};

enum ControlEnum {
  ADD = +1,
  SUBTRACT = -1,
}

const isFieldEmpty = (attr: string, request: string[]) => {
  getAttrs(request, (v) => {
    const isEmpty = Object.values(v).every((val) => !String(val).trim() || val === 'none') ? 0 : 1;
    setAttrs({ [attr]: isEmpty }, { silent: true });
  });
};

const makeVillainString = () => {
  getAttrs(ATTR_WATCH.villain, (v) => {
    const villainKey = `villain_${v.villain}`;
    const villain = getTranslation(villainKey);
    const phase_i18n = getTranslation('phase', 'Phase');
    const phase = v.phases ? `${phase_i18n} ${v.phases}` : null;
    const multipart = v.multipart;

    const update: Record<string, any> = {};
    update.villainous = [villain, phase, multipart].reduce(
      (memo: string, val) => (val ? memo + (memo.length ? ' ⬥ ' : '') + val : memo),
      ''
    );

    setAttrs(update, { silent: true });
  });
};

const calculateProjectClock = (eventInfo: EventInfo) => {
  if (eventInfo.sourceType === 'sheetworker') return;
  const rowId = RepeatingModule.getRepId(eventInfo.sourceAttribute);
  const request = ATTR_WATCH.projects.map((attr) => attr.replace(':', `_${rowId}_`));

  const prefix = `repeating_projects_${rowId}_project_`;
  getAttrs(request, (v) => {
    const update: Record<string, any> = {};
    const cost = +v[prefix + 'cost'] || 0;

    const clock = +v[prefix + 'clock'] || 0;
    const clock_max = Math.floor(cost / 100);

    update[prefix + 'clock_max'] = clock_max;
    if (clock > clock_max) {
      update[prefix + 'clock'] = clock_max;
    }

    setAttrs(update, { silent: true });
  });
};

const advanceProjectClock = (rowId: string, change: ControlEnum) => {
  const request = ATTR_WATCH.projects.map((attr) => attr.replace(':', `_${rowId}_`));
  const prefix = `repeating_projects_${rowId}_project_`;
  getAttrs(request, (v) => {
    const update: Record<string, any> = {};
    const clock = +v[prefix + 'clock'] || 0;
    const clock_max = +v[prefix + 'clock_max'] || 0;

    update[prefix + 'clock'] = Math.max(0, Math.min(clock_max, clock + change));

    setAttrs(update, { silent: true });
  });
};

const calculateAllAttributes = () => {
  Object.keys(ATTR_ABBREVIATIONS).forEach((attr) => calculateAttribute(attr));
};

const calculateAttribute = (attr: string) => {
  const request: string[] = ATTR_WATCH[attr];
  getAttrs(request, (v) => {
    const die = calculateStatusEffects(attr, v);
    setAttrs({ [attr]: die });
  });
};

const calculateStatusEffects = (attr: string, v: Record<string, string>) => {
  const die = +v[`${attr}_max`] || 0;
  const currentStep = DIE_SIZES.findIndex((size) => size == die);

  const immunities = ATTR_WATCH[attr]
    .filter((a) => a.includes('immunity') && v[a] === 'on')
    .map((a) => a.replace(/_\w+/, ''));
  // Remove base attribute and any immunities from calculation
  const statuses = ATTR_WATCH[attr].filter(
    (a) => !a.includes('max') && !a.includes('immunity') && !immunities.includes(a)
  );
  const debuffs = statuses.reduce(
    (memo, status) => memo + (v[status] === 'on' ? STATUS_EFFECTS[status] : 0),
    0
  );

  const newSize = Math.max(0, Math.min(DIE_SIZES.length - 1, currentStep + debuffs));
  return DIE_SIZES.at(newSize);
};

/**
 * HP Max = (might_base * 5) + level + hp_other
 * @param request
 */
const calculateMaxHP = (setCurrent: boolean = false) => {
  getAttrs(ATTR_WATCH.hp, (v) => {
    if (!['character', 'bestiary'].includes(v.sheet_type)) return;
    const update: Record<string, any> = {};

    const might_max: number = +v.might_max || 0;
    const level: number = +v.level || 0;
    const hp_extra: number = +v.hp_extra || 0;
    const class_hp_total: number = +v.class_hp_total || 0;

    let hp_max: number;
    if (v.sheet_type === 'character') {
      hp_max = might_max * 5 + level + hp_extra + class_hp_total;
    }
    if (v.sheet_type === 'bestiary') {
      hp_max = might_max * 5 + level * 2 + hp_extra;
    }

    update.hp_max = hp_max;
    update.hp_crisis = Math.floor(hp_max / 2);
    if (setCurrent) update.hp = hp_max;

    setAttrs(update, { silent: true });
  });
};

/**
 * MP Max = (willpower_base * 5) + level + mp_other
 * @param request
 */
const calculateMaxMP = (setCurrent: boolean = false) => {
  getAttrs(ATTR_WATCH.mp, (v) => {
    if (!['character', 'bestiary'].includes(v.sheet_type)) return;
    const update: Record<string, any> = {};

    const willpower_max: number = +v.willpower_max || 0;
    const level: number = +v.level || 0;
    const mp_extra: number = +v.mp_extra || 0;
    const class_mp_total: number = +v.class_mp_total || 0;

    let mp_max: number;
    if (v.sheet_type === 'character') {
      mp_max = willpower_max * 5 + level + mp_extra + class_mp_total;
    }
    if (v.sheet_type === 'bestiary') {
      mp_max = willpower_max * 5 + level + mp_extra;
    }

    update.mp_max = mp_max;
    if (setCurrent) update.mp = mp_max;

    setAttrs(update, { silent: true });
  });
};

/**
 * IP Max = 6 + ip_other
 * @param request
 */
const calculateMaxIP = (setCurrent: boolean = false) => {
  getAttrs(ATTR_WATCH.ip, (v) => {
    if (v.sheet_type !== 'character') return;
    const update: Record<string, any> = {};

    const ip_extra: number = +v.ip_extra || 0;
    const class_ip_total: number = +v.class_ip_total || 0;
    const ip_max = 6 + ip_extra + class_ip_total;

    update.ip_max = ip_max;
    if (setCurrent) update.ip = ip_max;

    setAttrs(update, { silent: true });
  });
};

const calculateUltimaPoints = () => {
  getAttrs(ATTR_WATCH.ultima_points, (v) => {
    if (v.sheet_type !== 'bestiary') return;

    const villain: string = v.villain ?? '';
    const ultima_points = VILLAIN_ULTIMA_POINTS[villain] || 0;
    setAttrs({ ultima_points }, { silent: true });
  });
};

const updatePoints = (attr: string, sign: ControlEnum) => {
  getAttrs([attr, `${attr}_max`, `${attr}-control`], (v) => {
    const xp: number = +v[attr] || 0;
    const xp_max: number = +v[`${attr}_max`] || 0;
    const xp_control: number = +v[`${attr}-control`] || 0;

    const update = Math.max(0, Math.min(xp_max, xp + xp_control * sign));
    setAttrs({ [attr]: update, [`${attr}-control`]: 1 }, { silent: true });
  });
};

// TODO Finish method
const manageEquipment = (eventInfo: EventInfo) => {
  if (eventInfo.sourceType === 'sheetworker') return;

  RepeatingModule.getAllAttrs(
    CHARACTER_EQUIPMENTS,
    EQUIPMENT_REQUESTS,
    (attributes: Record<string, string>, sections) => {
      let handsUsed = 0;
      const update: Record<string, any> = {};
      const sourceFieldset = eventInfo?.sourceAttribute.split('_').at(1);
      const sourceId = eventInfo?.sourceAttribute.split('_').at(2);
      ['repeating_armors', 'repeating_shields', 'repeating_accessories'].forEach((fieldset) => {
        sections[fieldset].forEach((id) => {
          const prefix = `${fieldset}_${id}_${SECTION_PREFIX[fieldset]}`;

          if (fieldset.includes(sourceFieldset) && id != sourceId) {
            update[prefix + 'is_equipped'] = '0';
          } else {
          }
        });
      });

      if (handsUsed > 2) {
        console.warn(`I hope you've got ${handsUsed} hands in that coat.`);
      }

      setAttrs(update, { silent: true }, () => calculateDefenses());
    }
  );
};

const calculateDefenses = () => {
  RepeatingModule.getAllAttrs(
    CHARACTER_EQUIPMENTS,
    EQUIPMENT_REQUESTS,
    (attributes: Record<string, string>, sections) => {
      const sheet_type = attributes.sheet_type;
      if (!['character', 'bestiary'].includes(sheet_type)) return;

      const dexterity: number = +attributes.dexterity || 0;
      const defense_extra: number = +attributes.defense_extra || 0;
      const insight: number = +attributes.insight || 0;
      const magic_defense_extra: number = +attributes.magic_defense_extra || 0;

      let defense = dexterity;
      let magic_defense = insight;
      let initiative_total = 0;

      if (sheet_type === 'character') {
        ['repeating_armors', 'repeating_shields'].forEach((fieldset) => {
          sections[fieldset].forEach((id) => {
            const prefix = `${fieldset}_${id}_${SECTION_PREFIX[fieldset]}`;
            const is_martial: boolean = attributes[prefix + 'is_martial'] === 'on';
            const is_equipped: boolean = attributes[prefix + 'is_equipped'] == 'on';
            const initiative: number = +attributes[prefix + 'initiative'] || 0;

            initiative_total += initiative;

            if (is_equipped) {
              // defense
              if (is_martial && fieldset === 'repeating_armors') {
                defense = +attributes[prefix + 'defense'] || 0;
              } else {
                defense += +attributes[prefix + 'defense_bonus'] || 0;
              }

              magic_defense += +attributes[prefix + 'magic_defense_bonus'] || 0;
            }
          });
        });

        defense += defense_extra;
        magic_defense += magic_defense_extra;
      } else if (sheet_type === 'bestiary') {
        const is_martial: boolean = attributes.armor_is_martial === 'on';
        const armor_defense: number = +attributes.armor_defense || 0;
        const armor_defense_bonus: number = +attributes.armor_defense_bonus || 0;
        const shield_defense_bonus: number = +attributes.shield_defense_bonus || 0;

        const armor_initiative: number = +attributes.armor_initiative || 0;
        const shield_initiative: number = +attributes.shield_initiative || 0;
        initiative_total = armor_initiative + shield_initiative;

        defense =
          (is_martial ? armor_defense : dexterity + armor_defense_bonus) +
          shield_defense_bonus +
          defense_extra;

        const armor_magic_defense_bonus: number = +attributes.armor_magic_defense_bonus || 0;
        const shield_magic_defense_bonus: number = +attributes.shield_magic_defense_bonus || 0;

        magic_defense =
          insight + armor_magic_defense_bonus + shield_magic_defense_bonus + magic_defense_extra;
      }

      setAttrs({ defense, magic_defense, initiative_total }, { silent: true }, () =>
        calculateInitiative()
      );
    }
  );
};

const calculateCharacterLevel = () => {
  RepeatingModule.getAllAttrs(
    CHARACTER_SKILL_LEVEL,
    ATTR_WATCH.level,
    (attributes: Record<string, string>, sections) => {
      if (attributes.sheet_type != 'character') return;

      const update: { [key: string]: string | number } = {};
      const martialequip: { [key: string]: string | number } = {};
      let characterLevel = 0;

      const free_benefits: { [key: string]: number } = {
        hp: 0,
        mp: 0,
        ip: 0,
      };

      sections.repeating_classes.forEach((id) => {
        const prefix = `repeating_classes_${id}_`;

        const keys = Object.keys(attributes).filter((key) => key.includes(id));
        const classLevel = keys.reduce((memo, level) => {
          return memo + (level.includes('level') ? +attributes[level] : 0);
        }, 0);

        // martial proficiency
        MARTIAL_PROFICIENCIES.forEach((prof) => {
          const val = attributes[prefix + `class_` + prof];
          if (val === 'on' && !Object.hasOwn(martialequip, prof)) {
            martialequip[prof] = getTranslationByKey(`class_` + prof) || prof;
          }
        });

        const benefit = attributes[prefix + 'class_benefit'];
        free_benefits[benefit] += CLASS_BENEFIT[benefit];

        characterLevel += classLevel;
        update[prefix + 'class_level'] = classLevel;

        // builid a string of current class levels
        const skillsTaken: string[] = [];
        [1, 2, 3, 4, 5].forEach((skill) => {
          const skillPrefix = `class_skill${skill}_`;
          const skillName = attributes[prefix + skillPrefix + 'name'];
          const skillLevel = attributes[prefix + skillPrefix + 'level'];
          if (+skillLevel > 0) {
            const sl = +skillLevel > 1 ? ` (SL ${skillLevel})` : '';
            skillsTaken.push(`${skillName}${sl}`);
          }
        });

        update[prefix + 'class_skills_taken'] = skillsTaken.join(', ');
      });

      Object.entries(free_benefits).forEach(([attr, val]) => (update[`class_${attr}_total`] = val));
      update.level = characterLevel;
      update.may_equip = Object.values(martialequip).reduce(
        (memo: string, val) => memo + (memo.length ? ' ✦ ' : '') + val,
        ''
      );
      setAttrs(update, { silent: true }, () => {
        calculateMaxHP();
        calculateMaxMP();
        calculateMaxIP();
      });
    }
  );
};

const calculateBondLevels = () => {
  getAttrs(ATTR_WATCH.bonds, (v) => {
    const update: { [key: string]: string } = {};
    [1, 2, 3, 4, 5, 6].forEach((bond) => {
      const b = Object.entries(v)
        .filter(([key, val]) => key.includes(String(bond)) && val.length)
        .map(([key, val]) => val);
      const level = b.reduce((memo, emotion) => memo + +!!emotion, 0);
      update[`bond${bond}_level`] = String(level);
    });

    setAttrs(update, { silent: true });
  });
};

const calculateQuickDefenses = (value: any) => {
  if (!value) return;

  const [def, mdef] = value.split('/');
  setAttrs(
    {
      defense_extra: def,
      magic_defense_extra: mdef,
    },
    { silent: true }
  );
};

const updateQuickDefenseDropdown = () => {
  getAttrs(['defense_extra', 'magic_defense_extra'], (v) => {
    const defense_quick = `${v.defense_extra}/${v.magic_defense_extra}`;
    setAttrs({ defense_quick: defense_quick }, { silent: true });
  });
};

const calculateInitiative = () => {
  const request = ATTR_WATCH.initiative;
  getAttrs(['sheet_type', ...request], (v) => {
    if (!['character', 'bestiary'].includes(v.sheet_type)) return;

    const dexterity: number = +v.dexterity || 0;
    const insight: number = +v.insight || 0;
    const initiative_bonus: number = +v.initiative_bonus || 0;
    const initiative_extra: number = +v.initiative_extra || 0;
    const initiative_total: number = +v.initiative_total || 0;

    let initiative: number;
    if (v.sheet_type === 'character') {
      initiative = (dexterity + insight) / 2 + initiative_extra + initiative_total;
    }
    if (v.sheet_type === 'bestiary') {
      initiative =
        (dexterity + insight) / 2 + initiative_bonus + initiative_extra + initiative_total;
    }

    setAttrs({ initiative: initiative }, { silent: true });
  });
};

/**
 * NPCs gain a bonus to Accuracy Checks and Magic Checks equal to【 their level,
 * divided by ten and rounded down to a minimum of 0】.
 * Furthermore, all NPCs that are level 20 or higher deal 5 extra damage with their
 * attacks and spells. This bonus increases to 10 extra damage for NPCs level 40 or
 * higher, and 15 extra damage for NPCs of level 60.
 */
const calculateLevelAccuracyBonus = (level: number) => Math.floor(level / 10);
const calculateLevelDamageBonus = (level: number) =>
  level === 60 ? 15 : level >= 40 ? 10 : level >= 20 ? 5 : 0;

const calculateBasicAccuracyDamage = () => {
  RepeatingModule.getAllAttrs(
    BASIC_ACCURACY_DAMAGE,
    ATTR_WATCH.basic_attacks,
    (attributes: Record<string, string>, sections) => {
      if (!['character', 'bestiary'].includes(attributes.sheet_type)) return;

      const update: Record<string, any> = {};

      if (attributes.sheet_type === 'bestiary') {
        const level: number = +attributes.level || 0;
        const accuracy_bonus: number = +attributes.accuracy_bonus || 0;

        const levelAccuracyBonus = calculateLevelAccuracyBonus(level);
        const levelDamageBonus = calculateLevelDamageBonus(level);

        const [section, ids] = Object.entries(sections).at(0);
        ids.forEach((id) => {
          const prefix = `${section}_${id}_`;

          const extra_damage: number = +attributes[prefix + 'attack_extra_damage'] || 0;

          update[prefix + 'attack_accuracy_total'] = accuracy_bonus + levelAccuracyBonus;
          update[prefix + 'attack_damage_total'] = 5 + extra_damage + levelDamageBonus;
        });

        setAttrs(update, { silent: true });
      }
    }
  );
};

const calculateWeaponAccuracyDamage = () => {
  RepeatingModule.getAllAttrs(
    WEAPON_ACCURACY_DAMAGE,
    ATTR_WATCH.weapons,
    (attributes: Record<string, string>, sections) => {
      if (!['character', 'bestiary'].includes(attributes.sheet_type)) return;

      const update: Record<string, any> = {};

      const level: number = +attributes.level || 0;
      const accuracy_bonus: number = +attributes.accuracy_bonus || 0;

      let levelAccuracyBonus = 0;
      let levelDamageBonus = 0;
      if (attributes.sheet_type === 'bestiary') {
        levelAccuracyBonus = calculateLevelAccuracyBonus(level);
        levelDamageBonus = calculateLevelDamageBonus(level);
      }

      const [section, ids] = Object.entries(sections).at(0);
      ids.forEach((id) => {
        const prefix = `${section}_${id}_`;

        const weapon_accuracy: number = +attributes[prefix + 'weapon_accuracy'] || 0;
        const weapon_damage: number = +attributes[prefix + 'weapon_damage'] || 0;
        const attack_accuracy: number = +attributes[prefix + 'weapon_attack_accuracy'] || 0;
        const attack_damage: number = +attributes[prefix + 'weapon_attack_damage'] || 0;
        const extra_damage: number = +attributes[prefix + 'weapon_extra_damage'] || 0;

        update[prefix + 'weapon_accuracy_total'] =
          weapon_accuracy + attack_accuracy + accuracy_bonus + levelAccuracyBonus;
        update[prefix + 'weapon_damage_total'] =
          weapon_damage + attack_damage + extra_damage + levelDamageBonus;
      });

      setAttrs(update, { silent: true });
    }
  );
};

const calculateSpellAccuracyDamage = () => {
  RepeatingModule.getAllAttrs(
    SPELL_ACCURACY_DAMAGE,
    ATTR_WATCH.spells,
    (attributes: Record<string, string>, sections) => {
      if (!['character', 'bestiary'].includes(attributes.sheet_type)) return;

      const update: Record<string, any> = {};

      const level: number = +attributes.level || 0;
      const accuracy_bonus: number = +attributes.accuracy_bonus || 0;

      const levelAccuracyBonus = calculateLevelAccuracyBonus(level);
      const levelDamageBonus = calculateLevelDamageBonus(level);

      const [section, ids] = Object.entries(sections).at(0);
      ids.forEach((id) => {
        const prefix = `${section}_${id}_`;

        const spell_accuracy: number = +attributes[prefix + 'spell_accuracy'] || 0;
        const spell_damage: number = +attributes[prefix + 'spell_damage'] || 0;

        update[prefix + 'spell_accuracy_total'] =
          spell_accuracy + accuracy_bonus + levelAccuracyBonus;
        update[prefix + 'spell_damage_total'] = spell_damage + levelDamageBonus;
      });

      setAttrs(update, { silent: true });
    }
  );
};

const calculateRitualAccuracyDifficulty = () => {
  RepeatingModule.getAllAttrs(
    RITUAL_ACCURACY_DIFFICULTY,
    ATTR_WATCH.rituals,
    (attributes: Record<string, string>, sections) => {
      if (attributes.sheet_type !== 'character') return;

      const update: Record<string, any> = {};
      const accuracy_bonus: number = +attributes.accuracy_bonus || 0;

      // Rituals Known
      let ritual_known = '';
      RITUAL_DISCIPLINES.forEach((discipline) => {
        const checkbox = attributes[discipline] ?? '';
        if (checkbox === 'on') {
          ritual_known +=
            (ritual_known.length ? ' ✦ ' : '') + getTranslationByKey(discipline) ?? discipline;
        }
      });

      update['ritual_known'] = ritual_known;

      const [section, ids] = Object.entries(sections).at(0);
      ids.forEach((id) => {
        const prefix = `${section}_${id}_`;
        const ritual_accuracy: number = +attributes[prefix + 'ritual_accuracy'] || 0;
        update[prefix + 'ritual_accuracy_total'] = ritual_accuracy + accuracy_bonus;

        const potency: string = attributes[prefix + 'ritual_potency'] ?? 'minor';
        const area: string = attributes[prefix + 'ritual_area'] ?? 'individual';

        const dl: number = RITUAL_DIFFICULTY.difficulty[potency];
        const mp: number = RITUAL_DIFFICULTY.potency[potency] * RITUAL_DIFFICULTY.area[area];
        update[prefix + 'ritual_difficulty'] = dl;
        update[prefix + 'ritual_mp'] = mp;
      });

      setAttrs(update, { silent: true });
    }
  );
};
