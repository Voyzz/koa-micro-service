const { HomeModules } = require('../dbModel');

module.exports = async (ctx) => {
    const { pType,moduleType,moduleData,onShow,position } = Object.assign(ctx.request.body,ctx.request.query);

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

            ctx.body = {'message':'create module '+moduleType+' success'}

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

            ctx.body = {'message':'update module '+moduleType+' success'}

            break;

        case 'delete':
        // ************ Delete ************
            await HomeModules.destroy({
                where:{
                    module_type: moduleType,
                }
            })

            ctx.body = {'message':'delete module '+moduleType+' success'}
            break;

        default:
        // ************ Read ************
            const readOpt = {};
            if(!!moduleData) readOpt.module_data = moduleData;
            if(!!onShow) readOpt.on_show = onShow;
            if(!!position) readOpt.position = position;

            let homeModules = await HomeModules.findAll({
                where:readOpt
            });

            if(homeModules.length > 0){
                homeModules.map((r,i)=>{
                    if(!!r.module_data){
                        r.module_data =  JSON.parse(r.module_data);
                    }
                });
            }

            ctx.body = homeModules;

            break;
    }
}