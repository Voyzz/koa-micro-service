module.exports = (url)=>{
    let paramsObj = {};

    !!url && url.split('?')[1].split('&').forEach((param)=>{
        paramsObj[param.split('=')[0]] = param.split('=')[1];
    })

    return paramsObj
}