const Router = require("koa-router");
const Controllers = require('../controllers');

const router = new Router();

// ********** 路由 **********
// 查询书籍信息
router.get('/user', Controllers.user);

module.exports = router;