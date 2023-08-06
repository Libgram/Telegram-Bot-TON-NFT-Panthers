const Router = require('koa-router');
const koaBody = require('koa-body');

const Chart = require('../../controllers/Chart');
const router = new Router();
router.use(koaBody());
router.get(
  '/capNFTsqewqeqewqregegdsfdsfsdeqweqwpl',
  Chart.capNFTs
);



module.exports = router.routes();
