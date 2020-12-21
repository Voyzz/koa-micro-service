const {
    UserInfos,
    UserFavoriteProduct,
    UserHistoryProduct
} = require('../dbModel');

/* @Params:
openid (required)
appid
name
phone
location
compony
favo_pro_id
history_pro_id
*/

module.exports = async (ctx) => {
    const now = Date.now();

    let _params = {...Object.assign(ctx.request.body,ctx.request.query)};

    const {
        openid,
        name,
        favo_pro_id,
        history_pro_id
    } = _params;

    // 添加收藏
    if(!!favo_pro_id) {
        UserFavoriteProduct.sync({alter: true});
        UserFavoriteProduct.create({
            openid,
            pro_id:favo_pro_id
        });
        delete _params.favo_pro_id;
    }

    // 添加历史
    if(!!history_pro_id) {
        const history_list = await UserHistoryProduct.findAll({
            where:{
                openid:openid,
                pro_id:history_pro_id
            }
        });

        if(!!history_list && history_list.length>0){
            const { count } = history_list[0];
            await UserHistoryProduct.update({
                count:count + 1
            },{
                where:{
                    openid:openid,
                    pro_id:history_pro_id
                }
            })
        }else{
            UserHistoryProduct.sync({alter: true});
            UserHistoryProduct.create({
                openid,
                pro_id:history_pro_id,
                count:1
            });
            console.log({
                openid,
                pro_id:history_pro_id,
                count:1
            });
        }
        delete _params.history_pro_id;
    }

    // 创建用户基础信息
    if(!!name){
        await UserInfos.sync({alter: true});
        await UserInfos.create({
            ..._params,
        });
    }

    ctx.body = {'message':'create userInfo success'};
}