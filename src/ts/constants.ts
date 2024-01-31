const G_REPEATING = [
  'bonds',
  'attacks',
  'weapons',
  'spells',
  'notes',
  'specials',
  'actions',
  'rare-gear',
];

const G_DIE_SIZES = [6, 8, 10, 12];

const G_STATUS_EFFECTS = {
  dazed: ['insight'],
  enraged: ['dexterity', 'insight'],
  poisoned: ['might', 'willpower'],
  shaken: ['willpower'],
  slow: ['dexterity'],
  weak: ['might'],
};

const G_STAT_UPDATES = {
  dexterity: ['dexterity_max', 'poisoned', 'dazed', 'enraged', 'slow'],
  insight: ['insight_max', 'poisoned', 'dazed', 'enraged', 'slow'],
  might: ['might_max', 'poisoned', 'dazed', 'enraged', 'slow'],
  willpower: ['willpower_max', 'poisoned', 'dazed', 'enraged', 'slow'],

  hp: ['sheet_type', 'might_max', 'level', 'hp_extra'],
  mp: ['sheet_type', 'willpower_max', 'level', 'mp_extra'],

  initiative: ['dexterity', 'insight', 'initiative_extra', 'initiative_bonus'],

  defense: [
    'dexterity',
    'defense_quick',
    'defense_extra',
    'armor_is_martial',
    'armor_defense',
    'armor_defense_bonus',
    'shield_defense_bonus',
  ],

  magic_defense: [
    'willpower',
    'defense_quick',
    'magic_defense_extra',
    // 'armor_is_martial',
    // 'armor_magic_defense',
    'armor_magic_defense_bonus',
    'shield_magic_defense_bonus',
  ],
} as Record<string, string[]>;

const listenersByKey = (obj: object) => {
  return Object.entries(obj).reduce((memo: Record<string, string>, [key, arr]) => {
    memo[key] = (arr as string[]).map((str: string) => `change:${str}`).join(' ');
    return memo;
  }, {});
};

const listeners = (arr: string[]): string => {
  return arr.map((str: string) => `change:${str}`).join(' ');
};
