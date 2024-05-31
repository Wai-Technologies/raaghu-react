import React from 'react';
import ReactDOM from 'react-dom';
import rds-comp-purchase-developer-seats from './rds-comp-purchase-developer-seats';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-comp-purchase-developer-seats />, div);
  ReactDOM.unmountComponentAtNode(div);
});