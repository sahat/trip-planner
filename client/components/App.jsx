var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var Maps = require('./Maps.jsx');

var App = React.createClass({

  mixins: [Reflux.connect(AppStore)],

  getInitialState() {
    return {
      superchargers: [],
      currentPosition: { lat: 33.92142, lng: -118.32982 }
    }
  },

  componentDidMount() {
    AppActions.getCurrentPosition();
    AppActions.loadSuperchargers();
  },

  render() {
    if (this.state.superchargers.length === 0) {
      return null;
    }
    return (
      <div id='container'>
        <h1>Tesla Trip Planner</h1>
        Text placeholder
        <Maps
          superchargers={this.state.superchargers}
          currentPosition={this.state.currentPosition}
          zoom={10} />
      </div>
    );
  }
});

module.exports = App;