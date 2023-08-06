const Router = require('koa-router');
const koaBody = require('koa-body');

const Profile = require('../../controllers/Profile');
const router = new Router();
router.use(koaBody());
router.get(
  '/get/:username',
  Profile.get
);

router.get(
  '/getByUserId/:username',
  Profile.getByUserId
);



module.exports = router.routes();
