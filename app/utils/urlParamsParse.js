module.exports = (url)=>{
    let paramsObj = {};
    if(!!url && url.split('?').length > 1){
        url.split('?')[1].split('&').forEach((param)=>{
            paramsObj[param.split('=')[0]] = param.split('=')[1];
        })
    }

    return paramsObj
}