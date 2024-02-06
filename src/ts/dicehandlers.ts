/// <reference path="constants.ts" />
/// <reference path="../chimera/ts/roll.ts" />

Object.entries(CLICK_LISTENERS).forEach(([btn, key]) => {
  on(`clicked:${btn}`, async (eventInfo) => {
    const id = RepeatingModule.getRepId(eventInfo?.sourceAttribute);
    return handleClick(key, id);
  });
});
