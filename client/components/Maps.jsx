var React = require('react');

var Maps = React.createClass({

  propTypes: {
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number,
    zoom: React.PropTypes.number
  },

  componentDidMount: function() {
    var mapOptions = {
      center: { lat: this.props.latitude, lng: this.props.longitude },
      zoom: 10,
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

  setSuperchargerMarkers: function(map, locations) {
    var myLatLng = new google.maps.LatLng(37.4158798,-122.0244115);
    console.log(myLatLng);

    var marker = new google.maps.Marker({
      position: myLatLng,
      icon: {
        url: '../img/icon-supercharger@2x.png',
        scaledSize: new google.maps.Size(23, 33)
      } ,
      map: map,
      title: 'Hello World',
      animation: google.maps.Animation.DROP
    });
  },

  componentDidUpdate: function() {
  },

  render: function() {
    return <div className='map'></div>;
  }

});

module.exports = Maps;