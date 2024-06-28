import React from 'react';
import ReactDOM from 'react-dom';
import rds-loader from './rds-loader';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-loader />, div);
  ReactDOM.unmountComponentAtNode(div);
});