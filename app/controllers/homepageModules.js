const urlParamsParse = require('../utils/urlParamsParse.js');
const { HomeModules } = require('../dbModel');

module.exports = async (ctx) => {
    const { pType,moduleType,moduleData,onShow,position } = urlParamsParse(ctx.request.url);
    let _responseObj = {
        
    }

    switch (pType) {
        case 'create':
        // ************ Create ************
            const now = Date.now();

            await HomeModules.sync({alter: true});

            await HomeModules.create({
                id: 'd-' + now,
                name: 'homepage',
                path: 'pages/homepage/homepage',
                position:position,
                on_show: onShow,
                module_type: moduleType,
                module_data: moduleData
            });

            break;

        case 'update':
        // ************ Update ************
            let _updateData = {}
            if(!!moduleData) _updateData.module_data = moduleData;
            if(!!onShow) _updateData.on_show = onShow;
            if(!!position) _updateData.position = position;

            await HomeModules.update(_updateData,{
                where:{
                    module_type: moduleType,
                }
            });

            break;

        case 'delete':
        // ************ Delete ************
            await HomeModules.destroy({
                where:{
                    module_type: moduleType,
                }
            })
            break;

        default:
        // ************ Read ************
            const readOpt = {};
            if(!!moduleData) readOpt.module_data = moduleData;
            if(!!onShow) readOpt.on_show = onShow;
            if(!!position) readOpt.position = position;

            const homeModules = await HomeModules.findAll({
                where:readOpt
            });
            ctx.body = homeModules;

            break;
    }
}