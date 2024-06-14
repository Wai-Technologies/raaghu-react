import React from 'react';
import ReactDOM from 'react-dom';
import rds-select-plan from './rds-select-plan';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-select-plan />, div);
  ReactDOM.unmountComponentAtNode(div);
});