const Router = require('koa-router');

const nft = require('./nft');
const jetton = require('./jetton');
const profile = require('./profile');
const address = require('./address');
const moon = require('./moon');
const chart = require('./chart');
const router = new Router();

router.use('/nft', nft);
router.use('/jetton', jetton);
router.use('/profile', profile);
router.use('/address', address);
router.use('/moon', moon);
router.use('/chart', chart);

module.exports = router.routes();
