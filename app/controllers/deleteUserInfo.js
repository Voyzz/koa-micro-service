const {
    UserInfos,
    UserFavoriteProduct,
    UserHistoryProduct
} = require('../dbModel');

/* @Params:
openid (required)
delete_basic
favo_pro_id
delete_history
*/
module.exports = async (ctx) => {
    const {openid,delete_basic,favo_pro_id,delete_history} = Object.assign(ctx.request.body,ctx.request.query);

    if(!!delete_basic){
        await UserInfos.destroy({
            where:{
                openid
            }
        })
    }

    if(!!favo_pro_id){
        await UserFavoriteProduct.destroy({
            where:{
                openid,
                pro_id:favo_pro_id
            }
        })
    }

    if(!!delete_history){
        await UserHistoryProduct.destroy({
            where:{
                openid
            }
        })
    }

    ctx.body = {'message':'delete userInfo success'};
}