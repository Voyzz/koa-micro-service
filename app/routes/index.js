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
// 更新产品
router.post('/updateProduct', controllers.updateProduct);
// 删除产品
router.post('/deleteProduct', controllers.deleteProduct);

// 获取用户信息
router.post('/getUserInfo', controllers.getUserInfo);
// 添加用户信息
router.post('/addUserInfo', controllers.addUserInfo);
// 更新用户信息
router.post('/updateUserInfo', controllers.updateUserInfo);
// 删除用户信息
router.post('/deleteUserInfo', controllers.deleteUserInfo);

// 获取用户收藏列表
router.post('/getUserFavoList', controllers.getUserFavoList);
// 获取用户历史访问列表
router.post('/getUserHistoryList', controllers.getUserHistoryList);

// 登录验证
router.post('/checkLogin', controllers.checkLogin);

module.exports = router;