const {
    ProductBasicInfo,
    ProductImageInfo,
    ProductDetailInfo,
    ProductPriceInfo
} = require('../dbModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/***  @_params:
is_basic,
pro_id,
pro_number,
is_top,
is_show,
extra_flag,
class_reg,
tags_reg,
***/

module.exports = async (ctx) => {
    const request_params = Object.assign(ctx.request.body,ctx.request.query);
    const {is_basic,class_reg,tags_reg} = request_params;

    // 根据类别筛选
    if(!!class_reg){
        request_params.class_list = {
            [Op.regexp]:class_reg
        }
        delete request_params.class_reg;
    }
    // 根据标签筛选
    if(!!tags_reg){
        request_params.tags_list = {
            [Op.regexp]:tags_reg
        }
        delete request_params.tags_reg;
    }

    if(!!is_basic) delete request_params.is_basic

    let productBasicInfoList = await ProductBasicInfo.findAll({
        // 基础信息
        where:request_params,
        order:[
            ['pro_id','DESC']
        ]
    });

    let response_data = [...productBasicInfoList];

    for (let idx = 0; idx < productBasicInfoList.length; idx++) {
        let pro = response_data[idx].dataValues;

        // 基础信息数据处理
        if(!!pro.tags_list) pro.tags_list = JSON.parse(pro.tags_list).list;
        if(!!pro.class_list) pro.class_list = JSON.parse(pro.class_list).list;

        // 封面图
        let cover_img = await ProductImageInfo.findAll({
            where:{
                pro_id:pro.pro_id,
                is_cover:true
            }
        });
        if(!!cover_img[0]) pro.cover_img = cover_img[0];

        if(!is_basic){
            // 图片列表
            const pro_image_list = await ProductImageInfo.findAll({
                where:{
                    pro_id:pro.pro_id
                }
            });
            if(!!pro_image_list) pro.pro_image_list = pro_image_list;

            // 产品信息
            let pro_detail_list = await ProductDetailInfo.findAll({
                where:{
                    pro_id:pro.pro_id
                }
            });
            pro_detail_list.map((detail,_idx) => {
                if(!!detail.detail_obj && detail.detail_obj.length>0){
                    detail.detail_obj = JSON.parse(detail.detail_obj).list;
                }
                if(!!detail.detail_arr && detail.detail_arr.length>0){
                    detail.detail_arr = JSON.parse(detail.detail_arr).list;
                }
            })
            if(!!pro_detail_list) pro.pro_detail_list = pro_detail_list;

            // 价格列表
            let price_list = await ProductPriceInfo.findAll({
                where:{
                    pro_id:pro.pro_id
                }
            });
            if(!!price_list) pro.price_list = price_list;
        }
    }


    ctx.body = response_data;
}