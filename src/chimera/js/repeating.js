class RepeatingModule {
  /**
   *
   * @param {string} fieldset
   */
  static isFieldsetEmpty = (fieldset) => {
    getSectionIDs(`repeating_${fieldset}`, (sections) => {
      console.log(fieldset, sections.length);
      setAttrs({ [`${fieldset}_empty`]: sections.length }, { silent: true });
    });
  };

  static getRepID = (sourceAttribute) => sourceAttribute.split('_').at(2);
}
