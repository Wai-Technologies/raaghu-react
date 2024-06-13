import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompAddMember from './RdsCompAddMember';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompAddMember />, div);
  ReactDOM.unmountComponentAtNode(div);
});