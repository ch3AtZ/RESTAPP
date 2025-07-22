const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { MikroORM } = require('@mikro-orm/core');
const mikroConfig = require('./mikro-orm.config');

const { RequestHistorySchema } = require('./RequestHistory');

const app = express();
app.use(cors());
app.use(express.json());

let orm;

app.use(async (req, next) => {
  req.orm = orm;
  next();
});

app.post('/api/request', async (req, res) => {
  
  const { method, url, body } = req.body;

  if (!method || !url) {
    return res.status(400).json({ error: 'Method and URL are required' });
  }

  try {
    const start = Date.now();
    const response = await axios({ 
      method, 
      url, 
      data: body,
      timeout: 10000 
    });
    const end = Date.now();
    

    const em = orm.em.fork();
    
    
    const record = em.create('RequestHistory', {
      method: method.toUpperCase(),
      url,
      timestamp: new Date(),
      responseTime: end - start,
      statusCode: response.status,
    });

    console.log('📝 Record created:', {
      method: record.method,
      url: record.url,
      timestamp: record.timestamp,
      responseTime: record.responseTime,
      statusCode: record.statusCode
    });

    await em.persistAndFlush(record);
    

    res.json({ 
      status: response.status, 
      data: response.data,
      saved: true 
    });

  } catch (error) {
    
    
    try {
      const em = orm.em.fork();
      const record = em.create('RequestHistory', {
        method: method.toUpperCase(),
        url,
        timestamp: new Date(),
        responseTime: 0,
        statusCode: error.response?.status || 500,
      });

      await em.persistAndFlush(record);
      console.log('Error record saved to database');
    } catch (dbError) {
      
    }

    res.status(500).json({ error: error.message });
  }
});


app.get('/api/history', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const em = orm.em.fork();
    const [records, count] = await em.findAndCount('RequestHistory', {}, {
      limit,
      offset,
      orderBy: { timestamp: 'DESC' },
    });

    res.json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      records,
    });
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});
(async () => {
  try {
    
    orm = await MikroORM.init({
      ...mikroConfig,
      entities: [RequestHistorySchema],
    });
    

    
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
    

    app.listen(4000, () => {
      console.log('Server started on http://localhost:4000');
      console.log('Check records on http://localhost:4000/api/history');
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
})();