const Koa = require("koa");
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

// 解析请求体
app.use(bodyParser());

//跨域
app.use(cors());

// 路由
const router = require("./routes");
app.use(router.routes());



app.listen(3030);