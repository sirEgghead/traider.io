exports.handleErrors = function(msg, obj, callback) {
    var res = {
        message:msg,
        data:obj
    };
    console.log('status::::: ' + msg);
    callback(res);
}