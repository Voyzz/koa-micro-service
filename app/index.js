const Koa = require("koa");
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

// 解析请求体
app.use(bodyParser());

// 路由
const router = require("./routes");
app.use(router.routes());

//跨域
app.use(cors());

app.listen(3000);