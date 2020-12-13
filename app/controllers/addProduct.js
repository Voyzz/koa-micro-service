const {
    ProductBasicInfo,
    ProductImageInfo,
    ProductDetailInfo,
    ProductPriceInfo
} = require('../dbModel');

module.exports = async (ctx) => {
    const now = Date.now();

    let _params = {...Object.assign(ctx.request.body,ctx.request.query)};

    const {
        pro_image_list,
        // pro_detail_list,
        // price_list
    } = _params;

    // 创建图片列表
    if(!!pro_image_list) {
        const image_list = JSON.parse(pro_image_list).list;
        !!image_list && image_list.length>0 && image_list.map((img,idx) => {
            ProductImageInfo.sync({alter: true});
            ProductImageInfo.create({
                ...img,
                pro_id: 'pro-' + now,
                img_id: 'img-' + now + '-' + idx,
                is_cover:idx === 0 ? true : false
            });
        })
        delete _params.pro_image_list;
    }

    // 创建基础信息
    await ProductBasicInfo.sync({alter: true});
    await ProductBasicInfo.create({
        ..._params,
        pro_id:`pro-${now}`
    });

    ctx.body = {'message':'create product success'};
}