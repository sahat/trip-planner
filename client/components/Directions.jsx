var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var Directions = React.createClass({

  render() {
    return (


      <div className='directions-overlay'>
        <div className='directions'>
          <div className='start'>
            <input type='text' className='start' placeholder='Start' />
            <i className='ion-pinpoint'></i>
          </div>
          <hr/>
          <div className='start'>
            <input type='text' placeholder='End' />
            <i className='ion-model-s'></i>
          </div>
        </div>
        <button className='swap'>
          <i className='ion-android-send'></i>
        </button>
        <button className='get-directions'>Type, Options, Current Charge</button>
      </div>
    );
  }

});

module.exports = Directions;