const fabulaMigrations: ChimeraMigration[] = [
  new ChimeraMigration('bestiary', { set: 1.0 }, (resolve, reject) => {
    RepeatingModule.getAllAttrs(
      CROSSWALK_SECTION_DETAILS,
      CROSSWALK_REQUEST,
      (attributes: Record<string, string>, sections) => {
        const update: { [key: string]: string } = {};

        console.log('attributes => ');
        console.log(attributes);

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
              case 'shield': {
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
            }
          }
        });

        console.log('update => ');
        console.log(update);
        setAttrs(update);
      }
    );

    console.log('do the thing!');
    resolve();
  }),
];

const handleMigrations = (eventInfo: EventInfo) => {
  const migrator = new ChimeraMigrator('Fabula Ultima', fabulaMigrations);
  migrator.validate(() => {});
};
