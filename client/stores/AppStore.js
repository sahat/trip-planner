var request = require('superagent');
var Reflux = require('reflux');
var AppActions = require('../actions/AppActions');

var map;

var AppStore = Reflux.createStore({

  listenables: AppActions,

  getMapInstance() {
    console.log(' getting map' , map);
    return map;
  },

  saveMapInstance(newMap) {
    console.log('saving map');
    map = newMap;
  },

  loadSuperchargers() {
    request.get('http://localhost:5000/superchargers', function(res) {
      var superchargers = JSON.parse(res.text);
      this.trigger({ superchargers: superchargers });
    }.bind(this));
  },

  getDirections(data) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(data.map);

    var request = {
      origin: data.start,
      destination: data.end,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
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