const Koa = require("koa");
const app = new Koa();
const bodyParser = require('koa-bodyparser');

// 解析请求体
app.use(bodyParser());

// 路由
const router = require("./routes");
app.use(router.routes());

app.listen(3000);