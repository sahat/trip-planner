var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var Directions = require('./Directions.jsx');

var Maps = React.createClass({

  mixins: [Reflux.connect(AppStore)],

  propTypes: {
    currentPosition: React.PropTypes.object,
    superchargers: React.PropTypes.array,
    zoom: React.PropTypes.number
  },

  getInitialState() {
    return {
      superchargers: [],
      currentPosition: { lat: 33.92142, lng: -118.32982 }
    }
  },

  componentDidMount() {
    AppActions.getCurrentPosition();
    AppActions.loadSuperchargers();

    var mapOptions = {
      center: this.state.currentPosition,
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
      this.state.map.setCenter(nextState.currentPosition);
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