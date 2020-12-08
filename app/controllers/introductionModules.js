const { IntroductionModules } = require('../dbModel');

module.exports = async (ctx) => {
    const { pType,moduleType,moduleData,onShow,position } = Object.assign(ctx.request.body,ctx.request.query);

    switch (pType) {
        case 'create':
        // ************ Create ************
            const now = Date.now();

            await IntroductionModules.sync({alter: true});

            await IntroductionModules.create({
                id: 'd-' + now,
                name: 'introduction',
                path: 'pages/introduction/introduction',
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

            await IntroductionModules.update(_updateData,{
                where:{
                    module_type: moduleType,
                }
            });

            ctx.body = {'message':'update module '+moduleType+' success'}

            break;

        case 'delete':
        // ************ Delete ************
            await IntroductionModules.destroy({
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


            let _IntroductionModules = await IntroductionModules.findAll({
                where:readOpt
            });

            if(_IntroductionModules.length > 0){
                _IntroductionModules.map((r,i)=>{
                    if(!!r.module_data){
                        r.module_data =  JSON.parse(r.module_data);
                    }
                });
            }

            ctx.body = _IntroductionModules;

            break;
    }
}