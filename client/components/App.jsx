var React = require('react');
var Reflux = require('reflux');
var Maps = require('./Maps.jsx');

var App = React.createClass({

  render() {
    return (
      <div id='container'>
        <h1>Tesla Trip Planner</h1>
        Text placeholder
        <Maps zoom={10} />
      </div>
    );
  }

});

module.exports = App;