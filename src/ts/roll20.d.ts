declare type EventInfo = {
  htmlAttributes?: { name: string; [key: string]: string };
  newValue: string;
  previousValue: string;
  removedInfo: string;
  sourceAttribute: string;
  sourceType: 'player' | 'sheetworker';
  triggerName: string;
};

declare type DiceRoll = {
  dice: number;
  sides: number;
  results: number[];
};

declare interface RollResult {
  // The result of the roll, as calculated by the roll server
  result: number;
  // An ordered array of the results of all dice in this roll
  dice: number[];
  // The original expression for this roll
  expression: string;
  // A breakdown of each “sub-roll” (each part of an expression is rolled separately)
  rolls: DiceRoll[];
}

// declare type RollResults<T extends string> = { [key in T]: RollResult };

// declare type RollCallback<T extends string> = (arg: {
//   rollId: string;
//   results: { [key in T]: RollResult };
// }) => void;

declare type RollResults = { [key: string]: RollResult };

declare type RollCallback = (arg: {
  rollId: string;
  results: { [key: string]: RollResult };
}) => void;

declare type AttributeContent = string | number | boolean;

declare function getAttrs(
  attributes: string[],
  callback?: (values: { [key: string]: string }) => void
): void;

declare function setAttrs(
  values: { [key: string]: AttributeContent },
  options?: { silent?: boolean },
  callback?: (values: { [key: string]: string }) => void
): void;

declare function getSectionIDs(section_name: string, callback: (values: string[]) => void): void;

declare function generateRowID(): string;

declare function removeRepeatingRow(RowID: string): void;

declare function getTranslationByKey(key: string): string | false;

declare function getTranslationLanguage(): string;

declare function setDefaultToken(values: { [key: string]: string }): void;

declare function on(event: string, callback: (eventInfo: EventInfo) => void): void;

declare function startRoll(roll: string, callback?: RollCallback): void;

declare function finishRoll(
  rollId: string,
  computedResults?: { [key: string]: string | number | any }
): void;
