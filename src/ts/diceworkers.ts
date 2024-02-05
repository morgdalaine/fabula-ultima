const checkForCritical = (dice: number[]) => {
  return dice.every((die) => die === 1)
    ? -1
    : dice.every((die) => die >= 6 && die === dice.at(0))
      ? 1
      : 0;
};

const sendToChat = async (chat: string, eventInfo: EventInfo) => {
  console.group('sendToChat > ', chat);
  const id = RepeatingModule.getRepId(eventInfo.sourceAttribute);

  // switch (chat) {
  //   case 'basicattack':
  //     return chatBasicAttack(id);
  // }

  console.groupEnd();
};

const rollAction = async (action: string, eventInfo: EventInfo) => {
  const id = RepeatingModule.getRepId(eventInfo.sourceAttribute);
  console.group('rollAction => ', action);

  switch (action) {
    case 'basicattack':
      return rollBasicAttack(id);
    case 'weaponattack':
    case 'spellattack':
      break;
  }

  console.groupEnd();
};

const rollBasicAttack = async (id: string) => {
  const prefix = `repeating_basic-attacks_${id}_`;
  const attributes = SEND_TO_CHAT['basicattack'].reduce(
    (memo: { [key: string]: string }, v: string) => ((memo[v] = prefix + v), memo),
    {}
  );

  const request = Object.values(attributes);
  getAttrs(request, (v) => {
    console.log(v);

    const att1 = v[prefix + 'attack_attr1'];
    const att2 = v[prefix + 'attack_attr2'];

    const att1_i18n = getTranslationByKey(att1) || att1;
    const att2_i18n = getTranslationByKey(att2) || att2;

    const hr_i18n = getTranslationByKey('hr') || 'HR';
    const dmg_i18n = getTranslationByKey('dmg') || 'DMG';

    const accuracy = +v[prefix + 'attack_accuracy_total'] ?? 0;
    const damage = v[prefix + 'attack_damage_total'];

    const action = getTranslationByKey('attack') || 'Attack';
    const range = v[prefix + 'attack_range'];

    const accuracyRoll =
      `【 ${att1_i18n} + ${att2_i18n}` + (accuracy > 0 ? ` + ${accuracy}` : ``) + ` 】`;
    const damageRoll = `【 HR + ${damage} 】`;

    chimeraRoll(
      'fabula-attack',
      {
        action: action,
        character: `@{character_name}`,
        name: v[prefix + 'attack_name'],
        // range: getTranslationByKey(range) || '',
        type: getTranslationByKey(v[prefix + 'attack_type']) || '',
        special: v[prefix + 'attack_special'],
        check: accuracyRoll,
        hr: damageRoll,

        [range]: range,
      },
      {
        roll: `1d@{${att1}}[${att1_i18n}] + 1d@{${att2}}[${att2_i18n}] + ${accuracy}`,
        damage: `0[${hr_i18n}] + ${damage}[${dmg_i18n}]`,
        critical: '0',
      },
      ({ rollId, results }) => {
        console.log('results');
        console.log(results);

        // HR + damage
        const hr = results.roll.dice.reduce((memo, die) => Math.max(memo, die), 0);
        const critical = checkForCritical(results.roll.dice);

        finishRoll(rollId, {
          damage: hr + results.damage.result,
          critical: critical,
        });
      }
    );
  });
};
