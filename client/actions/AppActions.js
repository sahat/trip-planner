var Reflux = require('reflux');
var request = require('superagent');

var AppActions = Reflux.createActions([
  'asdf'
]);

AppActions.loadSuperchargers = Reflux.createAction({
  children: ['progressed', 'completed', 'failed']
});

AppActions.loadSuperchargers.preEmit = function() {
  console.log('fired sc fetch action')
};

module.exports = AppActions;