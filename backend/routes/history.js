const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const em = req.orm.em.fork();
  const [result, count] = await em.findAndCount('RequestHistory', {}, {
    offset,
    limit,
    orderBy: { createdAt: 'DESC' },
  });

  res.json(result);
});

module.exports = router;
