var React = require('react');
var styles = require('./example.css');

var Example = React.createClass({
    render (){
        return (
          <h1 className={ styles.example }>A VERY simple browserify + css-modules + react + gulp example</h1>
        );
    }
});

module.exports = Example;
