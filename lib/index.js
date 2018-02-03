import React from 'react';
import ReactDOM from 'react-dom';

var H1 = 'App is running under webpack-dev-server';

ReactDOM.render(React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    H1
  )
), document.getElementById('app'));