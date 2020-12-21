const {
    UserInfos
} = require('../dbModel');

/* @Params:
openid (required)
appid
name
phone
location
compony
*/
module.exports = async (ctx) => {
    let _params = {...Object.assign(ctx.request.body,ctx.request.query)};
    const {openid} = _params;

    if(!!openid) {
        delete _params.openid;

        // 更新用户基础信息
        await UserInfos.update(_params,{
            where:{
                openid
            }
        })
    }

    ctx.body = {'message':'update userInfo success'};
}