const { SqliteDriver } = require('@mikro-orm/sqlite');
const { defineConfig } = require('@mikro-orm/core');
const { RequestHistorySchema } = require('./RequestHistory');

module.exports = defineConfig({
  driver: SqliteDriver,
  dbName: 'h1.sqlite',
  entities: [RequestHistorySchema],
  debug:true,
});
