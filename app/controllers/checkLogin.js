const {
    CheckLogin
} = require('../dbModel');
const jwt = require('jsonwebtoken')
const {secret} = require('../utils/token_secret');

/* @Params:
userName (required)
userKsy (required)
userType
*/
module.exports = async (ctx) => {
    const request_params = {...Object.assign(ctx.request.body,ctx.request.query)};
    let token=ctx.request.header.authorization;
    let ctxBody = {};
    if(!!token){
        const payload = await jwt.verify(token,secret);

        let { time, timeout } = payload;
        let data = new Date().getTime();
        if (data - time <= timeout) {
            // 未过期
            ctxBody = {
                status: 0,
                message:'token 未过期'
            };
        } else {
            //过期
            ctxBody = {
                status: 50014,
                message:'token 已过期'
            };
        }
    }else{
        const userInfo = await CheckLogin.findAll({
            where:request_params,
        })

        const res = [...userInfo].length>0;

        if(userInfo.err){
            ctxBody = {
                status: 1,
                message: 'error'
            }
        }else{
            // 登录成功
            if(res){
                let payload = {id:[...userInfo].id,time:new Date().getTime(),timeout:1000*60*60*2};
                let token = jwt.sign(payload, secret);
                ctxBody = {
                    status:0,
                    message:'登陆成功',
                    data:{
                        token
                    }
                }
            }
            // 登录失败
            else{
                ctxBody = {
                    status:1,
                    message:'密码错误'
                }
            }
        }
    }
    ctx.body=ctxBody;
}