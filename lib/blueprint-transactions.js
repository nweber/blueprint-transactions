// Generated by CoffeeScript 1.10.0
var blueprintAstToRuntime, getTransactionName, getTransactionPath;

blueprintAstToRuntime = require('./blueprint-ast-to-runtime');

getTransactionName = require('./get-transaction-name');

getTransactionPath = require('./get-transaction-path');

module.exports = {
  compile: function(ast, filename) {
    var addNames, addPaths;
    addNames = (function(_this) {
      return function() {
        var i, len, ref, results, transaction;
        ref = _this.result['transactions'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          transaction = ref[i];
          results.push(transaction['name'] = getTransactionName(transaction));
        }
        return results;
      };
    })(this);
    addPaths = (function(_this) {
      return function() {
        var i, len, ref, results, transaction;
        ref = _this.result['transactions'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          transaction = ref[i];
          results.push(transaction['path'] = getTransactionPath(transaction));
        }
        return results;
      };
    })(this);
    this.result = blueprintAstToRuntime(ast, filename);
    addNames();
    addPaths();
    return this.result;
  }
};