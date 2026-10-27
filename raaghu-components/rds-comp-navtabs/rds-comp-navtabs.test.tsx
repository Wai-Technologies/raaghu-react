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

    it('uses variant for appearance and style for root CSS', () => {
      const { container } = render(
        <RdsCompNavtabs
          navtabsItems={defaultItems}
          type="default"
          variant="Bottom Select"
          style={{ marginTop: 8 }}
        />
      );
      expect(container.firstElementChild).toHaveStyle({ marginTop: '8px' });
      expect(container.querySelector('.rds-comp-navtabs__nav--horizontal')).toBeInTheDocument();
    });

    it('still accepts a deprecated style string as the variant', () => {
      const { container } = render(<RdsCompNavtabs navtabsItems={defaultItems} type="default" variant="Bottom Select" />);
      expect(container.querySelector('.rds-comp-navtabs__nav--horizontal')).toBeInTheDocument();
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

  describe('audit fixes', () => {
    it('supports items/value/onChange aliases (G6-018/G6-019)', () => {
      const onChange = jest.fn();
      render(
        <RdsCompNavtabs items={defaultItems} type="default" value="2" onChange={onChange} />
      );
      expect(screen.getByText('Tab Two').closest('button')).toHaveClass('rds-comp-navtabs__nav-link--active');
      fireEvent.click(screen.getByText('Tab One'));
      expect(onChange).toHaveBeenCalledWith(expect.any(Object), '1');
    });

    it('forwards id and supports iconOnly with aria-label (G6-021/G6-024)', () => {
      const items = [{ id: '1', label: 'Home', icon: '⌂' }];
      const { container } = render(
        <RdsCompNavtabs items={items} type="default" iconOnly id="nav-main" />
      );
      expect(container.querySelector('ul')).toHaveAttribute('id', 'nav-main');
      const btn = screen.getByRole('button', { name: 'Home' });
      expect(btn).toHaveAttribute('aria-label', 'Home');
      expect(btn.querySelector('.rds-comp-navtabs__icon')).toHaveTextContent('⌂');
      expect(btn).not.toHaveAttribute('data-bs-target');
    });
  });
});
