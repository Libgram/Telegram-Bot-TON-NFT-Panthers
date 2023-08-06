const Router = require('koa-router');
const koaBody = require('koa-body');

const Jetton = require('../../controllers/Jetton');
const router = new Router();
router.use(koaBody());

router.get(
  '/getByAddress/:address',
  Jetton.getByAddress
);


module.exports = router.routes();
