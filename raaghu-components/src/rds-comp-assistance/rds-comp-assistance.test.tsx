import React from 'react';
import ReactDOM from 'react-dom';
import rds-comp-assistance from './rds-comp-assistance';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-comp-assistance />, div);
  ReactDOM.unmountComponentAtNode(div);
});