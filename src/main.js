import BlackTriangle from './components/BlackTriangle';
import ReactDOM from 'react-dom';
import React from 'react';
import ReactTest from './components/ReactTest';

const triangle = new BlackTriangle('#triangle');

window.setInterval(
  () => {
    triangle.rotate(1);
    triangle.render();
  },
  20
);

ReactDOM.render(
  <ReactTest />,
  document.getElementById('reacttest')
);
