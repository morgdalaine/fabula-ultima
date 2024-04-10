/// <reference path="constants.ts" />
/// <reference path="../chimera/ts/repeating.ts" />
/// <reference path="../chimera/ts/migration.ts" />

on('sheet:opened', (eventInfo) => handleMigrations(eventInfo));
on('change:sheet_mode', (eventInfo) => handleModeChange(eventInfo.newValue));

Array.from(new Set(Object.values(NAVBAR).flatMap((m) => m.map((n) => n)))).forEach((nav) => {
  on(`clicked:${nav}`, (eventInfo) => {
    setAttrs({ nav: nav }, { silent: true });
  });
});

REPEATING.forEach((fieldset) => {
  on(`sheet:opened change:repeating_${fieldset} remove:repeating_${fieldset}`, (eventInfo) => {
    RepeatingModule.isFieldsetEmpty(fieldset);
  });
});

Object.keys(ATTR_WATCH).forEach((attr) => {
  on(listeners(ATTR_WATCH[attr]), (eventInfo) => handleCalculations(attr, eventInfo));
});

on('change:defense_quick', (eventInfo) => {
  calculateQuickDefenses(eventInfo.newValue);
});

on('change:defense_extra change:magic_defense_extra', () => {
  updateQuickDefenseDropdown();
});

Object.keys(BUTTON_ACTIONS).forEach((key) => {
  on(listeners(BUTTON_ACTIONS[key], 'clicked'), (eventInfo) => {
    if (eventInfo.sourceType === 'sheetworker') return;

    const control =
      eventInfo.triggerName.split('-').at(-1).toUpperCase() === 'ADD'
        ? ControlEnum.ADD
        : ControlEnum.SUBTRACT;

    const rowId = RepeatingModule.getRepId(eventInfo.sourceAttribute);

    switch (key) {
      case 'project':
        return advanceProjectClock(rowId, control);
      case 'ritual':
        return advanceRitualClock(rowId, control);
      case 'zero':
        return advanceZeroClock(rowId, control);
      case 'rest':
        return restAndRecover();
      default:
        return updatePoints(key, control);
    }
  });
});
