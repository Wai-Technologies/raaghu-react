import React from 'react';
import ReactDOM from 'react-dom';
import rds-comp-copy-text from './rds-comp-copy-text';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-comp-copy-text />, div);
  ReactDOM.unmountComponentAtNode(div);
});