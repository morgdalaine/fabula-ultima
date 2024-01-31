/**
 * RepeatingSections standardizes code for handling and manipulating repeating sections
 * @class RepeatingSections
 */
class RepeatingModule {
  /**
   * Checks if a repcontain (e.g. repeating_weapons) is empty.
   * This is calculated by looking at the length of IDs in fieldset.
   * @param section name of a repeating fieldset (repcontainer)
   * @param suffix attribute name as section_suffix (e.g. weapons_count)
   **/
  static isFieldsetEmpty(section: string, suffix = 'empty') {
    console.log('isFieldsetEmpty');
    getSectionIDs(section, (id) => {
      console.log({ [`${section}_${suffix}`]: id.length });
      setAttrs({ [`${section}_${suffix}`]: id.length });
    });
  }

  private getRepID(sourceAttribute: string) {
    sourceAttribute.split('_').at(2);
  }

  // /**
  //  * Move rows from source fieldset to target and remove source rows
  //  * @param {string} source name of repeating section to transfer from
  //  * @param {string} target name of repeating section to transfer to
  //  * @param {string[]} fields to be migrated from source
  //  * @param {object[]} sectionDetails
  //  * @param {string[]} getArray
  //  * @param {callback} callback function to add new fields to target fieldset
  //  * @param {boolean} [removeSource] delete originating row, defaults to true
  //  */
  // static migrateRepeatingSection(
  //   source,
  //   target,
  //   fields,
  //   sectionDetails,
  //   getArray = [],
  //   callback,
  //   removeSource = true
  // ) {
  //   this.getAllAttrs(sectionDetails, getArray, (attributes, sections) => {
  //     let updates = {};

  //     const uniqueRowIds = [...sections[target]];
  //     sections[source].forEach((sourceId) => {
  //       let targetId = generateRowID();
  //       while (targetId in uniqueRowIds) {
  //         targetId = generateRowID();
  //       }

  //       fields.forEach((field) => {
  //         const oldAttr = `${source}_${sourceId}_${field}`;
  //         const value = attributes[oldAttr] || '';
  //         const newAttr = `${target}_${targetId}_${field}`;

  //         updates[newAttr] = value;
  //       });

  //       if (callback) {
  //         const additionalFields = callback(sourceId, targetId, updates);
  //         updates = { ...updates, additionalFields };
  //       }

  //       uniqueRowIds.push(targetId);

  //       if (removeSource) removeRepeatingRow(`${source}_${sourceId}`);
  //     });

  //     setAttrs(updates);
  //   });
  // }
  // /**
  //  * Combines [getAttrs()](https://wiki.roll20.net/Sheet_Worker_Scripts#getAttrs.28attributeNameArray.2C_callback.29)
  //  * and [getSectionIDs](https://wiki.roll20.net/Sheet_Worker_Scripts#getSectionIDs.28section_name.2Ccallback.29)
  //  * @param {Object} sectionDetails repeating section request
  //  *  @example
  //  *    // example of sectionDetails object
  //  *    const G_DEFAULT_REPEATING = [
  //  *      { section: "repeating_inventory", fields: ["weight", "name", "quantity"] },
  //  *      { section: "repeating_attack", fields: ["bonus", "damage", "name"] },
  //  *    ];
  //  * @param {string[]} getArray optional global attribute request
  //  * @param {callback} callback
  //  * @returns {(Object|Object)}
  //  */
  // static getAllAttrs(sectionDetails, getArray = [], callback) {
  //   const args = new Array(arguments.length);
  //   for (var i = 0; i < args.length; ++i) args[i] = arguments[i];

  //   sectionDetails = structuredClone(args.shift());
  //   callback = args.pop();
  //   if (typeof callback !== 'function') return;

  //   if (args.length > 0) getArray = structuredClone(args.shift());
  //   else getArray = [];

  //   this.#getSections(getArray, sectionDetails, (getArr, sections) => {
  //     getAttrs(getArr, (attributes) => {
  //       // order the sections
  //       this.#orderSections(attributes, sections);

  //       // call the callback function to finally do what we wanted to do.
  //       callback(attributes, sections);
  //     });
  //   });
  // }
  // /**
  //  * Gets the rowIDs for all the sections passed to it,
  //  * and assembles an array of repeating attributes to get.
  //  * Does this via a work queue or burndown set up.
  //  * Arguments are the same as for getAllAttrs with the addition of sections.
  //  * @param {*} getArray
  //  * @param {*} sectionDetails
  //  * @param {callback} callback
  //  * @param {*} sections accumulates the idArrays for each section
  //  */
  // private getSections(getArray = [], sectionDetails = [], callback, sections = {}) {
  //   // grab the first section to work;
  //   let section = sectionDetails.shift();
  //   getSectionIDs(section.section, (idArray) => {
  //     // store the idArray for use later on if needed.
  //     sections[section.section] = [...idArray];

  //     // add the sections reporder to the getArray so that we can order the idArray later.
  //     getArray.push(`_reporder_${section.section}`);
  //     // iterate through the ids
  //     idArray.forEach((id) => {
  //       // Iterate through each of the fields for the repeating section
  //       section.fields.forEach((field) => {
  //         // add the repeating attribute for this id to the getArray
  //         getArray.push(`${section.section}_${id}_${field}`);
  //       });
  //     });
  //     if (sectionDetails[0]) {
  //       // If there's another section to work through, go through the burndown again
  //       this.#getSections(getArray, sectionDetails, callback, sections);
  //     } else {
  //       // If no sections are left, call the callback
  //       callback(getArray, sections);
  //     }
  //   });
  // }
  // /**
  //  * Splits a comma delimited string into an array
  //  * @param {string} string
  //  * @returns {Array}
  //  */
  // private commaArray(string = '') {
  //   return string.toLowerCase().split(/\s*,\s*/);
  // }
  // /**
  //  * Orders a single ID array.
  //  * @param {*} repOrder
  //  * @param {Array} rowIds
  //  */
  // private orderSection(repOrder, rowIds = []) {
  //   rowIds.sort((a, b) => {
  //     return repOrder.indexOf(a.toLowerCase()) - repOrder.indexOf(b.toLowerCase());
  //   });
  // }
  // /**
  //  * Orders the section id arrays to match the repOrder attribute
  //  * @param {Object} attributes
  //  * @param {Array} sections
  //  */
  // private orderSections(attributes, sections) {
  //   Object.keys(sections).forEach((section) => {
  //     attributes[`_reporder_${section}`] = this.#commaArray(attributes[`_reporder_${section}`]);
  //     this.#orderSection(attributes[`_reporder_${section}`], sections[section]);
  //   });
  // }
}
