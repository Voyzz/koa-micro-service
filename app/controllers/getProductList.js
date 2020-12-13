const {
    ProductBasicInfo,
    ProductImageInfo,
    ProductDetailInfo,
    ProductPriceInfo
} = require('../dbModel');

module.exports = async (ctx) => {
    const {
        pro_id,
        pro_number,
        title,
        substitle,
        is_top,
        is_show,
        extra_flag,
        tags_list,
        class_list
    } = Object.assign(ctx.request.body,ctx.request.query);

    let productBasicInfoList = await ProductBasicInfo.findAll({
        // 基础信息
        where:Object.assign(ctx.request.body,ctx.request.query)
    });

    await productBasicInfoList.forEach((pro,idx)=>{
        // 封面图
        let cover_img = ProductImageInfo.findAll({
            where:{
                pro_id:pro.pro_id,
                is_cover:true
            }
        });
        if(!!cover_img) productBasicInfoList.cover_img = cover_img;

        // 图片列表
        let pro_image_list = ProductImageInfo.findAll({
            where:{
                pro_id:pro.pro_id
            }
        });
        if(!!pro_image_list) productBasicInfoList.pro_image_list = pro_image_list;

        // 产品信息
        let pro_detail_list = ProductDetailInfo.findAll({
            where:{
                pro_id:pro.pro_id
            }
        });
        if(!!pro_detail_list) productBasicInfoList.pro_detail_list = pro_detail_list;

        // 价格列表
        let price_list = ProductPriceInfo.findAll({
            where:{
                pro_id:pro.pro_id
            }
        });
        if(!!price_list) productBasicInfoList.price_list = price_list;
    })


    ctx.body = productBasicInfoList;
}