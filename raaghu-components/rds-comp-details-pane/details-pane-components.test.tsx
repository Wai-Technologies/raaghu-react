import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SelectionContent } from './details-pane-components';

jest.mock('./rds-comp-details-pane.scss', () => ({}));

const agents = [
  { id: 'A-1', name: 'Asha Rao', designation: 'Broker', count: 2 },
  { id: 'B-2', name: 'Ben Cole', designation: 'Agent' },
];

describe('SelectionContent', () => {
  it('renders the given header and agents', () => {
    render(<SelectionContent headerText="Pick an agent" agents={agents} />);
    expect(screen.getByRole('heading', { name: 'Pick an agent' })).toBeInTheDocument();
    expect(screen.getByText('Asha Rao')).toBeInTheDocument();
    expect(screen.getByText('Ben Cole')).toBeInTheDocument();
  });

  it('filters agents by name or id from the search field', () => {
    render(<SelectionContent agents={agents} />);
    fireEvent.change(screen.getByPlaceholderText(/Search for Agents/), { target: { value: 'b-2' } });
    expect(screen.queryByText('Asha Rao')).not.toBeInTheDocument();
    expect(screen.getByText('Ben Cole')).toBeInTheDocument();
  });
});
