var request = require('superagent');
var Reflux = require('reflux');
var AppActions = require('../actions/AppActions');

var AppStore = Reflux.createStore({

  listenables: [AppActions],

  //init: function() {
  //  console.log('store init');
  //  this.listenTo(AppActions.loadSuperchargers, this.loadSuperchargers);
  //},

  getInitialState: function() {
    this.superchargers = [];
    return this.superchargers;
  },

  loadSuperchargers: function() {
    request.get('http://localhost:5000/superchargers', function(res) {
      this.superchargers = JSON.parse(res.text);
      this.trigger(this.superchargers);
    }.bind(this));
  }
});

module.exports = AppStore;