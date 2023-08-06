const Router = require('koa-router');
const koaBody = require('koa-body');

const NFT = require('../../controllers/NFT');
const router = new Router();
router.use(koaBody());

router.get(
  '/getByAddress/:address',
  NFT.getByAddress
);


module.exports = router.routes();
