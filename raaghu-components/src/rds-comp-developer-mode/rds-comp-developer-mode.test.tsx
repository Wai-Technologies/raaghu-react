import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompDeveloperMode from './rds-comp-developer-mode';


it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompDeveloperMode grantType={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});