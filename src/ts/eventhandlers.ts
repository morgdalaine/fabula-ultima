/// <reference path="constants.ts" />
/// <reference path="../chimera/ts/repeating.ts" />

REPEATING.forEach((fieldset) => {
  on(`sheet:opened change:repeating_${fieldset} remove:repeating_${fieldset}`, (eventInfo) => {
    RepeatingModule.isFieldsetEmpty(fieldset);
  });
});

on(`sheet:opened ${listeners(ATTR_WATCH.equipments_empty)}`, (eventInfo) => {
  getAttrs(ATTR_WATCH.equipments_empty, (v) => {
    const equipments_empty = Object.values(v).reduce((memo, val) => memo + +!!val, 0);
    setAttrs(
      {
        equipments_empty,
      },
      { silent: true }
    );
  });
});

Object.keys(ATTR_WATCH).forEach((attr) => {
  on(listeners(ATTR_WATCH[attr]), () => handleCalculations(attr));
});

on('change:defense_quick', (eventInfo) => {
  calculateQuickDefenses(eventInfo.newValue);
});

on('change:defense_extra change:magic_defense_extra', () => {
  updateQuickDefenseDropdown();
});
