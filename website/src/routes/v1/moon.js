const Router = require('koa-router');
const koaBody = require('koa-body');

const Moon = require('../../controllers/Moon');
const router = new Router();
router.use(koaBody());

router.get(
  '/getAll',
  Moon.getAll
);


module.exports = router.routes();
