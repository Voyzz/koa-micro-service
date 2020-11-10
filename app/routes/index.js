const Router = require("koa-router");
const Controllers = require('../controllers');

const router = new Router();

// ********** 路由 **********
// 主页模块接口
router.get('/homepageModules', Controllers.homepageModules);

module.exports = router;