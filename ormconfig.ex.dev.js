const host = 'localhost';
const port = 3306;
const username = 'radio';
const password = 'radio';
const database = 'radio_dev';
const testDatabase = 'radio_test';

module.exports = [
  {
    type: 'mariadb',
    host,
    port,
    username,
    password,
    database,
    timezone: '+00:00',
    synchronize: false,
    logging: false,
    entities: ['dist/**/*.entity.js'],
  },
  {
    name: 'cli',
    type: 'mariadb',
    host,
    port,
    username,
    password,
    database,
    timezone: '+00:00',
    synchronize: false,
    logging: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['database/migrations/**/*.ts'],
    subscribers: ['database/subscribers/**/*.ts'],
    cli: {
      entitiesDir: 'database/entities',
      migrationsDir: 'database/migrations',
      subscribersDir: 'database/subscribers',
    },
  },
  {
    name: 'seed',
    type: 'mariadb',
    host,
    port,
    username,
    password,
    database,
    timezone: '+00:00',
    synchronize: false,
    logging: false,
    migrationsTableName: 'seeds',
    entities: ['src/**/*.entity.ts'],
    migrations: ['database/seeds/**/*.ts'],
    cli: {
      migrationsDir: 'database/seeds',
    },
  },
  {
    name: 'test',
    type: 'mariadb',
    host,
    port,
    username,
    password,
    database: testDatabase,
    timezone: '+00:00',
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: ['**/*.entity.js'],
  },
];
