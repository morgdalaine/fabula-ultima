var G_REPEATING = [
    'bonds',
    'attacks',
    'weapons',
    'spells',
    'notes',
    'specials',
    'actions',
    'rare-gear',
];
var G_STAT_UPDATES = {
    hp: ['hp_extra'],
};
on('change:defense_quick', function (eventInfo) {
    calculateQuickDefenses(eventInfo.newValue);
});
on('change:defense_extra change:magic_defense_extra', function (eventInfo) {
    updateQuickDefenseDropdown();
});
on('sheet:opened ' + G_STAT_UPDATES, function (eventInfo) {
    calculateAttribute(eventInfo);
});
var calculateQuickDefenses = function (value) {
    if (!value)
        return;
    var _a = value.split('/'), def = _a[0], mdef = _a[1];
    setAttrs({
        defense_extra: def,
        magic_defense_extra: mdef,
    }, { silent: true });
};
var updateQuickDefenseDropdown = function () {
    getAttrs(['defense_extra', 'magic_defense_extra'], function (v) {
        setAttrs({
            defense_quick: "".concat(v.defense_extra, "/").concat(v.magic_defense_extra),
        }, { silent: true });
    });
};
var calculateAttribute = function (eventInfo) {
    console.group('calculateAttribute');
    console.log(eventInfo);
    console.groupEnd();
    if (eventInfo.newValue) {
    }
};
