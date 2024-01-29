G_REPEATING.forEach((fieldset) => {
  on(`change:repeating_${fieldset} remove:repeating_${fieldset}`, (eventInfo) =>
    RepeatingModule.isFieldsetEmpty(fieldset)
  );
});
