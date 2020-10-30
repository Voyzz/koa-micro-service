const mysql = require("mysql");
const sql_config = require('../sql_config.js')

module.exports = async (ctx) => {
    const { id } = ctx.params;
    let sql_data={'a':'b'};

    const connection = mysql.createConnection(sql_config);
    connection.connect();
    // `SELECT * FROM \`books\` WHERE \`id\` = \`${id}\``

    await connection.query("SELECT * FROM `books` WHERE `id` = '21'", function(err, rows, fields) {
        if (err) throw err;
        sql_data = rows;
        console.log('aaaaaa')
    });

    console.log('bbbbb')

    ctx.body = {message:sql_data};

    connection.end();
}