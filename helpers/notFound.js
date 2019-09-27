module.exports = function(status){
    var status = typeof(status) == 'Number'?status: 404;
    return JSON.parse({
        status : status,
        message : 'Not Found',
        data : {}
    })
}