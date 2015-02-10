var request = require('superagent');
var Reflux = require('reflux');
var AppActions = require('../actions/AppActions');

var map;

var AppStore = Reflux.createStore({

  listenables: AppActions

});

module.exports = AppStore;