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
        pro_id,
        pro_image_list,
        pro_detail_list,
        price_list
    } = _params;

    // 更新图片列表
    if(!!pro_image_list && !!pro_id){
        await ProductImageInfo.destroy({
            where:{
                pro_id: pro_id,
            }
        })

        const image_list = JSON.parse(pro_image_list).list;
        !!image_list && image_list.length>0 && await image_list.map((img,idx) => {
            ProductImageInfo.create({
                ...img,
                pro_id: pro_id,
                img_id: 'img-' + now + '-' + idx,
                is_cover:idx === 0 ? true : false
            });
        })
        delete _params.pro_image_list;
    }


    // 更新详情列表
    if(!!pro_detail_list && !!pro_id) {
        await ProductDetailInfo.destroy({
            where:{
                pro_id: pro_id,
            }
        })

        const detail_list = JSON.parse(pro_detail_list).list;
        !!detail_list && detail_list.length>0 && await detail_list.map((detail,idx) => {
            ProductDetailInfo.create({
                ...detail,
                pro_id: pro_id,
            });
        })
        delete _params.pro_detail_list;
    }

    // 更新价格列表
    if(!!price_list && !!pro_id) {
        await ProductPriceInfo.destroy({
            where:{
                pro_id: pro_id,
            }
        })

        const _price_list = JSON.parse(price_list).list;
        !!_price_list && _price_list.length>0 && await _price_list.map((price,idx) => {
            ProductPriceInfo.create({
                ...price,
                pro_id: pro_id,
            });
        })
        delete _params.price_list;
    }

    delete _params.pro_id
    // 更新基础信息
    await ProductBasicInfo.update(_params,{
        where:{
            pro_id: pro_id,
        }
    })

    ctx.body = {'message':'update product success'};
}