var React = require('react');
var Reflux = require('reflux');
var MapStore = require('../stores/MapStore');
var MapActions = require('../actions/MapActions');

var Directions = React.createClass({

  mixins: [Reflux.connect(MapStore)],

  componentDidMount() {
    var start = new google.maps.places.Autocomplete(this.refs.start.getDOMNode());
    var end = new google.maps.places.Autocomplete(this.refs.end.getDOMNode());
    this.setState({ start: start, end: end });
  },


  // TODO: Display info box with how long is the trip, how many miles
  // TODO: If not enough, recommend "You can stop at the following SCs along the route"
  // TODO: Calculate elevation along the route: blue:normal, red:hill, green:down
  // TODO: Prefill current location for Start tagsinput.js style
  // TODO: EvTripPlanner steps generation and reverse engineer

  componentDidUpdate() {
    // TODO: should be props
    if (this.state.currentPosition) {
      this.geolocateAutocomplete();
    }

    if (this.state.route) {
      console.log('got route', this.state.route);
      var route = this.state.route;
      var distanceInMiles = route.legs[0].distance.value / 1609.344;
      if (distanceInMiles > 265) {
        console.log('wont make there');

        var scStops = [];
        for (var segment of route.overview_path) {
         for (var sc of this.state.superchargers) {
           var d = this.calculateDistance(sc, { latitude: segment.k, longitude: segment.D })
           if (d < 25) {
             if (scStops.indexOf(sc.location) < 0) {
               scStops.push(sc.location);
               console.log('Found SC within 50 mile radius');
               console.log('Distance from current position to this segment', d);
             }
           }
         }
        }
        console.log(scStops);
      }


    }
  },

  calculateDistance(start, end) {
    /**
     * Calculates the distance between two Latitude/Longitude points using the
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

  geolocateAutocomplete() {
    var latitude = this.state.currentPosition.latitude;
    var longitude = this.state.currentPosition.longitude;
    var accuracy = this.state.currentPosition.accuracy;

    var geolocation = new google.maps.LatLng(latitude, longitude);
    var circle = new google.maps.Circle({
      center: geolocation,
      radius: accuracy
    });

    this.state.start.setBounds(circle.getBounds());
    this.state.end.setBounds(circle.getBounds());
  },

  handleSubmit() {
    var start = this.refs.start.getDOMNode();
    var end = this.refs.end.getDOMNode();

    if (!start.value) { return start.focus(); }
    if (!end.value) { return end.focus(); }

    MapActions.routeDirections({
      start: this.refs.start.getDOMNode().value,
      end: this.refs.end.getDOMNode().value,
      map: this.props.map
    });
  },

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  },


//<ButtonGroup>
//  <Button>1</Button>
//  <Button>2</Button>
//  <DropdownButton title="Dropdown">
//    <MenuItem eventKey="1">Dropdown link</MenuItem>
//    <MenuItem eventKey="2">Dropdown link</MenuItem>
//  </DropdownButton>
//</ButtonGroup>

  render() {
    return (
      <div className='directions-overlay'>
        <div>
          <input type='text' ref='start' placeholder='Start' autoFocus onKeyDown={this.handleKeyDown} />
          <i className='ion-pinpoint' />
        </div>
        <hr/>
        <div>
          <input type='text' ref='end' placeholder='End' onKeyDown={this.handleKeyDown} />
          <i className='ion-log-in' />
        </div>
        <button className='route' onClick={this.handleSubmit}>
          <i className='ion-android-send'></i>
        </button>
        <div className='button-group'>
          <button className='model'>
            <i className='ion-model-s' />
            Model</button>
          <button className='configuration'>
            <i className='ion-gear-a' />
            Configuration</button>
          <button className='charge'>
            <i className='ion-battery-charging' />
            Charge</button>
          <button className='options'>
            <i className='ion-android-options' />
            Other</button>
        </div>
      </div>
    );
  }

});

module.exports = Directions;