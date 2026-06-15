import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompNavtabs from './rds-comp-navtabs';

jest.mock('./rds-comp-navtabs.scss', () => ({}));
jest.mock('../../raaghu-elements/rds-badge/rds-badge', () => ({
  __esModule: true,
  default: ({ label }: any) => <span data-testid="rds-badge">{label}</span>,
}));

const defaultItems = [
  { id: '1', label: 'Tab One' },
  { id: '2', label: 'Tab Two' },
  { id: '3', label: 'Tab Three', disabled: true },
];

describe('RdsCompNavtabs', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompNavtabs navtabsItems={defaultItems} type="default" />);
      expect(screen.getByText('Tab One')).toBeInTheDocument();
    });

    it('renders all tab labels', () => {
      render(<RdsCompNavtabs navtabsItems={defaultItems} type="default" />);
      expect(screen.getByText('Tab One')).toBeInTheDocument();
      expect(screen.getByText('Tab Two')).toBeInTheDocument();
      expect(screen.getByText('Tab Three')).toBeInTheDocument();
    });

    it('returns null when navtabsItems is empty', () => {
      const { container } = render(<RdsCompNavtabs navtabsItems={[]} type="default" />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Variants', () => {
    it('renders with type "tabs"', () => {
      render(<RdsCompNavtabs navtabsItems={defaultItems} type="tabs" />);
      expect(screen.getByText('Tab One')).toBeInTheDocument();
    });

    it('renders with type "default"', () => {
      render(<RdsCompNavtabs navtabsItems={defaultItems} type="default" />);
      expect(screen.getByText('Tab One')).toBeInTheDocument();
    });

    it('renders with badge count when count is provided', () => {
      const itemsWithCount = [
        { id: '1', label: 'Messages', count: 5, colorVariant: 'primary' as const },
      ];
      render(<RdsCompNavtabs navtabsItems={itemsWithCount} type="default" />);
      expect(screen.getByTestId('rds-badge')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls activeNavtabOrder when a tab is clicked', () => {
      const handleTabChange = jest.fn();
      render(
        <RdsCompNavtabs
          navtabsItems={defaultItems}
          type="default"
          activeNavtabOrder={handleTabChange}
        />
      );
      fireEvent.click(screen.getByText('Tab Two'));
      expect(handleTabChange).toHaveBeenCalledWith('2');
    });

    it('sets active tab from activeNavTabId prop', () => {
      render(
        <RdsCompNavtabs
          navtabsItems={defaultItems}
          type="default"
          activeNavTabId="2"
        />
      );
      expect(screen.getByText('Tab Two')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(
        <RdsCompNavtabs navtabsItems={defaultItems} type="default" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
