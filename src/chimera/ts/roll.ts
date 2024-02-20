function chimeraRoll<T extends string>(
  template: string,
  attributes: { [key: string]: string },
  rolls: { [key: string]: string },
  // rolls: { [key in T]: string },
  callback?: RollCallback
): void {
  const x = Object.entries(attributes)
    .map(([key, val]) => `{{${key}=${val}}}`)
    .join(' ');
  const r = Object.entries(rolls)
    .map(([key, val]) => `{{${key}=[[${val}]]}}`)
    .join(' ');
  const rollstring = `&{template:${template}} ${x} ${r}`;
  startRoll(rollstring, callback);
}
