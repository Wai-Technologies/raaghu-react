import React from 'react';
import ReactDOM from 'react-dom';
import rds-comp-premium-support from './rds-comp-premium-support';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-comp-premium-support />, div);
  ReactDOM.unmountComponentAtNode(div);
});