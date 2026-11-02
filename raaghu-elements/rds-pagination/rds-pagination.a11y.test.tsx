import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsPagination from './rds-pagination';

jest.mock('./rds-pagination.scss', () => ({}));

describe('RdsPagination accessible names', () => {
  it('names icon-only prev/next buttons in Style 10', () => {
    render(<RdsPagination totalPages={10} currentPage={2} paginationStyle="Style 10" />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument();
  });

  it('names the icon-only prev button in Style 11', () => {
    render(<RdsPagination totalPages={10} currentPage={2} paginationStyle="Style 11" />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });
});
