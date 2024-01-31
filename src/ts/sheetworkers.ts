const calculateAttribute = (attr: string, request: string[]) => {
  getAttrs(request, (v) => {
    const die = +v[`${attr}_max`] ?? 0;
    setAttrs({ [attr]: die }, { silent: true });
  });
};

const calculateStatusEffects = (v: Record<string, string>) => {};

/**
 * HP Max = (might_base * 5) + level + hp_other
 * @param request
 */
const calculateMaxHP = (request: string[]) => {
  getAttrs(request, (v) => {
    console.group('calculcalculateMaxHPateHP');
    console.log(request);
    console.log(v);

    const might_max: number = +v.might_max ?? 0;
    const level: number = +v.level ?? 0;
    const hp_extra: number = +v.hp_extra ?? 0;

    let hp_max: number;
    if (v.sheet_type === 'character') {
      hp_max = might_max * 5 + level + hp_extra; // + [class benefits]
    }
    if (v.sheet_type === 'bestiary') {
      hp_max = might_max * 5 + level * 2 + hp_extra;
    }

    const hp_crisis = Math.floor(hp_max / 2);

    console.log('save:', { hp_max, hp_crisis });
    setAttrs({ hp_max, hp_crisis }, { silent: true });
    console.groupEnd();
  });
};

/**
 * MP Max = (willpower_base * 5) + level + mp_other
 * @param request
 */
const calculateMaxMP = (request: string[]) => {
  getAttrs(request, (v) => {
    console.group('calculateMaxMP');
    console.log(request);
    console.log(v);

    const willpower_max: number = +v.willpower_max ?? 0;
    const level: number = +v.level ?? 0;
    const mp_extra: number = +v.mp_extra ?? 0;

    let mp_max: number;
    if (v.sheet_type === 'character') {
      mp_max = willpower_max * 5 + level; // + [class benefits]
    }
    if (v.sheet_type === 'bestiary') {
      mp_max = willpower_max * 5 + level + mp_extra;
    }

    console.log('save:', { mp_max });
    setAttrs({ mp_max }, { silent: true });
    console.groupEnd();
  });
};

const calculateDefense = (request: string[]) => {
  getAttrs(request, (v) => {
    console.group('calculateDefenses');
    console.log(request);
    console.log(v);

    const dexterity: number = +v.dexterity ?? 0;
    const defense_extra: number = +v.defense_extra ?? 0;

    const is_martial: boolean = v.armor_is_martial === 'on';
    const armor_defense: number = +v.armor_defense ?? 0;
    const armor_defense_bonus: number = +v.armor_defense_bonus ?? 0;
    const shield_defense_bonus: number = +v.shield_defense_bonus ?? 0;

    const defense =
      (is_martial ? armor_defense : dexterity + armor_defense_bonus) +
      shield_defense_bonus +
      defense_extra;

    setAttrs({ defense }, { silent: true });
    console.log('save:', { defense });
    console.groupEnd();
  });
};

const calculateMagicDefense = (request: string[]) => {
  getAttrs(request, (v) => {
    console.group('calculateMagicDefense');
    console.log(request);
    console.log(v);

    const willpower: number = +v.willpower ?? 0;
    const magic_defense_extra: number = +v.magic_defense_extra ?? 0;

    const armor_magic_defense_bonus: number = +v.armor_magic_defense_bonus ?? 0;
    const shield_magic_defense_bonus: number = +v.shield_magic_defense_bonus ?? 0;

    const magic_defense =
      willpower + armor_magic_defense_bonus + shield_magic_defense_bonus + magic_defense_extra;

    setAttrs({ magic_defense }, { silent: true });
    console.log('save:', { magic_defense });
    console.groupEnd();
  });
};

const calculateQuickDefenses = (value: any) => {
  if (!value) return;

  const [def, mdef] = value.split('/');
  console.log({ def, mdef });
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
    const defense_quick = `${v.defense_extra}/${v.magic_defense_extra}`;
    setAttrs({ defense_quick: defense_quick }, { silent: true });
  });
};

const calculateInitiative = (request: string[]) => {
  getAttrs(['sheet_type', ...request], (v) => {
    const dexterity: number = +v.dexterity ?? 0;
    const insight: number = +v.insight ?? 0;
    const initiative_bonus: number = +v.initiative_bonus ?? 0;
    const initiative_extra: number = +v.initiative_extra ?? 0;

    let initiative: number;
    if (v.sheet_type === 'character') {
    }
    if (v.sheet_type === 'bestiary') {
      initiative = (dexterity + insight) / 2 + initiative_bonus + initiative_extra;
    }

    console.log({ initiative });
    setAttrs({ initiative: initiative }, { silent: true });
  });
};