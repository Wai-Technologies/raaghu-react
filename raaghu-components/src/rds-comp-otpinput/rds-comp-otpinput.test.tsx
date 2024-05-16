import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompOtpinput from './RdsCompOtpinput';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompOtpinput />, div);
  ReactDOM.unmountComponentAtNode(div);
});