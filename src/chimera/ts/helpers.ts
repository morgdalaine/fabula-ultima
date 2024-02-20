function getTranslation(key: string, dne = ''): string {
  return getTranslationByKey(key) || dne;
}
