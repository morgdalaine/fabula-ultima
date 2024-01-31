const calculateQuickDefenses = (value: any) => {
  if (!value) return;

  const [def, mdef] = value.split('/');
  setAttrs(
    {
      defense_extra: def,
      magic_defense_extra: mdef,
    },
    { silent: true }
  );
};

const updateQuickDefenseDropdown = () => {
  getAttrs(['defense_extra', 'magic_defense_extra'], (v) => {
    setAttrs(
      {
        defense_quick: `${v.defense_extra}/${v.magic_defense_extra}`,
      },
      { silent: true }
    );
  });
};

const calculateAttribute = (eventInfo: EventInfo) => {
  console.group('calculateAttribute');
  console.log(eventInfo);
  console.groupEnd();

  if (eventInfo.newValue) {
  }
};
