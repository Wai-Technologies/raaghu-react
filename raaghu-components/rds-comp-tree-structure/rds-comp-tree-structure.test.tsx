import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompTreeStructure, { TreeLevel, IconType } from './rds-comp-tree-structure';

jest.mock('./rds-comp-tree-structure.scss', () => ({}));
jest.mock('../../raaghu-elements/rds-checkbox/rds-checkbox', () => ({
  __esModule: true,
  default: ({ checked, onChange }: any) => (
    <input type="checkbox" checked={checked} onChange={onChange} data-testid="rds-checkbox" />
  ),
}));
jest.mock('@mui/icons-material/ChevronRight', () => ({ __esModule: true, default: () => <span data-testid="chevron-right" /> }));
jest.mock('@mui/icons-material/Folder', () => ({ __esModule: true, default: () => <span data-testid="folder-icon" /> }));
jest.mock('@mui/icons-material/Add', () => ({ __esModule: true, default: () => <span data-testid="add-icon" /> }));
jest.mock('@mui/icons-material/Edit', () => ({ __esModule: true, default: () => <span data-testid="edit-icon" /> }));
jest.mock('@mui/icons-material/Delete', () => ({ __esModule: true, default: () => <span data-testid="delete-icon" /> }));
jest.mock('@mui/icons-material/OpenWith', () => ({ __esModule: true, default: () => <span data-testid="open-with-icon" /> }));

const sampleTreeData = [
  {
    id: 1,
    name: 'Root Folder',
    children: [
      { id: 2, name: 'Child File.ts' },
      { id: 3, name: 'Another File.tsx' },
    ],
  },
  { id: 4, name: 'Second Root' },
];

describe('RdsCompTreeStructure', () => {
  it('uses the language prop for file icons', () => {
    const getFileIcon = jest.fn(() => null);
    render(
      <RdsCompTreeStructure
        showFile
        language="TypeScript"
        getFileIcon={getFileIcon}
        treeData={[{ id: 1, name: 'index' }]}
      />,
    );
    expect(getFileIcon).toHaveBeenCalledWith('TypeScript');
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(
        <RdsCompTreeStructure treeData={sampleTreeData} />
      );
      expect(container).toBeInTheDocument();
    });

    it('renders the tree container', () => {
      const { container } = render(
        <RdsCompTreeStructure treeData={sampleTreeData} />
      );
      expect(container.querySelector('.rds-comp-tree-structure')).toBeInTheDocument();
    });

    it('renders with empty treeData', () => {
      const { container } = render(<RdsCompTreeStructure treeData={[]} />);
      expect(container.querySelector('.rds-comp-tree-structure')).toBeInTheDocument();
    });

    it('renders with showCollapsed true when treeData is omitted', () => {
      const { container } = render(<RdsCompTreeStructure showCollapsed />);
      expect(container.querySelector('.rds-comp-tree-structure')).toBeInTheDocument();
    });
  });

  describe('Expand/Collapse', () => {
    it('renders with showCollapsed true (all expanded)', () => {
      const { container } = render(
        <RdsCompTreeStructure treeData={sampleTreeData} showCollapsed />
      );
      expect(container.querySelector('.rds-comp-tree-structure')).toBeInTheDocument();
    });

    it('renders with showCollapsed false (all collapsed)', () => {
      const { container } = render(
        <RdsCompTreeStructure treeData={sampleTreeData} showCollapsed={false} />
      );
      expect(container.querySelector('.rds-comp-tree-structure')).toBeInTheDocument();
    });
  });

  describe('Level Prop', () => {
    it('renders with Level1', () => {
      const { container } = render(
        <RdsCompTreeStructure treeData={sampleTreeData} level={TreeLevel.Level1} />
      );
      expect(container.querySelector('.rds-comp-tree-structure')).toBeInTheDocument();
    });

    it('renders with Level2', () => {
      const { container } = render(
        <RdsCompTreeStructure treeData={sampleTreeData} level={TreeLevel.Level2} />
      );
      expect(container.querySelector('.rds-comp-tree-structure')).toBeInTheDocument();
    });
  });

  describe('Checked Nodes', () => {
    it('accepts checkedNodes prop', () => {
      const { container } = render(
        <RdsCompTreeStructure treeData={sampleTreeData} checkedNodes={[1, 2]} />
      );
      expect(container.querySelector('.rds-comp-tree-structure')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(
        <RdsCompTreeStructure treeData={sampleTreeData} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
