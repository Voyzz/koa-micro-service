const Router = require("koa-router");
const controllers = require('../controllers');

const router = new Router();

// ********** 路由 **********
// 主页模块接口
router.post('/homepageModules', controllers.homepageModules);
// 公司介绍页模块接口
router.post('/introductionModules', controllers.introductionModules);

module.exports = router;