var request = require('superagent');
var Reflux = require('reflux');
var MapActions = require('../actions/MapActions');

var AppStore = Reflux.createStore({

  listenables: MapActions,

  getSuperchargers() {
    request.get('http://localhost:5000/superchargers', function(res) {
      var superchargers = JSON.parse(res.text);
      this.trigger({ superchargers: superchargers });
    }.bind(this));
  },

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
      this.trigger({ currentPosition: position.coords });
    }.bind(this));
  },

  routeDirections(params) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(params.map);

    var request = {
      origin: params.start,
      destination: params.end,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        console.log(result);
        directionsDisplay.setDirections(result);
      }
    }.bind(this));
  }

});

module.exports = AppStore;