import React from 'react';
import ReactDOM, { render } from 'react-dom';
import RdsMap from '../src/rds-map/rds-map';

it('It should mount', () => {
  const div = document.createElement('div');
  render(<RdsMap mapList={undefined} color={undefined} />, div);
  ReactDOM.unmountComponentAtNode(div);
});