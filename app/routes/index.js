const Router = require("koa-router");
const Controllers = require('../controllers');
const router = new Router();

// 查询书籍信息
router.get('/query', Controllers.query);

module.exports = router;