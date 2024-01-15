import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompDatabaseConnection from '../src/rds-comp-database-connection';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompDatabaseConnection connectionStrings={undefined} />, div);
  ReactDOM.unmountComponentAtNode(div);
});