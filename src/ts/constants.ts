const REPEATING = [
  'bonds',
  'basic-attacks',
  'weapons',
  'spells',
  'other-actions',
  'special-rules',
  'rare-gears',
  'notes',
];

const DIE_SIZES = [6, 8, 10, 12];
const VILLAIN_ULTIMA_POINTS: Record<string, number> = {
  minor: 5,
  major: 10,
  supreme: 15,
};

const STATUS_EFFECTS: Record<string, number> = {
  dazed: -1,
  enraged: -1,
  poisoned: -1,
  shaken: -1,
  slow: -1,
  weak: -1,
};

const ATTR_WATCH: Record<string, string[]> = {
  dexterity: ['dexterity_max', 'slow', 'enraged'],
  insight: ['insight_max', 'dazed', 'enraged'],
  might: ['might_max', 'weak', 'poisoned'],
  willpower: ['willpower_max', 'shaken', 'poisoned'],

  hp: ['sheet_type', 'might_max', 'level', 'hp_extra'],
  mp: ['sheet_type', 'willpower_max', 'level', 'mp_extra'],
  ultima_points: ['sheet_type', 'villain'],

  villain_empty: ['villain', 'multipart', 'phases'],

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

  basic_attacks: [
    'sheet_type',
    'level',
    'accuracy_bonus',
    'magic_bonus',
    'repeating_basic-attacks:attack_extra_damage',
  ],
  weapons: [
    'sheet_type',
    'level',
    'accuracy_bonus',
    'magic_bonus',
    'repeating_weapons:weapon_accuracy',
    'repeating_weapons:weapon_damage',
    'repeating_weapons:weapon_attack_accuracy',
    'repeating_weapons:weapon_attack_damage',
    'repeating_weapons:weapon_extra_damage',
  ],
  spells: [
    'sheet_type',
    'level',
    'accuracy_bonus',
    'magic_bonus',
    'repeating_spells:spell_accuracy',
    'repeating_spells:spell_damage',
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
};

const BUTTON_ACTIONS: Record<string, string[]> = {
  hp: ['hp-control-add', 'hp-control-subtract'],
  mp: ['mp-control-add', 'mp-control-subtract'],
};

const BASIC_ACCURACY_DAMAGE: SectionDetails[] = [
  {
    section: 'repeating_basic-attacks',
    fields: ['attack_extra_damage'],
  },
];

const WEAPON_ACCURACY_DAMAGE: SectionDetails[] = [
  {
    section: 'repeating_weapons',
    fields: [
      'weapon_accuracy',
      'weapon_damage',
      'weapon_attack_accuracy',
      'weapon_attack_damage',
      'weapon_extra_damage',
    ],
  },
];

const SPELL_ACCURACY_DAMAGE: SectionDetails[] = [
  {
    section: 'repeating_spells',
    fields: ['spell_accuracy', 'spell_damage'],
  },
];

const STATIC_ACCURACY_DAMAGE = ['sheet_type', 'accuracy_bonus', 'magic_bonus'];

const listenersByKey = (obj: object) => {
  return Object.entries(obj).reduce((memo: Record<string, string>, [key, arr]) => {
    memo[key] = listeners(arr);
    return memo;
  }, {});
};

const listeners = (arr: string[]): string => {
  return arr.map((str: string) => `change:${str}`).join(' ');
};
