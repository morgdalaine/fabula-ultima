const G_REPEATING = [
  'bonds',
  'basic-attacks',
  'weapons',
  'spells',
  'other-actions',
  'special-rules',
  'rare-gears',
  'notes',
];

const G_DIE_SIZES = [6, 8, 10, 12];

const G_STATUS_EFFECTS = {
  dazed: -1,
  enraged: -1,
  poisoned: -1,
  shaken: -1,
  slow: -1,
  weak: -1,
} as Record<string, number>;

const G_STAT_UPDATES = {
  dexterity: ['dexterity_max', 'slow', 'enraged'],
  insight: ['insight_max', 'dazed', 'enraged'],
  might: ['might_max', 'weak', 'poisoned'],
  willpower: ['willpower_max', 'shaken', 'poisoned'],

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

  equipments_empty: [
    'weapons_empty',
    'armor_name',
    'armor_defense',
    'armor_defense_bonus',
    'armor_magic_defense_bonus',
    'armor_initiative',
    'armor_cost',
    'shield_name',
    'shield_defense',
    'shield_defense_bonus',
    'shield_magic_defense_bonus',
    'shield_initiative',
    'shield_cost',
  ],
} as Record<string, string[]>;

const G_REPEATING_PRECISION_DAMAGE = [];

const listenersByKey = (obj: object) => {
  return Object.entries(obj).reduce((memo: Record<string, string>, [key, arr]) => {
    memo[key] = listeners(arr);
    return memo;
  }, {});
};

const listeners = (arr: string[]): string => {
  return arr.map((str: string) => `change:${str}`).join(' ');
};
