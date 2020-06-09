const router = require('express').Router();

router.get('/user', (req, res, next) => {
  return res.send('hitting this endpoint');
});

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
