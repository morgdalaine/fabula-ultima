const calculateQuickDefenses = (value) => {
  if (!value) {
    return;
  }

  const [def, mdef] = value.split('/');
  setAttrs(
    {
      defense_extra: def,
      magic_defense_extra: mdef,
    },
    { silent: true }
  );
};

on('ready', () => {
  findObjs({ type: 'attribute' }).forEach((attr) => {
    log(JSON.stringify(attr));
  });
});
