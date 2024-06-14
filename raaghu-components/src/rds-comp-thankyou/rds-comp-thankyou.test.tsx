import React from 'react';
import ReactDOM from 'react-dom';
import rds-comp-thankyou from './rds-comp-thankyou';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-comp-thankyou />, div);
  ReactDOM.unmountComponentAtNode(div);
});