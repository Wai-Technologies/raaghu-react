import React from 'react';
import ReactDOM from 'react-dom';
import rds-comp-invoice-detail-receipt from './rds-comp-invoice-detail-receipt';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-comp-invoice-detail-receipt />, div);
  ReactDOM.unmountComponentAtNode(div);
});