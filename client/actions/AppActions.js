var Reflux = require('reflux');
var request = require('superagent');

var AppActions = Reflux.createActions({
  loadSuperchargers: { asyncResult: true },
  getCurrentPosition: { asyncResult: true }
});

AppActions.loadSuperchargers.preEmit = function() {
  console.log('fired sc fetch action')
};

module.exports = AppActions;