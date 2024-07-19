import React from 'react';
import ReactDOM from 'react-dom';
import rds-comp-contributor from './rds-comp-contributor';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-comp-contributor />, div);
  ReactDOM.unmountComponentAtNode(div);
});