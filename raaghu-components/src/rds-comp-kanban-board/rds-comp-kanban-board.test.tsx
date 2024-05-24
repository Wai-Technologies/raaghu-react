import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompKanbanBoard from './rds-comp-kanban-board';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompKanbanBoard />, div);
  ReactDOM.unmountComponentAtNode(div);
});