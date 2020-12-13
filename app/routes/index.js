const Router = require("koa-router");
const controllers = require('../controllers');

const router = new Router();

// 主页模块接口
router.post('/homepageModules', controllers.homepageModules);
// 公司介绍页模块接口
router.post('/introductionModules', controllers.introductionModules);

// 获取产品信息列表
router.post('/getProductList', controllers.getProductList);
// 创建产品
router.post('/addProduct', controllers.addProduct);


module.exports = router;