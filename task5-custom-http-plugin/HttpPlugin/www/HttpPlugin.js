var exec = require("cordova/exec");

exports.getHttpRequest = function (url, success, error) {
  exec(success, error, "HttpPlugin", "getHttpRequest", url);
};
