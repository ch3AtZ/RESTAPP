const { EntitySchema } = require('@mikro-orm/core');

const RequestHistorySchema = new EntitySchema({
  name: 'RequestHistory',
  tableName: 'request_history',
  properties: {
    id: { type: 'number', primary: true, autoincrement: true },
    url: { type: 'string' },
    method: { type: 'string' },
    timestamp: { type: 'Date' },
    responseTime: { type: 'number' },
    statusCode: { type: 'number' },
  },
});

module.exports = { RequestHistorySchema };
