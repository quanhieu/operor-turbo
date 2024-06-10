import { getDb } from './db';
import { MigrationSet } from 'migrate'

class Storage {
  load(fn: any) {
    return getDb()
      .then((db) => db.collection('migrations').find().toArray())
      .then((data) => {
        if (!data.length) return fn(null, {});
        const store = data[0];
        // Check if does not have required properties
        if (
          !Object.prototype.hasOwnProperty.call(store, 'lastRun') ||
          !Object.prototype.hasOwnProperty.call(store, 'migrations')
        ) {
          return fn(new Error('Invalid store file'));
        }
        return fn(null, store);
      })
      .catch(fn);
  }

  save(set: MigrationSet, fn: any) {
    return getDb()
      .then((db) =>
        db.collection('migrations').updateOne(
          {},
          {
            $set: {
              lastRun: set.lastRun,
              migrations: set.migrations,
            },
          },
          {
            upsert: true,
          },
        ),
      )
      .then((result) => fn(null, result))
      .catch(fn);
  }
}

module.exports = Storage;
