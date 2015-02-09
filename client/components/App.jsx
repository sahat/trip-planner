var React = require('react');
var Reflux = require('reflux');
var Maps = require('./Maps.jsx');
var Directions = require('./Directions.jsx');

var App = React.createClass({

  render() {
    return (
      <div id='container'>
        <nav>
          <ul>
            <li><a href=''>Options</a></li>
            <li><a href=''>Feedback</a></li>
            <li><a href=''>Login</a></li>
          </ul>
        </nav>
        <Maps zoom={10} />
      </div>
    );
  }

});

module.exports = App;