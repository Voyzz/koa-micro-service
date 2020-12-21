const {
    UserInfos,
    UserFavoriteProduct,
    UserHistoryProduct
} = require('../dbModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/***  @_params:
openid @required

***/

module.exports = async (ctx) => {
    let response_data = {};
    const request_params = Object.assign(ctx.request.body,ctx.request.query);
    const {openid} = request_params;

    // 基本信息
    if(!!openid){
        const user_info = await UserInfos.findAll({
            where:{
                openid:openid
            }
        });
        if(!!user_info && user_info.length>0){
            response_data = {...user_info[0].dataValues}
        }

        // 收藏列表
        const favo_list = await UserFavoriteProduct.findAll({
            where:{
                openid:openid
            }
        });
        response_data.favo_list = favo_list;

        // 历史列表
        const history_list = await UserHistoryProduct.findAll({
            where:{
                openid:openid
            }
        });
        response_data.history_list = history_list;
    }

    ctx.body = response_data;
}