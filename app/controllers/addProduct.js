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
        pro_detail_list,
        price_list
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

    // 创建详情列表
    if(!!pro_detail_list) {
        const detail_list = JSON.parse(pro_detail_list).list;
        !!detail_list && detail_list.length>0 && detail_list.map((detail,idx) => {
            ProductDetailInfo.sync({alter: true});
            ProductDetailInfo.create({
                ...detail,
                pro_id: 'pro-' + now,
            });
        })
    }

    // 创建价格列表
    if(!!price_list) {
        const _price_list = JSON.parse(price_list).list;
        !!_price_list && _price_list.length>0 && _price_list.map((price,idx) => {
            ProductPriceInfo.sync({alter: true});
            ProductPriceInfo.create({
                ...price,
                pro_id: 'pro-' + now,
            });
        })
    }

    // 创建基础信息
    await ProductBasicInfo.sync({alter: true});
    await ProductBasicInfo.create({
        ..._params,
        pro_id:`pro-${now}`
    });

    ctx.body = {'message':'create product success'};
}