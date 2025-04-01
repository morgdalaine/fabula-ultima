const NAVBAR = {
  edit: ['stats', 'bonds', 'classes', 'equipment', 'backpack', 'magic', 'extra', 'journal'],
  view: ['meta', 'conflict', 'backpack', 'classes', 'extra', 'journal'],
};

const REPEATING = [
  'weapons',
  'spells',
  'rituals',
  'rolls',

  'classes',
  'features',

  'armors',
  'shields',
  'accessories',
  'inventory',

  'notes',
  'quests',
  'projects',
  'friends',
  'creatures',
  'locations',
  'artifacts',
  'discoveries',
  'items',
  'zero-powers',

  // bestiary
  'basic-attacks',
  'other-actions',
  'special-rules',
  'rare-gears',
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
  dexterity_boost: 1,
  insight_boost: 1,
  might_boost: 1,
  willpower_boost: 1,
  dexterity_down: -1,
  insight_down: -1,
  might_down: -1,
  willpower_down: -1,
};

const RITUAL_DISCIPLINES = [
  'arcanism',
  'chimerism',
  'elementalism',
  'entropism',
  'ritualism',
  'spiritism',
];

const MARTIAL_PROFICIENCIES = ['martialmelee', 'martialranged', 'martialarmor', 'martialshield'];

const RITUAL_DIFFICULTY: Record<string, any> = {
  difficulty: {
    minor: 7,
    medium: 10,
    major: 13,
    extreme: 16,
  },
  potency: {
    minor: 20,
    medium: 30,
    major: 40,
    extreme: 50,
  },
  clock: {
    minor: 4,
    medium: 6,
    major: 6,
    extreme: 8,
  },
  area: {
    individual: 1,
    small: 2,
    large: 3,
    huge: 4,
  },
};

const ATTR_ABBREVIATIONS: { [key: string]: string } = {
  dexterity: 'dex',
  insight: 'ins',
  might: 'mig',
  willpower: 'wlp',
};

const AFFINITIES = ['physical', 'air', 'bolt', 'dark', 'earth', 'fire', 'ice', 'light', 'poison'];

const ATTR_WATCH: Record<string, string[]> = {
  dexterity: [
    'dexterity_max',
    'slow',
    'enraged',
    'dexterity_boost',
    'dexterity_down',
    'slow_immunity',
    'enraged_immunity',
  ],
  insight: [
    'insight_max',
    'dazed',
    'enraged',
    'insight_boost',
    'insight_down',
    'dazed_immunity',
    'enraged_immunity',
  ],
  might: [
    'might_max',
    'weak',
    'poisoned',
    'might_boost',
    'might_down',
    'weak_immunity',
    'poisoned_immunity',
  ],
  willpower: [
    'willpower_max',
    'shaken',
    'poisoned',
    'willpower_boost',
    'willpower_down',
    'shaken_immunity',
    'poisoned_immunity',
  ],

  hp: [
    'sheet_type',
    'might_max',
    'level',
    'hp_extra',
    'class_hp_total',
    'rank',
    'companion_skill_level',
    'pc_level',
  ],
  mp: ['sheet_type', 'willpower_max', 'level', 'mp_extra', 'class_mp_total', 'rank'],
  ip: ['sheet_type', 'ip_extra', 'class_ip_total'],

  ultima_points: ['sheet_type', 'villain'],

  villain: ['villain', 'multipart', 'phases'],

  initiative: [
    'sheet_type',
    'dexterity',
    'insight',
    'initiative_extra',
    'initiative_bonus',
    'initiative_total',
    'rank',
  ],

  level: [
    'sheet_type',
    // 'repeating_classes:class_level',
    'repeating_classes:class_skill1_level',
    'repeating_classes:class_skill2_level',
    'repeating_classes:class_skill3_level',
    'repeating_classes:class_skill4_level',
    'repeating_classes:class_skill5_level',
    'repeating_classes:class_martialmelee',
    'repeating_classes:class_martialranged',
    'repeating_classes:class_martialarmor',
    'repeating_classes:class_martialshield',
    'repeating_classes:class_benefit',
  ],

  defense: [
    'dexterity',
    'defense_quick',
    'defense_extra',
    'armor_is_martial',
    'armor_defense',
    'armor_defense_bonus',
    'armor_initiative',
    'shield_initiative',
    'shield_defense_bonus',
    'repeating_armors:armor_is_martial',
    'repeating_armors:armor_defense',
    'repeating_armors:armor_defense_bonus',
    'repeating_armors:armor_initiative',
    'repeating_armors:armor_is_equipped',
    'repeating_shields:shield_defense_bonus',
    'repeating_shields:shield_initiative',
    'repeating_shields:shield_is_equipped',
  ],

  magic_defense: [
    'insight',
    'defense_quick',
    'magic_defense_extra',
    // 'armor_is_martial',
    // 'armor_magic_defense',
    'armor_magic_defense_bonus',
    'shield_magic_defense_bonus',
    'repeating_armors:armor_magic_defense_bonus',
    'repeating_armors:armor_is_equipped',
    'repeating_shields:shield_magic_defense_bonus',
    'repeating_shields:shield_is_equipped',
  ],

  equipped: [
    'repeating_armors:armor_is_equipped',
    'repeating_shields:shield_is_equipped',
    'repeating_accessories:accessory_is_equipped',
    'repeating_weapons:weapon_is_equipped',
  ],

  bonds: [1, 2, 3, 4, 5, 6].flatMap((bond) => [
    `bond${bond}_approval`,
    `bond${bond}_allegiance`,
    `bond${bond}_fondness`,
  ]),

  projects: [
    'repeating_projects:project_cost',
    'repeating_projects:project_clock',
    'repeating_projects:project_clock_max',
  ],

  zero_powers: [
    'repeating_zero-powers:zero_clock',
    'repeating_zero-powers:zero_clock_max',
    'repeating_zero-powers:zero_trigger_step',
  ],

  basic_attacks: [
    'sheet_type',
    'rank',
    'level',
    'accuracy_bonus',
    'companion_skill_level',
    'pc_level',
    'repeating_basic-attacks:attack_name',
    'repeating_basic-attacks:attack_extra_damage',
  ],
  weapons: [
    'sheet_type',
    'level',
    'accuracy_bonus',
    'melee_weapon_mastery',
    'ranged_weapon_mastery',
    'repeating_weapons:weapon_accuracy',
    'repeating_weapons:weapon_damage',
    'repeating_weapons:weapon_range',
    'repeating_weapons:weapon_attack_accuracy',
    'repeating_weapons:weapon_attack_damage',
    'repeating_weapons:weapon_extra_damage',
  ],
  spells: [
    'sheet_type',
    'level',
    'magic_bonus',
    'repeating_spells:spell_accuracy',
    'repeating_spells:spell_damage',
  ],
  rituals: [
    'sheet_type',
    'magic_bonus',
    'repeating_rituals:ritual_accuracy',
    'repeating_rituals:ritual_potency',
    'repeating_rituals:ritual_area',
    'repeating_rituals:ritual_clock',
    'repeating_rituals:ritual_clock_max',
    ...RITUAL_DISCIPLINES,
  ],

  // equipments_empty: [
  //   'weapons_empty',
  //   'armor_name',
  //   'armor_defense',
  //   'armor_defense_bonus',
  //   'armor_magic_defense_bonus',
  //   'armor_initiative',
  //   'armor_cost',
  //   'shield_name',
  //   'shield_defense',
  //   'shield_defense_bonus',
  //   'shield_magic_defense_bonus',
  //   'shield_initiative',
  //   'shield_cost',
  // ],
};

const INVENTORY_DATA: Record<string, any> = {
  elixir: {
    label: 'Elixir',
    icon: 'elixir',
    cost: 3,
    effect: 'One creature recovers 50 Mind Points.',
  },
  remedy: {
    label: 'Remedy',
    icon: 'remedy',
    cost: 3,
    effect: 'One creature recovers 50 Hit Points.',
  },
  tonic: {
    label: 'Tonic',
    icon: 'tonic',
    cost: 2,
    effect: 'One creature recovers from a single status effect.',
  },
  elementalshard: {
    label: 'Elemental Shard',
    icon: 'elementalshard',
    cost: 2,
    effect:
      'One creature suffers 10 damage of a type of your choice (air, bolt, earth, fire, or ice).',
  },
  magictent: {
    label: 'Magic Tent',
    icon: 'magictent',
    cost: 4,
    effect: 'Allows the entire group to rest in the wilderness.',
  },
};

const SECTION_PREFIX: Record<string, string> = {
  repeating_armors: 'armor_',
  repeating_shields: 'shield_',
  repeating_accessories: 'accessory_',
  repeating_weapons: 'weapon_',
};

const BUTTON_ACTIONS: Record<string, string[]> = {
  hp: ['hp-control-add', 'hp-control-subtract'],
  mp: ['mp-control-add', 'mp-control-subtract'],
  ip: ['ip-control-add', 'ip-control-subtract'],
  project: ['repeating_projects:project-clock-add', 'repeating_projects:project-clock-subtract'],
  zero: ['repeating_zero-powers:zero-clock-add', 'repeating_zero-powers:zero-clock-subtract'],
  ritual: ['repeating_rituals:ritual-clock-add', 'repeating_rituals:ritual-clock-subtract'],
  rest: ['rest'],
};

const CLICK_LISTENERS: Record<string, string> = {
  'dexterity': 'ability',
  'insight': 'ability',
  'might': 'ability',
  'willpower': 'ability',
  'armorchat': 'npcarmorchat',
  'bond1chat': 'bond1',
  'bond2chat': 'bond2',
  'bond3chat': 'bond3',
  'bond4chat': 'bond4',
  'bond5chat': 'bond5',
  'bond6chat': 'bond6',
  'check_anticipate': 'check',
  'check_captivate': 'check',
  'check_custom': 'check',
  'check_dodge': 'check',
  'check_effort': 'check',
  'check_endure': 'check',
  'check_interrogate': 'check',
  'check_intimidate': 'check',
  'check_persuade': 'check',
  'check_recall': 'check',
  'check_sneak': 'check',
  'check_study': 'check',
  'check_tinker': 'check',
  'declare_fabula': 'fabulapoints',
  'quirkchat': 'quirk',
  'repeating_accessories:accessorychat': 'accessorychat',
  'repeating_armors:armorchat': 'armorchat',
  'repeating_artifacts:artifactchat': 'artifact',
  'repeating_basic-attacks:basicattack': 'basicattack',
  'repeating_classes:classchat': 'classchat',
  'repeating_classes:skill1chat': 'skill1',
  'repeating_classes:skill2chat': 'skill2',
  'repeating_classes:skill3chat': 'skill3',
  'repeating_classes:skill4chat': 'skill4',
  'repeating_classes:skill5chat': 'skill5',
  'repeating_classes:skill6chat': 'skill6',
  'repeating_creatures:creaturechat': 'creature',
  'repeating_discoveries:discoverychat': 'discovery',
  'repeating_features:featurechat': 'feature',
  'repeating_friends:friendchat': 'friend',
  'repeating_locations:locationchat': 'location',
  'repeating_notes:notechat': 'note',
  'repeating_other-actions:otheractionchat': 'otheractionchat',
  'repeating_projects:projectchat': 'project',
  'repeating_quests:questchat': 'quest',
  'repeating_rare-gears:raregearchat': 'raregearchat',
  'repeating_rituals:ritual': 'ritual',
  'repeating_rolls:check': 'checkrepeat',
  'repeating_shields:shieldchat': 'shieldchat',
  'repeating_special-rules:specialrulechat': 'specialrulechat',
  'repeating_spells:spell': 'spell',
  'repeating_weapons:weaponattack': 'weaponattack',
  'repeating_weapons:weaponchat': 'weaponchat',
  'repeating_zero-powers:zerochat': 'zero',
  'shieldchat': 'npcshieldchat',
  'study7': 'study7',
  'study10': 'study10',
  'study13': 'study13',
  // inventory
  'elementalshard': 'elementalshard',
  'elixir': 'elixir',
  'magictent': 'magictent',
  'remedy': 'remedy',
  'tonic': 'tonic',
  'initiative': 'initiative',
};

const ACTION_REQUEST: Record<string, string[]> = {
  ability: ['dexterity', 'insight', 'might', 'willpower'],
  ...([1, 2, 3, 4, 5, 6] as any[]).reduce(
    (memo: Record<string, string[]>, bond: number) => (
      (memo[`bond${bond}`] = [
        `bond${bond}_name`,
        `bond${bond}_level`,
        `bond${bond}_approval`,
        `bond${bond}_allegiance`,
        `bond${bond}_fondness`,
        `bond${bond}_description`,
      ]),
      memo
    ),
    {} as Record<string, string[]>
  ),
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
  ritual: [
    'ritual_name',
    'ritual_discipline',
    'ritual_attr1',
    'ritual_attr2',
    'ritual_accuracy_total',
    'ritual_potency',
    'ritual_area',
    'ritual_difficulty',
    'ritual_mp',
    'ritual_effect',
  ],
  otheractionchat: ['action_name', 'action_effect'],
  specialrulechat: ['special_name', 'special_effect'],
  raregearchat: ['raregear_name', 'raregear_effect'],
  artifact: ['artifact_name', 'artifact_effect'],
  creature: ['creature_name', 'creature_effect'],
  discovery: ['discovery_name', 'discovery_effect'],
  friend: ['friend_name', 'friend_effect'],
  location: ['location_name', 'location_effect'],
  note: ['note_name', 'note_effect'],
  quest: ['quest_name', 'quest_effect'],
  armorchat: [
    'armor_is_martial',
    'armor_name',
    'armor_defense',
    'armor_defense_bonus',
    'armor_magic_defense_bonus',
    'armor_initiative',
    'armor_cost',
    'armor_special',
  ],
  npcarmorchat: [
    'armor_is_martial',
    'armor_name',
    'armor_defense',
    'armor_defense_bonus',
    'armor_magic_defense_bonus',
    'armor_initiative',
    'armor_cost',
    'armor_special',
  ],
  shieldchat: [
    'shield_name',
    'shield_is_martial',
    'shield_defense_bonus',
    'shield_magic_defense_bonus',
    'shield_initiative',
    'shield_cost',
    'shield_special',
  ],
  npcshieldchat: [
    'shield_name',
    'shield_is_martial',
    'shield_defense_bonus',
    'shield_magic_defense_bonus',
    'shield_initiative',
    'shield_cost',
    'shield_special',
  ],
  accessorychat: ['accessory_name', 'accessory_cost', 'accessory_special'],
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
  study7: ['rank', 'species', 'hp', 'hp_max', 'hp_crisis', 'mp_max', 'description'],
  classchat: [
    'class_name',
    'class_level',
    'class_skills_taken',
    'class_benefit',
    'level',
    'class_description',
  ],
  skill1: ['class_name', 'class_skill1_name', 'class_skill1_level', 'class_skill1_description'],
  skill2: ['class_name', 'class_skill2_name', 'class_skill2_level', 'class_skill2_description'],
  skill3: ['class_name', 'class_skill3_name', 'class_skill3_level', 'class_skill3_description'],
  skill4: ['class_name', 'class_skill4_name', 'class_skill4_level', 'class_skill4_description'],
  skill5: ['class_name', 'class_skill5_name', 'class_skill5_level', 'class_skill5_description'],
  skill6: ['class_name', 'class_skill6_name', 'class_skill6_level', 'class_skill6_description'],
  fabulapoints: ['fabula_points', 'spend_fabula_points'],
  check: [
    'dexterity',
    'insight',
    'might',
    'willpower',
    'check_attr1',
    'check_attr2',
    'check_description',
  ],
  checkrepeat: [
    'dexterity',
    'insight',
    'might',
    'willpower',
    'check_attr1',
    'check_attr2',
    'check_description',
  ],
  initiative: ['dexterity', 'insight', 'initiative'],
  quirk: ['quirk_name', 'quirk_type', 'quirk_description', 'quirk_effect'],
  project: [
    'project_name',
    'project_cost',
    'project_clock',
    'project_clock_max',
    'project_special',
  ],
  feature: [
    'feature_name',
    'feature_class',
    'feature_detail1',
    'feature_detail2',
    'feature_detail3',
  ],
  rest: ['hp_max', 'mp_max'],
  zero: [
    'zero_name',
    'zero_description',
    'zero_effect',
    'zero_effect_description',
    'zero_trigger',
    'zero_clock',
    'zero_clock_max',
    'zero_trigger_step',
    'zero_trigger_effect',
  ],
};
ACTION_REQUEST.study10 = [
  ...ACTION_REQUEST.study7,
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
ACTION_REQUEST.study13 = [...ACTION_REQUEST.study10];

const COMMON_CHECKS: { [key: string]: any } = {
  sneak: {
    attrs: ['dexterity', 'dexterity'],
    label: 'Sneak',
    title: 'Moving silently, hiding and acting unnoticed.',
  },
  dodge: {
    attrs: ['dexterity', 'insight'],
    label: 'Dodge',
    title: 'Avoiding a trap or finding a way to flee a collapsing building.',
  },
  anticipate: {
    attrs: ['dexterity', 'insight'],
    label: 'Anticipate',
    title: 'Anticipating someone’s movements and catching them by surprise.',
  },
  tinker: {
    attrs: ['dexterity', 'insight'],
    label: 'Tinker',
    title: 'Completing a work of craftsmanship or repairing something.',
  },
  captivate: {
    attrs: ['dexterity', 'willpower'],
    label: 'Captivate',
    title: 'Moving gracefully to earn someone’s attention.',
  },
  study: {
    attrs: ['insight', 'insight'],
    label: 'Study',
    title: 'Examining or investigating someone or something.',
  },
  recall: {
    attrs: ['insight', 'insight'],
    label: 'Recall',
    title: 'Remembering useful information about something.',
  },
  interrogate: {
    attrs: ['insight', 'willpower'],
    label: 'Interrogate',
    title: 'Getting information from someone during a conversation.',
  },
  persuade: {
    attrs: ['insight', 'willpower'],
    label: 'Persuade',
    title: 'Persuading someone through authority or diplomacy.',
  },
  effort: {
    attrs: ['might', 'might'],
    label: 'Effort',
    title: 'Hard work, such as lifting a portcullis or pushing a statue.',
  },
  endure: {
    attrs: ['might', 'willpower'],
    label: 'Endure',
    title: 'Resisting intense pain or fatigue.',
  },
  intimidate: {
    attrs: ['might', 'willpower'],
    label: 'Intimidate',
    title: 'Intimidating someone with your strength.',
  },
  initiative: {
    attrs: ['dexterity', 'insight'],
    accuracy: 'initiative',
  },
};

const ROLLTEMPLATE_REQUESTS: string[] = ['character_avatar', 'sheet_type', 'roll_mods'];

const EQUIPMENT_REQUESTS: string[] = [
  'sheet_type',
  'dexterity',
  'insight',
  'dual_shieldbearer',
  'armor_defense_bonus',
  'armor_defense',
  'armor_is_martial',
  'armor_magic_defense_bonus',
  'defense_extra',
  'defense_extra',
  'magic_defense_extra',
  'magic_defense_extra',
  'shield_defense_bonus',
  'shield_magic_defense_bonus',
  'armor_initiative',
  'shield_initiative',
];

const CHARACTER_EQUIPMENTS: SectionDetails[] = [
  {
    section: 'repeating_armors',
    fields: [
      'armor_is_equipped',
      'armor_is_martial',
      'armor_defense',
      'armor_defense_bonus',
      'armor_magic_defense_bonus',
      'armor_initiative',
    ],
  },
  {
    section: 'repeating_shields',
    fields: [
      'shield_is_equipped',
      'shield_defense_bonus',
      'shield_magic_defense_bonus',
      'shield_initiative',
    ],
  },
  { section: 'repeating_accessories', fields: ['accessory_is_equipped'] },
  { section: 'repeating_weapons', fields: ['weapon_is_equipped', 'weapon_hands'] },
];

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
      'class_benefit',
      'class_martialmelee',
      'class_martialranged',
      'class_martialarmor',
      'class_martialshield',
    ],
  },
];

const CLASS_BENEFIT: { [key: string]: number } = {
  none: 0,
  hp: 5,
  mp: 5,
  ip: 2,
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
      'weapon_range',
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

const RITUAL_ACCURACY_DIFFICULTY: SectionDetails[] = [
  {
    section: 'repeating_rituals',
    fields: ['ritual_accuracy', 'ritual_potency', 'ritual_area'],
  },
];

const reverseMap = (enumObj: any, value: string): string => {
  return Object.keys(enumObj).find((key) => enumObj[key] === value);
};

const listenersByKey = (obj: object, event: string): { [key: string]: string } => {
  return Object.entries(obj).reduce((memo: { [key: string]: string }, [key, arr]) => {
    memo[key] = listeners(arr, event);
    return memo;
  }, {});
};

const listeners = (arr: string[], event: string = 'change'): string => {
  return arr.map((str: string) => `${event}:${str}`).join(' ');
};
