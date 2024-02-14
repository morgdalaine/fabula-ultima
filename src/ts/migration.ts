const fabulaMigrations: ChimeraMigration[] = [
  new ChimeraMigration('bestiary', { set: 0.1 }, (resolve, reject) => {
    console.log('do the thing!');
    resolve();
  }),
];

const handleMigrations = (eventInfo: EventInfo) => {
  const migrator = new ChimeraMigrator('Fabula Ultima', fabulaMigrations);
  migrator.validate(() => {});
};
