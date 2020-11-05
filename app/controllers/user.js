const urlParamsParse = require('../utils/urlParamsParse.js');
const { User } = require('../dbModel');

module.exports = async (ctx) => {
    const { pType,name,gender,birth } = urlParamsParse(ctx.request.url);

    switch (pType) {
        case 'read':
        // ************ Read ************
            const readOpt = {};
            if(!!name) readOpt.name = name;
            if(!!gender) readOpt.gender = gender;
            if(!!birth) readOpt.birth = birth;

            const users = await User.findAll({
                where:readOpt
            });
            ctx.body = {message:users};
            break;

        default:
        // ************ Create ************
            const now = Date.now();
            await User.sync({alter: true});
            await User.create({
                id: 'd-' + now,
                name: name,
                gender: gender,
                birth: birth,
            });
            break;
    }
}