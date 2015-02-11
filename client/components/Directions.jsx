var React = require('react');
var Reflux = require('reflux');
var MapStore = require('../stores/MapStore');
var MapActions = require('../actions/MapActions');

var Directions = React.createClass({

  mixins: [Reflux.connect(MapStore)],

  componentDidUpdate() {
    if (this.state.currentPosition) {
      this.initializePlacesAutocomplete();
    }
  },

  initializePlacesAutocomplete() {
    var latitude = this.state.currentPosition.latitude;
    var longitude = this.state.currentPosition.longitude;
    var accuracy = this.state.currentPosition.accuracy;

    var start = new google.maps.places.Autocomplete(this.refs.start.getDOMNode());
    var end = new google.maps.places.Autocomplete(this.refs.end.getDOMNode());

    var geolocation = new google.maps.LatLng(latitude, longitude);
    var circle = new google.maps.Circle({
      center: geolocation,
      radius: accuracy
    });

    start.setBounds(circle.getBounds());
    end.setBounds(circle.getBounds());
  },

  handleSubmit() {
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