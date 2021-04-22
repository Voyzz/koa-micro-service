const Koa = require("koa");
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const checkLogin = require('./middleware/checkLogin')

// 解析请求体
app.use(bodyParser());

//跨域
app.use(cors());

// 路由
const router = require("./routes");
app.use(router.routes());

app.use(checkLogin)

app.listen(3000);