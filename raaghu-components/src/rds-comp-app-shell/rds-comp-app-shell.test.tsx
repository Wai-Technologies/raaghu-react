import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompAppShell from './RdsCompAppShell';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompAppShell />, div);
  ReactDOM.unmountComponentAtNode(div);
});