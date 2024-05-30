import React from 'react';
import ReactDOM from 'react-dom';
import rds-comp-get-assistance from './rds-comp-get-assistance';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-comp-get-assistance />, div);
  ReactDOM.unmountComponentAtNode(div);
});