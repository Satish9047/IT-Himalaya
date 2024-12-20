cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-sqlite-storage.SQLitePlugin",
      "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
      "pluginId": "cordova-sqlite-storage",
      "clobbers": [
        "SQLitePlugin"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "http-plugin.HttpPlugin",
      "file": "plugins/http-plugin/www/HttpPlugin.js",
      "pluginId": "http-plugin",
      "clobbers": [
        "cordova.plugins.HttpPlugin"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-sqlite-storage": "6.1.0",
    "cordova-plugin-device": "3.0.0",
    "http-plugin": "1.0.0"
  };
});