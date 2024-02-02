/// <reference path="constants.ts" />
/// <reference path="../chimera/ts/repeating.ts" />

G_REPEATING.forEach((fieldset) => {
  on(`sheet:opened change:repeating_${fieldset} remove:repeating_${fieldset}`, (eventInfo) => {
    RepeatingModule.isFieldsetEmpty(fieldset);
  });
});

on(`sheet:opened ${listeners(G_STAT_UPDATES.equipments_empty)}`, (eventInfo) => {
  console.group('equipment view');
  console.log(eventInfo);
  getAttrs(G_STAT_UPDATES.equipments_empty, (v) => {
    console.log(G_STAT_UPDATES.equipments_empty);
    console.log(v);
    console.log('--end equipment view');

    const equipments_empty = Object.values(v).reduce((memo, val) => memo + +!!val, 0);
    console.log('equipments_empty: ', equipments_empty);
    setAttrs(
      {
        equipments_empty,
      },
      { silent: true }
    );
  });
  console.groupEnd();
});

on('change:defense_quick', (eventInfo) => {
  calculateQuickDefenses(eventInfo.newValue);
});

on('change:defense_extra change:magic_defense_extra', () => {
  updateQuickDefenseDropdown();
});

Object.keys(G_STAT_UPDATES).forEach((attr) => {
  on(listeners(G_STAT_UPDATES[attr]), () => {
    switch (attr) {
      case 'dexterity':
      case 'insight':
      case 'might':
      case 'willpower':
        return calculateAttribute(attr, G_STAT_UPDATES[attr]);

      case 'hp':
        return calculateMaxHP(G_STAT_UPDATES[attr]);

      case 'mp':
        return calculateMaxMP(G_STAT_UPDATES[attr]);

      case 'initiative':
        return calculateInitiative(G_STAT_UPDATES[attr]);

      case 'defense':
        return calculateDefense(G_STAT_UPDATES[attr]);

      case 'magic_defense':
        return calculateMagicDefense(G_STAT_UPDATES[attr]);
    }
  });
});
