const sql_config = require('../sql_config.js');
const { Sequelize,DataTypes } = require('sequelize');

// ********** 创建sequelize实例 **********
const sequelize = new Sequelize (
    sql_config.database,
    sql_config.user,
    sql_config.password,
    {
        host: sql_config.host,
        dialect: 'mysql',
        pool: { max: 10,min: 0,idle: 30000 },
    }
);

// 主页模块
const HomeModules = sequelize.define('HomeModules', {
    id: { type: DataTypes.STRING,primaryKey: true },
    name: { type: DataTypes.STRING },
    path: { type: DataTypes.STRING },
    on_show: { type: DataTypes.BOOLEAN,defaultValue:true },
    position: { type: DataTypes.INTEGER },
    module_type: { type: DataTypes.STRING,allowNull:false },
    module_data: { type: DataTypes.JSON },
}, {
    timestamps: false
});

// 介绍页模块
const IntroductionModules = sequelize.define('IntroductionModules',{
    id: { type: DataTypes.STRING,primaryKey: true },
    name: { type: DataTypes.STRING },
    path: { type: DataTypes.STRING },
    on_show: { type: DataTypes.BOOLEAN,defaultValue:true },
    position: { type: DataTypes.INTEGER },
    module_type: { type: DataTypes.STRING,allowNull:false },
    module_data: { type: DataTypes.JSON },
}, {
    timestamps: false
});

// 产品基础信息
const ProductBasicInfo = sequelize.define('ProductBasicInfo',{
    pro_id: { type: DataTypes.STRING,primaryKey: true },
    pro_number: { type: DataTypes.STRING,defaultValue:'' },
    title: { type: DataTypes.STRING,defaultValue:'' },
    substitle: { type: DataTypes.STRING,defaultValue:'' },
    is_favorite: { type: DataTypes.BOOLEAN,defaultValue:false },
    is_top: { type: DataTypes.BOOLEAN,defaultValue:false },
    is_show: { type: DataTypes.BOOLEAN,defaultValue:true },
    extra_flag: { type: DataTypes.BOOLEAN,defaultValue:false },
    tags_list: { type: DataTypes.STRING,defaultValue:'' },
    class_list: { type: DataTypes.STRING,defaultValue:'' }
}, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

// 产品图片
const ProductImageInfo = sequelize.define('ProductImageInfo',{
    img_id: { type: DataTypes.STRING },
    pro_id: { type: DataTypes.STRING },
    img_url: { type: DataTypes.STRING,defaultValue:'' },
    is_show: { type: DataTypes.BOOLEAN,defaultValue:true },
    is_cover: { type: DataTypes.BOOLEAN,defaultValue:false },
}, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

// 产品详情
const ProductDetailInfo = sequelize.define('ProductDetailInfo',{
    pro_id: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING,defaultValue:'info' },
    name: { type: DataTypes.STRING,defaultValue:'' },
    content: { type: DataTypes.STRING,defaultValue:'' },
    detail_obj: { type: DataTypes.STRING,defaultValue:'' },
    detail_arr: { type: DataTypes.STRING,defaultValue:'' },
}, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

// 产品价格
const ProductPriceInfo = sequelize.define('ProductPriceInfo',{
    pro_id: { type: DataTypes.STRING },
    date: { type: DataTypes.STRING,defaultValue:'' },
    price: { type: DataTypes.STRING,defaultValue:'' },
    unit: { type: DataTypes.STRING,defaultValue:'' },
    currency: { type: DataTypes.STRING,defaultValue:'' },
    is_recent: { type: DataTypes.BOOLEAN },
}, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

// 用户信息
const UserInfos = sequelize.define('UserInfos',{
    openid: { type: DataTypes.STRING,primaryKey: true },
    appid: { type: DataTypes.STRING,defaultValue:'' },
    name: { type: DataTypes.STRING,defaultValue:'' },
    gender: { type: DataTypes.STRING,defaultValue:'' },
    phone: { type: DataTypes.STRING,defaultValue:'' },
    location: { type: DataTypes.STRING,defaultValue:'' },
    compony: { type: DataTypes.STRING,defaultValue:'' },
}, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

// 用户收藏
const UserFavoriteProduct = sequelize.define('UserFavoriteProduct',{
    openid: { type: DataTypes.STRING },
    pro_id: { type: DataTypes.STRING,defaultValue:'' },
}, {
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

// 用户足迹
const UserHistoryProduct = sequelize.define('UserHistoryProduct',{
    openid: { type: DataTypes.STRING},
    pro_id: { type: DataTypes.STRING,defaultValue:'' },
    count: { type: DataTypes.INTEGER },
}, {
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

// 登录密码
const CheckLogin = sequelize.define('CheckLogin',{
    userName: { type: DataTypes.STRING},
    userKey: { type: DataTypes.STRING },
    userType: { type: DataTypes.STRING,defaultValue:'guest' },
}, {
    timestamps: false,
});

module.exports = {
    HomeModules,
    IntroductionModules,
    ProductBasicInfo,
    ProductImageInfo,
    ProductDetailInfo,
    ProductPriceInfo,
    UserInfos,
    UserFavoriteProduct,
    UserHistoryProduct,
    CheckLogin,
};