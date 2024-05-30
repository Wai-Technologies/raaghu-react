import React from 'react';
import ReactDOM from 'react-dom';
import rds-comp-payment-card from './rds-comp-payment-card';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-comp-payment-card />, div);
  ReactDOM.unmountComponentAtNode(div);
});