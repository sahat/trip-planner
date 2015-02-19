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

    // TODO: Handle error status
    // TODO: Underscore's _.first
    directionsService.route(request, function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(result);
        directionsDisplay.setDirections(result);
        this.trigger({ route: result.routes[0] });

        var route = result.routes[0];

        var distanceInMiles = route.legs[0].distance.value / 1609.344;
        if (distanceInMiles > 265) {
          console.log('wont make there');

          for (var segment of route.overview_path) {
            console.log('Found SC within 50 mile radius');
          }

        }
      }
    }.bind(this));
  }

});

module.exports = AppStore;