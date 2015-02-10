var React = require('react');
var Reflux = require('reflux');
var Map = require('./Map.jsx');

var App = React.createClass({

  render() {
    return (
      <div id='container'>
        <nav>
          <ul>
            <li><a href=''>Feedback</a></li>
            <li><a href=''>Options</a></li>
            <li><a href=''>Login</a></li>
            <li><a href=''>Register</a></li>
          </ul>
        </nav>
        <Map />
      </div>
    );
  }

});

module.exports = App;