var request = require('superagent');
var Reflux = require('reflux');
var AppActions = require('../actions/AppActions');

var AppStore = Reflux.createStore({

  listenables: AppActions,

  loadSuperchargers() {
    request.get('http://localhost:5000/superchargers', function(res) {
      var superchargers = JSON.parse(res.text);
      this.trigger({ superchargers: superchargers });
    }.bind(this));
  },

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.trigger({ currentPosition: pos });
    }.bind(this));
  }
});

module.exports = AppStore;