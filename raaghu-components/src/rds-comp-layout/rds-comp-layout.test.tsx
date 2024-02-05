import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompLayout from './RdsCompLayout';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompLayout />, div);
  ReactDOM.unmountComponentAtNode(div);
});