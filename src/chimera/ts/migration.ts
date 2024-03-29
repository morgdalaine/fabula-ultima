/**
 * @class ChimeraMigration
 */
class ChimeraMigrator {
  sheet: string;
  migrations: ChimeraMigration[];
  version_attr: string;
  migration_attr: string;
  logToConsole: { [key: string]: string } = {};

  constructor(
    sheet: string,
    migrations: ChimeraMigration[],
    version_attr = 'sheet_version',
    migration_attr = 'sheet_migration'
  ) {
    this.sheet = sheet;
    this.migrations = migrations;
    this.version_attr = version_attr ?? 'sheet_version';
    this.migration_attr = migration_attr ?? 'sheet_migrations';
  }

  /**
   * Validate migrations passed to the migrator
   * @param callback
   */
  validate(callback: Function): void {
    this.getAppliedMigrations((applied) => {
      const existing = this.migrations.filter((m) => applied.includes(m.id)).map((m) => m.id);
      existing.forEach((m) => (this.logToConsole[m] = 'Already installed'));
    });
    this.handleNext(callback);
  }

  /**
   * Get array of existing migrations applied to the sheet
   * @param callback
   */
  getAppliedMigrations(callback: (m: string[]) => void) {
    getAttrs([this.migration_attr], (values) => {
      const applied = values[this.migration_attr] ? values[this.migration_attr].split(',') : [];
      callback(applied);
    });
  }

  setAppliedMigrations(updates: string[], callback: any) {
    setAttrs(
      {
        [this.migration_attr]: Array.from(new Set(updates)).join(),
      },
      { silent: true },
      callback()
    );
  }

  handleNext(callback: Function) {
    this.getAppliedMigrations((applied) => {
      const toBeInstalled = this.migrations.filter(
        (m) => !applied.includes(m.id) && !Object.hasOwn(this.logToConsole, m.id)
      );

      if (toBeInstalled.length) {
        toBeInstalled.at(0).apply(this.version_attr, this, callback);
      } else {
        this.finish();
        callback();
      }
    });
  }

  resolveMigration(id: string, error: string, callback: any) {
    this.logToConsole[id] = error;
    this.getAppliedMigrations((applied) => {
      const migrations = Array.from(new Set([...applied, id]));
      const matches = this.migrations.filter((m) => migrations.includes(m.id)).map((m) => m.id);
      this.setAppliedMigrations(matches, () => this.handleNext(callback));
    });
  }

  rejectMigration(id: string, error: string, callback: any) {
    this.logToConsole[id] = error;
    this.handleNext(callback);
  }

  finish() {
    getAttrs([this.version_attr, 'character_name'], (values) => {
      const migrations = Object.entries(this.logToConsole);
      if (migrations.length) {
        console.groupCollapsed('CHIMERA: Migration Installer');
        migrations.forEach(([update, msg]) => console.log(`Applying ${update}... ${msg}`));
        console.groupEnd();
      }

      console.log(`${this.sheet} v${values[this.version_attr]}`);
    });
  }
}

type ChimeraMigrationVersion = {
  set: number;
  min?: number;
  max?: number;
};

type ChimeraMigrationCallback = (resolve: () => void, reject: (error: string) => void) => void;

class ChimeraMigration {
  id: string;
  version: Partial<ChimeraMigrationVersion> = {};
  version_attr: string;
  migrator: ChimeraMigrator;
  migration: ChimeraMigrationCallback;
  callback: Function;

  constructor(id: string, version: ChimeraMigrationVersion, migration: ChimeraMigrationCallback) {
    this.id = id;
    this.migration = migration;

    this.version.set = version.set;
    this.version.min = version.min || 0;
    this.version.max = version.max || Infinity;
  }

  apply(version_attr: string, migrator: ChimeraMigrator, callback: Function) {
    this.version_attr = version_attr;
    this.migrator = migrator;
    this.callback = callback;

    this.getVersion((version) => {
      if (this.isValid(version)) {
        this.migration(this.resolve.bind(this), this.reject.bind(this));
      } else {
        this.reject('Invalid version');
      }
    });
  }

  getVersion(callback: (version: number) => void) {
    getAttrs([this.version_attr], (values) => callback(parseFloat(values[this.version_attr]) || 0));
  }

  setVersion(version: number, callback: () => void) {
    setAttrs({ [this.version_attr]: version }, { silent: true }, () => callback());
  }

  isValid(version: number) {
    return (
      version >= this.version.min && (version < this.version.set || version <= this.version.max)
    );
  }

  /**
   * Resolve the patch migration
   */
  private resolve() {
    this.setVersion(this.version.set, () => {
      this.migrator.resolveMigration(this.id, 'Done!', this.callback);
    });
  }
  private reject(error: string) {
    this.migrator.resolveMigration(this.id, error, this.callback);
  }
}
