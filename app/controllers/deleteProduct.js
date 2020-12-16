const {
    ProductBasicInfo,
    ProductImageInfo,
    ProductDetailInfo,
    ProductPriceInfo
} = require('../dbModel');

module.exports = async (ctx) => {
    const {pro_id} = Object.assign(ctx.request.body,ctx.request.query);

    await ProductBasicInfo.destroy({
        where:{
            pro_id: pro_id,
        }
    })
    await ProductImageInfo.destroy({
        where:{
            pro_id: pro_id,
        }
    })
    await ProductDetailInfo.destroy({
        where:{
            pro_id: pro_id,
        }
    })
    await ProductPriceInfo.destroy({
        where:{
            pro_id: pro_id,
        }
    })

    ctx.body = {'message':'delete product success'};
}