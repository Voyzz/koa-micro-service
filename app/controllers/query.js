const mysql = require("mysql");
const sql_config = require('../sql_config.js')
let sql_data

module.exports = async (ctx) => {
    // const { id } = ctx.params;

    // const pool = mysql.createPool(sql_config);

    // await pool.query(`SELECT * FROM \`books\` WHERE \`id\` = \'${id}\'`,(err,res,fields)=>{
    //     sql_data = res;
    // });
    // await pool.query(`SELECT * FROM \`user\` WHERE \`User\` = \'root\'`,(err,res,fields)=>{
    //     sql_data = res;
    // });

    ctx.body = {message:{
        'test':'hhhhhhhh'
    }};
}