import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsCompTreeView, { RdsTreeNode } from './rds-comp-tree-view';

const nodes: RdsTreeNode[] = [
  { id: 'root', label: 'Root', children: [{ id: 'child-1', label: 'Child 1' }, { id: 'child-2', label: 'Child 2' }] },
];

describe('RdsCompTreeView', () => {
  it('renders root container', () => {
    render(<RdsCompTreeView nodes={nodes} />);
    const root = screen.getByTestId('rds-comp-tree-view-root');
    expect(root).toBeInTheDocument();
  });

  it('applies size class', () => {
    const { rerender } = render(<RdsCompTreeView nodes={nodes} size="small" />);
    let root = screen.getByTestId('rds-comp-tree-view-root');
    expect(root.className).toMatch(/rds-comp-tree-view--small/);
    rerender(<RdsCompTreeView nodes={nodes} size="large" />);
    root = screen.getByTestId('rds-comp-tree-view-root');
    expect(root.className).toMatch(/rds-comp-tree-view--large/);
  });

  it('accepts controlled expanded prop without error', () => {
    render(<RdsCompTreeView nodes={nodes} expanded={['root']} />);
    const root = screen.getByTestId('rds-comp-tree-view-root');
    expect(root).toBeInTheDocument();
  });
});
