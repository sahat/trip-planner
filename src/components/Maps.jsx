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
      zoom: this.props.zoom
    };

    var map = new google.maps.Map(this.getDOMNode(), mapOptions);

    this.setState({ map: map });
  },

  componentDidUpdate: function() {
    console.log('updated');
  },

  render: function() {
    return <div className='map'></div>;
  }

});

module.exports = Maps;