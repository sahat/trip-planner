var React = require('react');
var Reflux = require('reflux');
var MapStore = require('../stores/MapStore');
var MapActions = require('../actions/MapActions');

var Directions = React.createClass({

  mixins: [Reflux.connect(MapStore)],

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
          <i className='ion-model-s' />
        </div>
        <button className='route' onClick={this.handleSubmit}>
          <i className='ion-android-send'></i>
        </button>
        <button className='get-directions'>Type, Options, Current Charge</button>
      </div>
    );
  }

});

module.exports = Directions;