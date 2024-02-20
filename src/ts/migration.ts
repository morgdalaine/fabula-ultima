const fabulaMigrations: ChimeraMigration[] = [
  new ChimeraMigration('bestiary', { set: 1.0 }, (resolve, reject) => {
    RepeatingModule.getAllAttrs(
      CROSSWALK_SECTION_DETAILS,
      CROSSWALK_REQUEST,
      (attributes: Record<string, string>, sections) => {
        const update: { [key: string]: string } = {};
        update.sheet_type = 'character';

        Object.keys(CROSSWALK_TO_V20).forEach((key) => {
          const data = CROSSWALK_TO_V20[key];
          if (typeof data === 'string' && Object.hasOwn(attributes, key)) {
            update[data] = attributes[key];
          } else {
            switch (key) {
              case 'affinity': {
                Object.keys(data).forEach((a) => {
                  const affinity = attributes[a];
                  if (CROSSWALK_AFFINITIES[affinity]) {
                    update[data[a]] = CROSSWALK_AFFINITIES[affinity];
                  }
                });
                break;
              }
              case 'bonds': {
                ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'].forEach((nth, index) => {
                  const bondId = String(index + 1);
                  const emotions: string[] = [];

                  Object.entries(data).forEach(([old, nu]: [string, string]) => {
                    const tempKey = nu.replace('1', bondId);
                    const val = attributes[nth + old];
                    if (val && old.includes('Emotion')) {
                      emotions.push(val);
                    } else if (val) {
                      update[tempKey] = val;
                    }
                  });

                  emotions.forEach((e, index) => {
                    const val = e.toLowerCase();
                    const attr = CROSSWALK_BONDS[val];
                    update[`bond${bondId}_${attr}`] = val;
                  });
                });
                break;
              }
              case 'mainWeapon':
              case 'offWeapon':
              case 'repeating_weapons': {
                const rowId = generateRowID();
                Object.entries(data).forEach(([old, nu]: [string, string]) => {
                  const attr = nu.replace('-CREATE', rowId);
                  const val = attributes[old];
                  if (val) {
                    update[attr] = (function () {
                      switch (old) {
                        case 'mainWeaponCategory':
                        case 'offWeaponCategory':
                        case 'mainWeaponDamageType':
                        case 'offWeaponDamageType':
                        case 'additionalWeaponCategory':
                        case 'additionalWeaponDamageType':
                          return val.toLowerCase();
                        case 'mainWeaponAttr1Name':
                        case 'mainWeaponAttr2Name':
                        case 'offWeaponAttr1Name':
                        case 'offWeaponAttr2Name':
                        case 'additionalWeaponAttr1Name':
                        case 'additionalWeaponAttr2Name':
                          return reverseMap(ATTR_ABBREVIATIONS, val.toLowerCase());
                        case 'mainWeaponRange':
                        case 'offWeaponRange':
                        case 'additionalWeaponRange':
                          return val === 'Ranged' ? 'distance' : 'melee';
                        case 'mainWeaponGrip':
                        case 'offWeaponGrip':
                        case 'additionalWeaponGrip':
                          return String(val.includes('One') ? 1 : 2);
                        case 'mainWeaponMartial':
                        case 'offWeaponMartial':
                        case 'additionalWeaponMartial':
                          return val === 'Martial' || val === '[Martial]' ? 'on' : '0';
                        default:
                          return val;
                      }
                    })();
                  }
                });
                break;
              }
              case 'armor':
              case 'shield':
              case 'accessory': {
                const rowId = generateRowID();
                Object.entries(data).forEach(([old, nu]: [string, string]) => {
                  const attr = nu.replace('-CREATE', rowId);
                  const val = attributes[old];
                  if (val) {
                    const bonus = attr.includes('Defense') && val.includes('+') ? '_bonus' : '';
                    update[attr + bonus] = (function () {
                      switch (old) {
                        case 'armorMartial':
                        case 'shieldMartial':
                          return val === 'Martial' || val === '[Martial]' ? 'on' : '0';
                        case 'armorDefense':
                        case 'armorResist':
                        case 'armorInitiative':
                        case 'shieldDefense':
                        case 'shieldResist':
                        case 'shieldInitiative':
                          return String(+val || 0);
                        default:
                          return val;
                      }
                    })();
                  }
                });
                break;
              }
              // same fieldset new attr
              case 'repeating_creatures':
              case 'repeating_items':
              case 'repeating_locations':
              case 'repeating_notes':
              case 'repeating_quests':
              case 'repeating_ritualdisciplines': {
                sections[key].forEach((id) => {
                  const prefix = `${key}_${id}_`;
                  Object.entries(data).forEach(([old, nu]: [string, string]) => {
                    update[prefix + nu] = attributes[prefix + old];
                  });
                });
                break;
              }
              // new fieldset no conversion
              case 'repeating_jitems':
              case 'repeating_ritualdisciplines':
              case 'repeating_jcharacters':
              case 'repeating_otherdiscoveries':
              case 'repeating_zeroeffects':
              case 'repeating_spareaccessories':
              case 'repeating_inventoryitems': {
                sections[key].forEach((id) => {
                  Object.entries(data).forEach(([old, nu]: [string, string]) => {
                    const val = attributes[`${key}_${id}_${old}`];
                    const nuAttr = nu.replace(/-CREATE/, id);
                    update[nuAttr] = val;
                  });
                  removeRepeatingRow(id);
                });
                break;
              }
              // new fieldset with conversion
              case 'repeating_charclasses':
              case 'repeating_offensivespells':
              case 'repeating_baseSpells':
              case 'repeating_rituals': {
                sections[key].forEach((id) => {
                  const rowId = generateRowID();
                  Object.entries(data).forEach(([old, nu]: [string, string]) => {
                    const val = attributes[`${key}_${id}_${old}`];
                    const nuAttr = nu.replace(/-CREATE/, rowId);
                    if (val) {
                      update[nuAttr] = (function () {
                        switch (old) {
                          case 'offensiveSpellAttr1Name':
                          case 'offensiveSpellAttr2Name':
                          case 'ritualAttr1Name':
                          case 'ritualAttr2Name':
                            return reverseMap(ATTR_ABBREVIATIONS, val.toLowerCase());
                          case 'offensiveSpellDamageType':
                          case 'classBonus':
                            return val.toLowerCase();
                          default:
                            return val;
                        }
                      })();
                    }
                  });

                  if (key !== 'repeating_rituals') {
                    removeRepeatingRow(id);
                  }
                });
                break;
              }
            }
          }
        });

        console.log(update);
        setAttrs(update);
      }
    );

    // FIXME 'TypeError: resolve is not a function'
    resolve();
  }),
];

const initializeSheet = () => {
  getAttrs(['sheet_initialized'], (v) => {
    if (+v.sheet_initialized === 1) return;

    calculateAllAttributes();

    calculateMaxHP(true);
    calculateMaxMP(true);
    calculateMaxIP(true);
    calculateInitiative();
    calculateDefenses();

    calculateBasicAccuracyDamage();
    calculateWeaponAccuracyDamage();
    calculateSpellAccuracyDamage();
    calculateRitualAccuracyDifficulty();
    calculateCharacterLevel();
    calculateBondLevels();

    calculateUltimaPoints();
    makeVillainString();

    setAttrs({ sheet_initialized: 1 });
  });
};

const handleMigrations = (eventInfo: EventInfo) => {
  const migrator = new ChimeraMigrator('Fabula Ultima', fabulaMigrations);
  migrator.validate(() => {});
  initializeSheet();
};
