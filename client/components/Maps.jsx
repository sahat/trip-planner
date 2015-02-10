var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var Directions = require('./Directions.jsx');

var Maps = React.createClass({

  mixins: [Reflux.connect(AppStore)],

  propTypes: {
    zoom: React.PropTypes.number
  },

  getInitialState() {
    return {
      superchargers: [],
      currentPosition: { latitude: 33.92142, longitude: -118.32982 }
    }
  },

  componentDidMount() {
    AppActions.getCurrentPosition();
    AppActions.loadSuperchargers();

    var mapOptions = {
      center: { lat: this.state.currentPosition.latitude, lng: this.state.currentPosition.longitude },
      zoom: this.props.zoom,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      scaleControl: true
    };

    var map = new google.maps.Map(this.refs.map.getDOMNode(), mapOptions);

    this.setState({ map: map });
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentPosition !== this.state.currentPosition) {
      console.log(nextState.currentPosition)
      this.state.map.setCenter({
        lat: nextState.currentPosition.latitude,
        lng: nextState.currentPosition.longitude
      });

      console.log(nextState.currentPosition);


      for (var sc of this.state.superchargers) {
        var d = this.calculateDistance(nextState.currentPosition, sc);
        console.log("Distance is ", d, sc.location);
      }
    }

    if (this.state.superchargers.length > 0) {
      this.setSuperchargerMarkers(this.state.map);
    }

  },

  setSuperchargerMarkers(map) {
    for (var sc of this.state.superchargers) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(sc.latitude, sc.longitude),
        icon: {
          url: '../img/icon-supercharger@2x.png',
          scaledSize: new google.maps.Size(23, 33)
        },
        map: map,
        title: sc.location,
        animation: google.maps.Animation.DROP
      });
    }
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