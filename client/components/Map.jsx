var React = require('react');
var Reflux = require('reflux');
var MapStore = require('../stores/MapStore');
var MapActions = require('../actions/MapActions');
var Directions = require('./Directions.jsx');

var Maps = React.createClass({

  mixins: [Reflux.listenTo(MapStore, 'onStoreChange')],

  onStoreChange(data) {
    if (data.superchargers) {
      this.setState({ superchargers: data.superchargers });
      this.setSuperchargerMarkers();
    }

    if (data.currentPosition) {
      this.setState({ currentPosition: data.currentPosition });
      this.centerCurrentPosition();
    }
  },

  getInitialState() {
    console.log('calling initial state');
    return {
      map: null
    }
  },

  componentDidMount() {
    MapActions.getCurrentPosition();
    MapActions.getSuperchargers();

    var mapOptions = {
      center: { lat: 39, lng: -101 },
      zoom: 4,
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true
    };

    var map = new google.maps.Map(this.refs.map.getDOMNode(), mapOptions);

    this.setState({ map: map });
  },

  setSuperchargerMarkers() {
    for (var sc of this.state.superchargers) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(sc.latitude, sc.longitude),
        icon: {
          url: '../img/icon-supercharger@2x.png',
          scaledSize: new google.maps.Size(23, 33)
        },
        map: this.state.map,
        title: sc.location,
        animation: google.maps.Animation.DROP
      });
    }
  },

  centerCurrentPosition() {
    var latitude = this.state.currentPosition.latitude;
    var longitude = this.state.currentPosition.longitude;
    var map = this.state.map;

    map.setCenter(new google.maps.LatLng(latitude, longitude));
    map.setZoom(10);
  },

  calculateDistance(start, end) {
    /**
     * Calculates the distance between Latitude/Longitude points using
     * Harvesine formula.
     *
     * a = sin²(Δφ/2)+cos(φ1)⋅cos(φ2)⋅sin²(Δλ/2)
     * c = 2⋅atan2(√a,√(1−a))
     * d = R⋅c
     */

    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    };

    var R = 6371;
    var dLat = (end.latitude - start.latitude).toRad();
    var dLon = (end.longitude - start.longitude).toRad();
    var lat1 = start.latitude.toRad();
    var lat2 = end.latitude.toRad();

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;

    //for (var sc of this.state.superchargers) {
//  var d = this.calculateDistance(nextState.currentPosition, sc);
//  console.log("Distance is ", d, sc.location);
//}

  },

  render() {
    return (
      <div className='map'>
        <Directions map={this.state.map} />
        <div className='map' ref='map'></div>
      </div>
    );
  }

});





module.exports = Maps;