const { func } = require("joi");

exports.runAsyncWrapper = function runAsyncWrapper(callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(next);
  };
};