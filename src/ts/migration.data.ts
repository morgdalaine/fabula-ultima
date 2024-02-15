const CROSSWALK_TO_V20: Record<string, any> = {
  characterName: 'character_name',
  characterIdentity: 'identity',
  characterTheme: 'theme',
  characterOrigin: 'origin',
  fabulaPoints: 'fabula_points',
  experiencePoints: 'experience_points',
  HitPoints: 'hp',
  MindPoints: 'mp',
  InventoryPoints: 'ip',
  addedHitPoints: 'hp_extra',
  addedMindPoints: 'mp_extra',
  addedInventoryPoints: 'ip_extra',
  addedInitiative: 'initiative_extra',
  dexterity: 'dexterity_max',
  insight: 'insight_max',
  might: 'might_max',
  willpower: 'willpower_max',
  // slow: 'slow',
  // enraged: 'enraged',
  // dazed: 'dazed',
  // poisoned: 'poisoned',
  // shaken: 'shaken',
  moneyName: 'money_name',
  characterMoney: 'money',
  affinity: {
    physicalAffinity: 'physical',
    airAffinity: 'air',
    boltAffinity: 'bolt',
    darkAffinity: 'dark',
    earthAffinity: 'earth',
    fireAffinity: 'fire',
    iceAffinity: 'ice',
    lightAffinity: 'light',
    poisonAffinity: 'poison',
  },
  statusImmunitySlow: 'slow_immunity',
  statusImmunityEnraged: 'enraged_immunity',
  statusImmunityDazed: 'dazed_immunity',
  statusImmunityWeak: 'weak_immunity',
  statusImmunityShaken: 'shaken_immunity',
  statusImmunityPoisoned: 'poisoned_immunity',
  // addedDefense: '',
  // addedMagicDefense: '',
  // TODO implement quirks
  quirkName: 'quirk_name',
  quirkType: 'quirk_type',
  quirkText: 'quirk_description',
  quirkEffect: 'quirk_effect',
  // TODO implement zero powers
  zeroTrigger: 'zero_trigger',
  zeroClock: 'zero_clock',
  zeroClock_max: 'zero_clock_max',
  zeroTriggerFS: 'zero_trigger_fill',
  zeroTriggerText: 'zero_description',
  bonds: {
    BondName: 'bond1_name',
    BondEmotion1: 'bond1_approval',
    BondEmotion2: 'bond1_allegiance',
    BondEmotion3: 'bond1_fondness',
    BondDescription: 'bond1_description',
  },
  mainWeapon: {
    mainWeaponName: 'repeating_weapons_-CREATE_weapon_name',
    mainWeaponCategory: 'repeating_weapons_-CREATE_weapon_category',
    mainWeaponMartial: 'repeating_weapons_-CREATE_weapon_is_martial',
    mainWeaponAttr1Name: 'repeating_weapons_-CREATE_weapon_attr1',
    mainWeaponAttr2Name: 'repeating_weapons_-CREATE_weapon_attr2',
    mainWeaponAccuracy: 'repeating_weapons_-CREATE_weapon_accuracy',
    mainWeaponDamage: 'repeating_weapons_-CREATE_weapon_damage',
    mainWeaponDamageType: 'repeating_weapons_-CREATE_weapon_type',
    mainWeaponGrip: 'repeating_weapons_-CREATE_weapon_hands',
    mainWeaponRange: 'repeating_weapons_-CREATE_weapon_range',
    mainWeaponDescription: 'repeating_weapons_-CREATE_weapon_special',
  },
  offWeapon: {
    offWeaponName: 'repeating_weapons_-CREATE_weapon_name',
    offWeaponCategory: 'repeating_weapons_-CREATE_weapon_category',
    offWeaponMartial: 'repeating_weapons_-CREATE_weapon_is_martial',
    offWeaponAttr1Name: 'repeating_weapons_-CREATE_weapon_attr1',
    offWeaponAttr2Name: 'repeating_weapons_-CREATE_weapon_attr2',
    offWeaponAccuracy: 'repeating_weapons_-CREATE_weapon_accuracy',
    offWeaponDamage: 'repeating_weapons_-CREATE_weapon_damage',
    offWeaponDamageType: 'repeating_weapons_-CREATE_weapon_type',
    offWeaponGrip: 'repeating_weapons_-CREATE_weapon_hands',
    offWeaponRange: 'repeating_weapons_-CREATE_weapon_range',
    offWeaponDescription: 'repeating_weapons_-CREATE_weapon_special',
  },
  armor: {
    armorName: 'repeating_armors_-CREATE_armor_name',
    armorMartial: 'repeating_armors_-CREATE_armor_is_martial',
    armorInitiative: 'repeating_armors_-CREATE_armor_initiative',
    armorResist: 'repeating_armors_-CREATE_armor_magic_defense_bonus',
    armorDefense: 'repeating_armors_-CREATE_armor_defense',
    armorDescription: 'repeating_armors_-CREATE_armor_name',
  },
  shield: {
    shieldName: 'repeating_shields_-CREATE_shield_name',
    shieldResist: 'repeating_shields_-CREATE_shield_magic_defense_bonus',
    shieldDescription: 'repeating_shields_-CREATE_shield_special',
    shieldDefense: 'repeating_shields_-CREATE_shield_defense',
    shieldMartial: 'repeating_shields_-CREATE_shield_is_martial',
    shieldInitiative: 'repeating_shields_-CREATE_shield_initiative',
  },
  accessory: {
    accessoryName: 'repeating_accessories_-CREATE_accessory_name',
    accessoryDescription: 'repeating_accessories_-CREATE_accessory_special',
  },
  ritualArcanism: 'arcanism',
  ritualChimerism: 'chimerism',
  ritualElementalism: 'elementalism',
  ritualEntropism: 'entropism',
  ritualRitualism: 'ritualism',
  ritualSpiritism: 'spiritism',
  repeating_rituals: {
    ritualName: 'repeating_rituals_-CREATE_ritual_name',
    ritualAttr1Name: 'repeating_rituals_-CREATE_ritual_attr1',
    ritualAttr2Name: 'repeating_rituals_-CREATE_ritual_attr2',
    ritualCastBonus: 'repeating_rituals_-CREATE_ritual_accuracy',
    ritualCost: 'repeating_rituals_-CREATE_ritual_mp',
    // TODO implement ritual clock
    ritualAdvancement: 'repeating_rituals_-CREATE_ritual_clock',
    ritualMaxAdvancement: 'repeating_rituals_-CREATE_ritual_clock_max',
    ritualEffect: 'repeating_rituals_-CREATE_ritual_effect',
  },
  repeating_weapons: {
    additionalWeaponAttr1Name: 'repeating_weapons_-CREATE_weapon_attr1',
    additionalWeaponAttr2Name: 'repeating_weapons_-CREATE_weapon_attr2',
    additionalWeaponName: 'repeating_weapons_-CREATE_weapon_name',
    additionalWeaponCategory: 'repeating_weapons_-CREATE_weapon_category',
    additionalWeaponMartial: 'repeating_weapons_-CREATE_weapon_is_martial',
    additionalWeaponAccuracy: 'repeating_weapons_-CREATE_weapon_accuracy',
    additionalWeaponDamage: 'repeating_weapons_-CREATE_weapon_damage',
    additionalWeaponDamageType: 'repeating_weapons_-CREATE_weapon_type',
    additionalWeaponGrip: 'repeating_weapons_-CREATE_weapon_hands',
    additionalWeaponRange: 'repeating_weapons_-CREATE_weapon_range',
    additionalWeaponDescription: 'repeating_weapons_-CREATE_weapon_special',
  },
  repeating_charclasses: {
    className: 'repeating_classes_-CREATE_class_name',
    classBonus: 'repeating_classes_-CREATE_class_benefit',
    classDescription: 'repeating_classes_-CREATE_class_description',
    firstSkillName: 'repeating_classes_-CREATE_class_skill1_name',
    firstSkillLevel: 'repeating_classes_-CREATE_class_skill1_level',
    firstSkillDescription: 'repeating_classes_-CREATE_class_skill1_description',
    secondSkillName: 'repeating_classes_-CREATE_class_skill2_name',
    secondSkillLevel: 'repeating_classes_-CREATE_class_skill2_level',
    secondSkillDescription: 'repeating_classes_-CREATE_class_skill2_description',
    thirdSkillName: 'repeating_classes_-CREATE_class_skill3_name',
    thirdSkillLevel: 'repeating_classes_-CREATE_class_skill3_level',
    thirdSkillDescription: 'repeating_classes_-CREATE_class_skill3_description',
    fourthSkillName: 'repeating_classes_-CREATE_class_skill4_name',
    fourthSkillLevel: 'repeating_classes_-CREATE_class_skill4_level',
    fourthSkillDescription: 'repeating_classes_-CREATE_class_skill4_description',
    fifthSkillName: 'repeating_classes_-CREATE_class_skill5_name',
    fifthSkillLevel: 'repeating_classes_-CREATE_class_skill5_level',
    fifthSkillDescription: 'repeating_classes_-CREATE_class_skill5_description',
    // TODO implement heroic skills
    heroicSkillName: 'repeating_classes_-CREATE_class_skill6_name',
    heroicSkillDescription: 'repeating_classes_-CREATE_class6_skill_description',
  },
  repeating_offensivespells: {
    offensiveSpellName: 'repeating_spells_-CREATE_spell_name',
    offensiveSpellAttr1Name: 'repeating_spells_-CREATE_spell_attr1',
    offensiveSpellAttr2Name: 'repeating_spells_-CREATE_spell_attr2',
    offensiveSpellCastBonus: 'repeating_spells_-CREATE_spell_accuracy',
    offensiveSpellDamage: 'repeating_spells_-CREATE_spell_damage',
    offensiveSpellDamageType: 'repeating_spells_-CREATE_spell_type',
    offensiveSpellCost: 'repeating_spells_-CREATE_spell_mp',
    offensiveSpellDuration: 'repeating_spells_-CREATE_spell_duration',
    offensiveSpellTarget: 'repeating_spells_-CREATE_spell_target',
    offensiveSpellEffect: 'repeating_spells_-CREATE_spell_effect',
  },
  repeating_baseSpells: {
    baseSpellName: 'repeating_spells_-CREATE_spell_name',
    baseSpellCost: 'repeating_spells_-CREATE_spell_mp',
    baseSpellDuration: 'repeating_spells_-CREATE_spell_duration',
    baseSpellTarget: 'repeating_spells_-CREATE_spell_target',
    baseSpellEffect: 'repeating_spells_-CREATE_spell_effect',
  },
  repeating_inventoryitems: {
    inventoryItemName: 'repeating_inventories_-CREATE_inventory_name',
    inventoryItemIPCost: 'repeating_inventories_-CREATE_inventory_ip',
    inventoryItemEffect: 'repeating_inventories_-CREATE_inventory_effect',
  },
  repeating_projects: {
    projectName: 'repeating_projects_-CREATE_project_name',
    projectCost: 'repeating_projects_-CREATE_project_cost',
    projectAdvancement: 'repeating_projects_-CREATE_project_clock',
    projectDescription: 'repeating_projects_-CREATE_project_description',
  },
  repeating_spareequipments: {
    spareEquipType: 'repeating_armors_-CREATE_armor_type',
    spareEquipName: 'repeating_armors_-CREATE_armor_name',
    spareEquipMartial: 'repeating_armors_-CREATE_armor_is_martial',
    spareEquipDefense: 'repeating_armors_-CREATE_armor_defense',
    spareEquipResist: 'repeating_armors_-CREATE_armor_magic_defense_bonus',
  },
  repeating_spareaccessories: {
    spareAccessoryName: 'repeating_accessories_-CREATE_accessory_name',
    spareAccessoryDescription: 'repeating_accessories_-CREATE_accessory_special',
  },
  repeating_items: {
    itemName: 'repeating_items_-CREATE_item_name',
    itemText: 'repeating_items_-CREATE_item_effect',
  },
  repeating_ritualdisciplines: {
    ritualCustomDisciplineName: 'repeating_ritualdisciplines_-CREATE_ritual_discipline_name',
  },
  repeating_notes: {
    noteName: 'note_name',
    noteText: 'note_effect',
  },
  repeating_quests: {
    questName: 'repeating_quests_-CREATE_quest_name',
    questText: 'repeating_quests_-CREATE_quest_effect',
  },
  repeating_jcharacters: {
    jCharacterName: 'repeating_characters_-CREATE_character_name',
    jCharacterText: 'repeating_characters_-CREATE_character_effect',
  },
  repeating_creatures: {
    creatureName: 'repeating_creatures_-CREATE_creature_name',
    creatureText: 'repeating_creatures_-CREATE_creature_effect',
  },
  repeating_locations: {
    locationName: 'repeating_locations_-CREATE_location_name',
    locationText: 'repeating_locations_-CREATE_location_effect',
  },
  repeating_jitems: {
    jItemName: 'repeating_artifacts_-CREATE_artifact_name',
    jItemText: 'repeating_artifacts_-CREATE_artifact_effect',
  },
  repeating_otherdiscoveries: {
    otherDiscoveryText: 'repeating_discoveries_-CREATE_discovery_name',
    otherDiscoveryName: 'repeating_discoveries_-CREATE_discovery_effect',
  },
  repeating_zeroeffects: {
    zeroName: 'repeating_zeropowers_-CREATE_zero_power_name',
    zeroText: 'repeating_zeropowers_-CREATE_zero_power_description',
    zeroEffect: 'repeating_zeropowers_-CREATE_zero_power_effect',
    zeroEffectText: 'repeating_zeropowers_-CREATE_zero_power_effect_description',
  },
  repeating_rolls: {
    genericRollName: 'repeating_rolls_-CREATE_roll_name',
    genericRollAttr1Name: 'repeating_rolls_-CREATE_roll_attr1',
    genericRollAttr2Name: 'repeating_rolls_-CREATE_roll_attr2',
  },
};

const CROSSWALK_REQUEST: string[] = [
  'characterName',
  'characterIdentity',
  'characterTheme',
  'characterOrigin',
  'fabulaPoints',
  'experiencePoints',
  'HitPoints',
  'MindPoints',
  'InventoryPoints',
  'addedHitPoints',
  'addedMindPoints',
  'addedInventoryPoints',
  'addedInitiative',
  'dexterity',
  'insight',
  'might',
  'willpower',
  'moneyName',
  'characterMoney',
  'physicalAffinity',
  'airAffinity',
  'boltAffinity',
  'darkAffinity',
  'earthAffinity',
  'fireAffinity',
  'iceAffinity',
  'lightAffinity',
  'poisonAffinity',
  'statusImmunitySlow',
  'statusImmunityEnraged',
  'statusImmunityDazed',
  'statusImmunityWeak',
  'statusImmunityShaken',
  'statusImmunityPoisoned',
  'quirkName',
  'quirkType',
  'quirkText',
  'quirkEffect',
  'zeroTrigger',
  'zeroClock',
  'zeroClock_max',
  'zeroTriggerFS',
  'zeroTriggerText',
  'mainWeaponName',
  'mainWeaponCategory',
  'mainWeaponMartial',
  'mainWeaponAttr1Name',
  'mainWeaponAttr2Name',
  'mainWeaponAccuracy',
  'mainWeaponDamage',
  'mainWeaponDamageType',
  'mainWeaponGrip',
  'mainWeaponRange',
  'mainWeaponDescription',
  'offWeaponName',
  'offWeaponCategory',
  'offWeaponMartial',
  'offWeaponAttr1Name',
  'offWeaponAttr2Name',
  'offWeaponAccuracy',
  'offWeaponDamage',
  'offWeaponDamageType',
  'offWeaponGrip',
  'offWeaponRange',
  'offWeaponDescription',
  'armorName',
  'armorMartial',
  'armorInitiative',
  'armorResist',
  'armorDefense',
  'armorDescription',
  'shieldName',
  'shieldResist',
  'shieldDescription',
  'shieldDefense',
  'shieldMartial',
  'shieldInitiative',
  'accessoryName',
  'accessoryDescription',
  'ritualArcanism',
  'ritualChimerism',
  'ritualElementalism',
  'ritualEntropism',
  'ritualRitualism',
  'ritualSpiritism',
  ...['first', 'second', 'third', 'fourth', 'fifth', 'sixth'].flatMap((nth) =>
    ['BondName', 'BondEmotion1', 'BondEmotion2', 'BondEmotion3', 'BondDescription'].map(
      (attr) => nth + attr
    )
  ),
];

const CROSSWALK_SECTION_DETAILS: SectionDetails[] = [
  {
    section: 'repeating_rituals',
    fields: [
      'ritualName',
      'ritualAttr1Name',
      'ritualAttr2Name',
      'ritualCastBonus',
      'ritualCost',
      'ritualAdvancement',
      'ritualMaxAdvancement',
      'ritualEffect',
    ],
  },
  {
    section: 'repeating_weapons',
    fields: [
      'additionalWeaponAttr1Name',
      'additionalWeaponAttr2Name',
      'additionalWeaponName',
      'additionalWeaponCategory',
      'additionalWeaponMartial',
      'additionalWeaponAccuracy',
      'additionalWeaponDamage',
      'additionalWeaponDamageType',
      'additionalWeaponGrip',
      'additionalWeaponRange',
      'additionalWeaponDescription',
    ],
  },
  {
    section: 'repeating_charclasses',
    fields: [
      'className',
      'classBonus',
      'classDescription',
      'firstSkillName',
      'firstSkillLevel',
      'firstSkillDescription',
      'secondSkillName',
      'secondSkillLevel',
      'secondSkillDescription',
      'thirdSkillName',
      'thirdSkillLevel',
      'thirdSkillDescription',
      'fourthSkillName',
      'fourthSkillLevel',
      'fourthSkillDescription',
      'fifthSkillName',
      'fifthSkillLevel',
      'fifthSkillDescription',
      'heroicSkillName',
      'heroicSkillDescription',
    ],
  },
  {
    section: 'repeating_offensivespells',
    fields: [
      'offensiveSpellName',
      'offensiveSpellAttr1Name',
      'offensiveSpellAttr2Name',
      'offensiveSpellCastBonus',
      'offensiveSpellDamage',
      'offensiveSpellDamageType',
      'offensiveSpellCost',
      'offensiveSpellDuration',
      'offensiveSpellTarget',
      'offensiveSpellEffect',
    ],
  },
  {
    section: 'repeating_baseSpells',
    fields: [
      'baseSpellName',
      'baseSpellCost',
      'baseSpellDuration',
      'baseSpellTarget',
      'baseSpellEffect',
    ],
  },
  {
    section: 'repeating_inventoryitems',
    fields: ['inventoryItemName', 'inventoryItemIPCost', 'inventoryItemEffect'],
  },
  {
    section: 'repeating_projects',
    fields: ['projectName', 'projectCost', 'projectAdvancement', 'projectDescription'],
  },
  {
    section: 'repeating_spareequipments',
    fields: [
      'spareEquipName',
      'spareEquipType',
      'spareEquipMartial',
      'spareEquipDefense',
      'spareEquipResist',
    ],
  },
  {
    section: 'repeating_spareaccessories',
    fields: ['spareAccessoryName', 'spareAccessoryDescription'],
  },
  { section: 'repeating_items', fields: ['itemName', 'itemText'] },
  { section: 'repeating_ritualdisciplines', fields: ['ritualCustomDisciplineName'] },
  { section: 'repeating_notes', fields: ['noteName', 'noteText'] },
  { section: 'repeating_quests', fields: ['questName', 'questText'] },
  { section: 'repeating_jcharacters', fields: ['jCharacterName', 'jCharacterText'] },
  { section: 'repeating_creatures', fields: ['creatureName', 'creatureText'] },
  { section: 'repeating_locations', fields: ['locationName', 'locationText'] },
  { section: 'repeating_jitems', fields: ['jItemName', 'jItemText'] },
  { section: 'repeating_otherdiscoveries', fields: ['otherDiscoveryText', 'otherDiscoveryName'] },
  {
    section: 'repeating_zeroeffects',
    fields: ['zeroName', 'zeroText', 'zeroEffect', 'zeroEffectText'],
  },
  {
    section: 'repeating_rolls',
    fields: ['genericRollName', 'genericRollAttr1Name', 'genericRollAttr2Name'],
  },
];

const CROSSWALK_AFFINITIES: { [key: string]: string } = {
  Vulnerability: 'vu',
  Normal: '',
  Resistance: 'rs',
  Immunity: 'im',
  Absorption: 'ab',
};

const CROSSWALK_BONDS: { [key: string]: string } = {
  admiration: 'approval',
  inferiority: 'approval',
  loyalty: 'allegiance',
  mistrust: 'allegiance',
  affection: 'fondness',
  hatred: 'fondness',
};
