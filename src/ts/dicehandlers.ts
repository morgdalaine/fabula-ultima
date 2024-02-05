/// <reference path="constants.ts" />
/// <reference path="../chimera/ts/roll.ts" />

// Object.keys(SEND_TO_CHAT).forEach((chat) => {

on(`clicked:repeating_basic-attacks:sendattack`, async (eventInfo) => {
  console.log(eventInfo);
  sendToChat('basicattack', eventInfo);
});

// on(`clicked:sendattack`, async (eventInfo) => {
//   console.log('sigh');
//   console.log(eventInfo);
//   sendToChat('basicattack', eventInfo);
// });

// });

on(`clicked:repeating_basic-attacks:basicattack`, async (eventInfo) => {
  rollAction('basicattack', eventInfo);
});
