import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DEFAULT_RDS_COMP_DETAILS_PANE_LOCALE_TEXT } from './rds-comp-details-pane-locale';
import { HistoryFavoritesTabs, SelectionContent } from './details-pane-components';

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

describe('HistoryFavoritesTabs locale text', () => {
  it('uses text overrides for headings and delete labels', () => {
    render(
      <HistoryFavoritesTabs
        activeTab="history"
        setActiveTab={() => undefined}
        historyItems={[{ id: 1, name: 'Item' }]}
        olderHistoryItems={[]}
        handleDeleteHistoryItem={() => undefined}
        handleDeleteOlderHistoryItem={() => undefined}
        text={{
          ...DEFAULT_RDS_COMP_DETAILS_PANE_LOCALE_TEXT,
          today: 'Heute',
          deleteItem: (name) => `Loeschen ${name}`,
        }}
      />
    );
    expect(screen.getByText('Heute')).toBeInTheDocument();
    expect(screen.getByLabelText('Loeschen Item')).toBeInTheDocument();
  });
});
