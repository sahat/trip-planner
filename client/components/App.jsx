var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var Maps = require('./Maps.jsx');

var App = React.createClass({

  mixins: [Reflux.connect(AppStore, 'superchargers')],

  componentDidMount() {
    AppActions.loadSuperchargers();
  },

  componentDidUpdate() {
  },

  render() {
    if (this.state.superchargers.length === 0) {
      return null;
    }
    return (
      <div id='container'>
        <h1>sss exampless...qweqsadsweqw.</h1>
        But s  sssaid go awaywsdadsqw
        <Maps
          superchargers={this.state.superchargers}
          latitude={37.4190421}
          longitude={-122.0254977}
          zoom={10} />
      </div>
    );
  }
});

module.exports = App;