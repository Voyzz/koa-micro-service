const mysql = require("mysql");
const sql_config = require('../sql_config.js');
const { Sequelize } = require('sequelize');
const urlParamsParse = require('../utils/urlParamsParse.js');

let sql_data;

module.exports = async (ctx) => {
    // const sequelize = new Sequelize(sql_config.database, sql_config.user, sql_config.password, {
    //     host: sql_config.host,
    //     dialect: 'mysql',
    //     pool: {
    //         max: 5,
    //         min: 0,
    //         idle: 30000
    //     }
    // });

    const { id } = urlParamsParse(ctx.request.url);

    const pool = mysql.createPool(sql_config);

    await pool.query(`SELECT * FROM \`user\` WHERE \`User\` = \'${id}\'`,(err,res,fields)=>{
        sql_data = res;
    });

    ctx.body = {message:sql_data};
}