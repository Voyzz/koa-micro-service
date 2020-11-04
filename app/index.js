const Koa = require("koa");
const router = require("./routes");
const app = new Koa();

// 路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);