import React from 'react';
import ReactDOM from 'react-dom/client';
import RdsMap from '../src/rds-map/rds-map';

it('It should mount', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  root.render(<RdsMap mapList={[]} color={undefined} />);
  root.unmount();
});