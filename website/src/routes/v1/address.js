const Router = require('koa-router');
const koaBody = require('koa-body');

const Address = require('../../controllers/Address');
const router = new Router();
router.use(koaBody());
router.get(
  '/get/:address',
  Address.get
);

router.post(
  '/get',
  Address.getHistory
);


module.exports = router.routes();
