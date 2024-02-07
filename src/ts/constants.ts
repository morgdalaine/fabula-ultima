const NAVBAR = ['classes', 'spells'];

const REPEATING = [
  'bonds',
  'basic-attacks',
  'weapons',
  'spells',
  'other-actions',
  'special-rules',
  'rare-gears',
  'notes',
  'classes',
];

const DIE_SIZES = [6, 8, 10, 12];

// const STUDY_THRESHOLDS = [10, 13, 16];
const STUDY_THRESHOLDS = [7, 10, 13];

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

const ATTR_ABBREVIATIONS = {
  dexterity: 'dex',
  insight: 'ins',
  might: 'mig',
  willpower: 'wlp',
};

const AFFINITIES = ['physical', 'air', 'bolt', 'dark', 'earth', 'fire', 'ice', 'light', 'poison'];

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

  level: [
    'sheet_type',
    // 'repeating_classes:class_level',
    'repeating_classes:class_skill1_level',
    'repeating_classes:class_skill2_level',
    'repeating_classes:class_skill3_level',
    'repeating_classes:class_skill4_level',
    'repeating_classes:class_skill5_level',
  ],

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

const CLICK_LISTENERS: Record<string, string> = {
  'repeating_basic-attacks:basicattack': 'basicattack',
  'repeating_weapons:weaponattack': 'weaponattack',
  'repeating_weapons:weaponchat': 'weaponchat',
  'repeating_spells:spell': 'spell',
  'repeating_other-actions:otheractionchat': 'otheractionchat',
  'repeating_special-rules:specialrulechat': 'specialrulechat',
  'repeating_rare-gears:raregearchat': 'raregearchat',
  'repeating_notes:notechat': 'notechat',
  'armorchat': 'armorchat',
  'shieldchat': 'shieldchat',
  'study7': 'study7',
  'study10': 'study10',
  'study13': 'study13',
};

const SEND_TO_CHAT: Record<string, string[]> = {
  basicattack: [
    'attack_name',
    'attack_range',
    'attack_attr1',
    'attack_attr2',
    'attack_accuracy_total',
    'attack_damage_total',
    'attack_type',
    'attack_special',
  ],
  weaponattack: [
    'weapon_name',
    'weapon_accuracy_total',
    'weapon_attack_accuracy',
    'weapon_attack_damage',
    'weapon_attack_name',
    'weapon_attr1',
    'weapon_attr2',
    'weapon_category',
    'weapon_damage_total',
    'weapon_extra_damage',
    'weapon_hands',
    'weapon_name',
    'weapon_range',
    'weapon_special',
    'weapon_type',
  ],
  spell: [
    'spell_name',
    'spell_is_offensive',
    'spell_accuracy_total',
    'spell_attr1',
    'spell_attr2',
    'spell_damage_total',
    'spell_duration',
    'spell_effect',
    'spell_mp',
    'spell_name',
    'spell_target',
    'spell_type',
  ],
  otheractionchat: ['action_name', 'action_effect'],
  specialrulechat: ['special_name', 'special_effect'],
  raregearchat: ['raregear_name', 'raregear_effect'],
  notechat: ['note_name', 'note_effect'],
  armorchat: [
    'armor_is_martial',
    'armor_name',
    'armor_defense',
    'armor_defense_bonus',
    'armor_magic_defense_bonus',
    'armor_initiative',
    'armor_cost',
  ],
  shieldchat: [
    'shield_name',
    'shield_is_martial',
    'shield_defense_bonus',
    'shield_magic_defense_bonus',
    'shield_initiative',
    'shield_cost',
  ],
  weaponchat: [
    'weapon_name',
    'weapon_is_martial',
    'weapon_range',
    'weapon_category',
    'weapon_attr1',
    'weapon_attr2',
    'weapon_accuracy',
    'weapon_type',
    'weapon_hands',
    'weapon_damage',
    'weapon_cost',
    'weapon_special',
  ],
  study7: ['rank', 'species', 'hp', 'hp_max', 'hp_crisis', 'mp_max'],
};
SEND_TO_CHAT.study10 = [
  ...SEND_TO_CHAT.study7,
  'traits',
  'dexterity_max',
  'insight_max',
  'might_max',
  'willpower_max',
  'defense',
  'magic_defense',
  'physical',
  'air',
  'bolt',
  'dark',
  'earth',
  'fire',
  'ice',
  'light',
  'poison',
];
SEND_TO_CHAT.study13 = [...SEND_TO_CHAT.study10];

const ROLLTEMPLATE_REQUESTS: string[] = ['character_avatar'];

const CHARACTER_SKILL_LEVEL: SectionDetails[] = [
  {
    section: 'repeating_classes',
    fields: [
      'class_skill1_name',
      'class_skill1_level',
      'class_skill2_name',
      'class_skill2_level',
      'class_skill3_name',
      'class_skill3_level',
      'class_skill4_name',
      'class_skill4_level',
      'class_skill5_name',
      'class_skill5_level',
    ],
  },
];

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

const listenersByKey = (obj: object) => {
  return Object.entries(obj).reduce((memo: Record<string, string>, [key, arr]) => {
    memo[key] = listeners(arr);
    return memo;
  }, {});
};

const listeners = (arr: string[]): string => {
  return arr.map((str: string) => `change:${str}`).join(' ');
};
