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
        pool: { max: 5,min: 0,idle: 30000 }
    }
);

const User = sequelize.define('User', {
    id: { type: DataTypes.STRING,primaryKey: true },
    name: { type: DataTypes.STRING },
    gender: { type: DataTypes.BOOLEAN },
    birth: { type: DataTypes.STRING }
}, {
    timestamps: false
});

module.exports = { User };