var Reflux = require('reflux');

var MapActions = Reflux.createActions([
  'routeDirections',
  'getCurrentPosition',
  'getSuperchargers'
]);

MapActions.getSuperchargers.preEmit = function() {
  console.log('fired sc fetch action')
};

module.exports = MapActions;