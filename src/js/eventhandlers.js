G_REPEATING.forEach((fieldset) => {
  on(`sheet:opened change:repeating_${fieldset} remove:repeating_${fieldset}`, (eventInfo) =>
    RepeatingModule.isFieldsetEmpty(fieldset)
  );
});

on('change:defense_quick', (eventInfo) => {
  calculateQuickDefenses(eventInfo.newValue);
});

// on('change:defense_extra change:defense_extra', (eventInfo) => {
//   spreadQuickDefenses(eventInfo.newValue);
// });
