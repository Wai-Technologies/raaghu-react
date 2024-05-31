import React from 'react';
import ReactDOM from 'react-dom';
import rds-comp-order-confirmation from './rds-comp-order-confirmation';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-comp-order-confirmation />, div);
  ReactDOM.unmountComponentAtNode(div);
});