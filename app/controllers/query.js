const urlParamsParse = require('../utils/urlParamsParse.js');
const { User } = require('../dbModel');

module.exports = async (ctx) => {
    const { name,gender,birth } = urlParamsParse(ctx.request.url);
    const now = Date.now();

    await User.sync({alter: true})

    var me = await User.create({
        id: 'd-' + now,
        name: name,
        gender: gender,
        birth: birth,
    });

    // await me.save();
    // const users = await User.findAll();

    // console.log('created: ' + JSON.stringify(me));


    // const pool = mysql.createPool(sql_config);

    // await pool.query(`SELECT * FROM \`user\` WHERE \`User\` = \'${id}\'`,(err,res,fields)=>{
    //     sql_data = res;
    // });

    // ctx.body = {message:users};
}