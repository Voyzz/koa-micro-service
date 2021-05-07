# koa-micro-service

## 项目包含

- [小程序](https://github.com/Voyzz/MyCompany-miniProgram)
- [管理中台 ( React+TypeSciprt+Antd )](https://github.com/Voyzz/react-compony-mp-management)
- [服务接口 ( Koa2+Mysql )](https://github.com/Voyzz/koa-micro-service)

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
