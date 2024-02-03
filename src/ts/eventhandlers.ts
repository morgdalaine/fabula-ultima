/// <reference path="constants.ts" />
/// <reference path="../chimera/ts/repeating.ts" />

G_REPEATING.forEach((fieldset) => {
  on(`sheet:opened change:repeating_${fieldset} remove:repeating_${fieldset}`, (eventInfo) => {
    RepeatingModule.isFieldsetEmpty(fieldset);
  });
});

on(`sheet:opened ${listeners(G_STAT_UPDATES.equipments_empty)}`, (eventInfo) => {
  getAttrs(G_STAT_UPDATES.equipments_empty, (v) => {
    const equipments_empty = Object.values(v).reduce((memo, val) => memo + +!!val, 0);
    setAttrs(
      {
        equipments_empty,
      },
      { silent: true }
    );
  });
});

Object.keys(G_STAT_UPDATES).forEach((attr) => {
  on(listeners(G_STAT_UPDATES[attr]), () => handleCalculations(attr));
});

on('change:defense_quick', (eventInfo) => {
  calculateQuickDefenses(eventInfo.newValue);
});

on('change:defense_extra change:magic_defense_extra', () => {
  updateQuickDefenseDropdown();
});
