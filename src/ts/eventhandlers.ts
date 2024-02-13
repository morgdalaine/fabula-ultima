/// <reference path="constants.ts" />
/// <reference path="../chimera/ts/repeating.ts" />

NAVBAR.forEach((nav) => {
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

on(
  // TODO move this to a loop for all controls
  'clicked:hp-control-add clicked:hp-control-subtract ' +
    'clicked:mp-control-add clicked:mp-control-subtract ',
  (eventInfo: EventInfo) => {
    const [attr, control, direction] = eventInfo.triggerName.substring(8).split('-');
    updatePoints(attr, direction);
  }
);
