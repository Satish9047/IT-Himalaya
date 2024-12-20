cordova.define("http-plugin.HttpPlugin", function(require, exports, module) { var exec = require("cordova/exec");

exports.getHttpRequest = function (url, success, error) {
  exec(success, error, "HttpPlugin", "getHttpRequest", [url]);
};

});
