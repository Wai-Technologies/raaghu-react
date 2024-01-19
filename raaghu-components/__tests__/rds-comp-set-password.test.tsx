import React from 'react';
import ReactDOM from 'react-dom';
import "@testing-library/jest-dom";
import RdsCompSetPassword from '../src/rds-comp-set-password';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompSetPassword />, div);
  ReactDOM.unmountComponentAtNode(div);
});