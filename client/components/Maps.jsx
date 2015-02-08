var React = require('react');

var Maps = React.createClass({

  propTypes: {
    currentPosition: React.PropTypes.object,
    superchargers: React.PropTypes.array,
    zoom: React.PropTypes.number
  },

  componentDidMount() {
    var mapOptions = {
      center: this.props.currentPosition,
      zoom: this.props.zoom,
      disableDefaultUI: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DEFAULT,
        mapTypeIds: [
          google.maps.MapTypeId.ROADMAP,
          google.maps.MapTypeId.TERRAIN
        ]
      },
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      scaleControl: true
    };

    var map = new google.maps.Map(this.getDOMNode(), mapOptions);

    this.setSuperchargerMarkers(map);

    this.setState({ map: map });
  },

  setSuperchargerMarkers(map) {
    for (var sc of this.props.superchargers) {
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
    return <div className='map'></div>;
  }

});

module.exports = Maps;