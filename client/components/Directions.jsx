var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var Directions = React.createClass({

  mixins: [Reflux.connect(AppStore)],

  onGetDirections() {
    AppActions.getDirections({
      start: this.refs.start.getDOMNode().value,
      end: this.refs.end.getDOMNode().value,
      map: this.props.map
    });
  },

  render() {
    return (
      <div className='directions-overlay'>
        <div className='directions'>
          <div className='start'>
            <input type='text' ref='start' className='start' placeholder='Start' />
            <i className='ion-pinpoint'></i>
          </div>
          <hr/>
          <div className='start'>
            <input type='text' ref='end' placeholder='End' />
            <i className='ion-model-s'></i>
          </div>
        </div>
        <button className='swap' onClick={this.onGetDirections}>
          <i className='ion-android-send'></i>
        </button>
        <button className='get-directions'>Type, Options, Current Charge</button>
      </div>
    );
  }

});

module.exports = Directions;