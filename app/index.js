const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const router = require("./routes");

const app = new Koa();

// 解析请求体
app.use(bodyParser());

// 路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);