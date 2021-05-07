# koa-micro-service

## 配置

### sql_config.js

```JavaScript
const CONFIG = {
  host     : 'localhost',
  user     : 'root',
  password : '***',
  database : '***'
}

module.exports = CONFIG
```

### utils/token_secret.js

```JavaScript
const secret = "***";

module.exports = {secret}
```

## 启动

```shell
pm2 start /root/koa-micro-service/app/index.js
```
