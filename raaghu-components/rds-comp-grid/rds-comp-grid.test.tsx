import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompGrid, { RdsCompGridColumn } from './rds-comp-grid';

jest.mock('./rds-comp-grid.scss', () => ({}));
jest.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }: any) => <>{children}</>,
  Droppable: ({ children }: any) => children({ innerRef: jest.fn(), droppableProps: {}, placeholder: null }, {}),
  Draggable: ({ children }: any) => children({ innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} }, {}),
}));
jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({ attributes: {}, listeners: {}, setNodeRef: jest.fn(), transform: null, transition: null, isDragging: false }),
}));
jest.mock('@dnd-kit/utilities', () => ({ CSS: { Transform: { toString: jest.fn() } } }));
jest.mock('@mui/x-date-pickers/DatePicker', () => ({ DatePicker: ({ slotProps }: any) => <input data-testid="date-picker" /> }));
jest.mock('@mui/x-date-pickers/LocalizationProvider', () => ({ LocalizationProvider: ({ children }: any) => <>{children}</> }));
jest.mock('@mui/x-date-pickers/AdapterDateFns', () => ({ AdapterDateFns: class {} }));
jest.mock('../../raaghu-elements/rds-button/rds-button', () => ({
  __esModule: true,
  default: ({ text, onClick, children, 'aria-label': ariaLabel }: any) => (
    <button onClick={onClick} aria-label={ariaLabel || text || undefined}>{text ?? children}</button>
  ),
}));

const sampleColumns: RdsCompGridColumn[] = [
  { key: 'name', name: 'Name' },
  { key: 'age', name: 'Age' },
  { key: 'role', name: 'Role' },
];

const sampleData = [
  { id: '1', name: 'Alice', age: 30, role: 'Admin' },
  { id: '2', name: 'Bob', age: 25, role: 'User' },
];

describe('RdsCompGrid', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(
        <RdsCompGrid tableHeaders={sampleColumns} tableData={sampleData} />
      );
      expect(container).toBeInTheDocument();
    });

    it('renders column headers', () => {
      render(<RdsCompGrid tableHeaders={sampleColumns} tableData={sampleData} />);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
    });

    it('renders row data', () => {
      render(<RdsCompGrid tableHeaders={sampleColumns} tableData={sampleData} />);
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('renders with empty data', () => {
      const { container } = render(
        <RdsCompGrid tableHeaders={sampleColumns} tableData={[]} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Feature Flags', () => {
    it('renders with sort enabled', () => {
      const { container } = render(
        <RdsCompGrid tableHeaders={sampleColumns} tableData={sampleData} isSort />
      );
      expect(container).toBeInTheDocument();
    });

    it('renders with filter enabled', () => {
      const { container } = render(
        <RdsCompGrid tableHeaders={sampleColumns} tableData={sampleData} isFilter />
      );
      expect(container).toBeInTheDocument();
    });

    it('renders with checkbox selection enabled', () => {
      const { container } = render(
        <RdsCompGrid
          tableHeaders={sampleColumns}
          tableData={sampleData}
          enableCheckboxSelection
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('renders with inline editing enabled', () => {
      const { container } = render(
        <RdsCompGrid
          tableHeaders={sampleColumns}
          tableData={sampleData}
          enableInlineEdit
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(
        <RdsCompGrid tableHeaders={sampleColumns} tableData={sampleData} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
