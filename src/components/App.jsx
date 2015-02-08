var React = require('react');
var Maps = require('./Maps.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div id='container'>
        <h1>sss examples...qweqsadsweqw.</h1>
        But s  sssaid go awaywsdadsqw
        <Maps
          latitude={37.4190421}
          longitude={-122.0254977}
          zoom={16} />
      </div>
    );
  }
});

module.exports = App;