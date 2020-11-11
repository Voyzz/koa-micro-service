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
        pool: { max: 10,min: 0,idle: 30000 }
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



module.exports = { HomeModules };