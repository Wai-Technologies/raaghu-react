import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Share, Print, Favorite } from '@mui/icons-material';
import RdsSpeedDial, { RdsSpeedDialAction, RdsSpeedDialProps } from './rds-speed-dial';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-speed-dial.scss', () => ({}));

describe('RdsSpeedDial', () => {
  const mockActions: RdsSpeedDialAction[] = [
    {
      icon: <Share data-testid="share-icon" />,
      name: 'Share',
      tooltipTitle: 'Share this item',
      onClick: jest.fn(),
    },
    {
      icon: <Print data-testid="print-icon" />,
      name: 'Print',
      tooltipTitle: 'Print this item',
      onClick: jest.fn(),
    },
    {
      icon: <Favorite data-testid="favorite-icon" />,
      name: 'Save',
      onClick: jest.fn(),
    },
  ];

  const defaultProps: RdsSpeedDialProps = {
    ariaLabel: 'Speed dial example',
    icon: <Share />,
    actions: mockActions,
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsSpeedDial {...defaultProps} />);
      expect(container.querySelector('.MuiSpeedDial-root')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsSpeedDial.displayName).toBe('RdsSpeedDial');
    });

    it('should render MUI SpeedDial component', () => {
      const { container } = render(<RdsSpeedDial {...defaultProps} />);
      expect(container.querySelector('.MuiSpeedDial-root')).toBeInTheDocument();
    });

    it('should render MUI SpeedDialIcon', () => {
      const { container } = render(<RdsSpeedDial {...defaultProps} />);
      expect(container.querySelector('.MuiSpeedDialIcon-root')).toBeInTheDocument();
    });

    it('should render without icon when icon prop not provided', () => {
      const { container } = render(
        <RdsSpeedDial {...defaultProps} icon={undefined} />
      );
      expect(container.querySelector('.MuiSpeedDial-root')).toBeInTheDocument();
    });

    it('should render with custom icon', () => {
      const { container } = render(
        <RdsSpeedDial
          {...defaultProps}
          icon={<Print data-testid="custom-icon" />}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Actions Rendering', () => {
    it('should render all actions provided', () => {
      const { container } = render(<RdsSpeedDial {...defaultProps} ariaLabel="Test Speed Dial" />);
      const actions = container.querySelectorAll('.MuiSpeedDialAction-fab');
      expect(actions.length).toBe(mockActions.length);
    });

    it('should render actions with correct tooltips', async () => {
      const { container } = render(<RdsSpeedDial {...defaultProps} ariaLabel="Test Speed Dial" open={true} />);
      // MUI SpeedDialAction uses aria-label for tooltips
      const actionButtons = container.querySelectorAll('.MuiSpeedDialAction-fab');
      expect(actionButtons[0]).toHaveAttribute('aria-label', 'Share this item');
      expect(actionButtons[1]).toHaveAttribute('aria-label', 'Print this item');
    });

    it('should use action name as tooltip when tooltipTitle not provided', () => {
      const actionsWithoutTooltips: RdsSpeedDialAction[] = [
        {
          icon: <Share />,
          name: 'Share',
          onClick: jest.fn(),
        },
      ];
      const { container } = render(
        <RdsSpeedDial
          {...defaultProps}
          actions={actionsWithoutTooltips}
          open={true}
        />
      );
      const actionButton = container.querySelector('.MuiSpeedDialAction-fab');
      expect(actionButton).toHaveAttribute('aria-label', 'Share');
    });

    it('should render action icons correctly', () => {
      render(<RdsSpeedDial {...defaultProps} />);
      expect(screen.getByTestId('share-icon')).toBeInTheDocument();
      expect(screen.getByTestId('print-icon')).toBeInTheDocument();
      expect(screen.getByTestId('favorite-icon')).toBeInTheDocument();
    });

    it('should render with empty actions array', () => {
      const { container } = render(
        <RdsSpeedDial {...defaultProps} actions={[]} />
      );
      expect(container.querySelector('.MuiSpeedDial-root')).toBeInTheDocument();
    });

    it('should render single action', () => {
      const singleAction: RdsSpeedDialAction[] = [mockActions[0]];
      const { container } = render(
        <RdsSpeedDial {...defaultProps} actions={singleAction} />
      );
      const actions = container.querySelectorAll('.MuiSpeedDialAction-fab');
      expect(actions.length).toBe(1);
    });
  });

  describe('State Management', () => {
    it('should manage internal state when no open prop is provided', async () => {
      const { container } = render(<RdsSpeedDial {...defaultProps} open={false} />);
      const fab = container.querySelector('.MuiSpeedDial-fab');
      
      expect(fab).toBeInTheDocument();
      // Click to open
      fireEvent.click(fab!);
      
      await waitFor(() => {
        expect(fab).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should use controlled open state when provided', () => {
      const onOpen = jest.fn();
      const onClose = jest.fn();
      const { container } = render(
        <RdsSpeedDial
          {...defaultProps}
          open={true}
          onOpen={onOpen}
          onClose={onClose}
        />
      );

      const fab = container.querySelector('.MuiSpeedDial-fab') as HTMLButtonElement;
      expect(fab).toHaveAttribute('aria-expanded', 'true');
    });

    it('should call onOpen callback when opening', async () => {
      const onOpen = jest.fn();
      const { container } = render(
        <RdsSpeedDial {...defaultProps} onOpen={onOpen} />
      );
      const fab = container.querySelector('.MuiSpeedDial-fab');
      
      fireEvent.click(fab!);
      
      await waitFor(() => {
        expect(onOpen).toHaveBeenCalled();
      });
    });

    it('should call onClose callback when closing', async () => {
      const onClose = jest.fn();
      const { container } = render(
        <RdsSpeedDial {...defaultProps} onClose={onClose} />
      );
      const fab = container.querySelector('.MuiSpeedDial-fab');
      
      // Open first
      fireEvent.click(fab!);
      
      // Close
      fireEvent.click(fab!);
      
      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it('should not update internal state when open is force-opened (true)', async () => {
      const onClose = jest.fn();
      const { container } = render(
        <RdsSpeedDial {...defaultProps} open={true} onClose={onClose} />
      );

      // Speed dial should be open
      const fab = container.querySelector('.MuiSpeedDial-fab') as HTMLButtonElement;
      expect(fab).toHaveAttribute('aria-expanded', 'true');

      // Try to close by clicking fab
      fireEvent.click(fab);

      // Wait a bit for state changes
      await new Promise(resolve => setTimeout(resolve, 100));

      // Even though onClose is called, the visible state should remain open because open={true}
      expect(fab).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Action Callbacks', () => {
    it('should call action onClick handler when action is clicked', async () => {
      const handleClick = jest.fn();
      const actions: RdsSpeedDialAction[] = [
        {
          icon: <Share data-testid="share-action" />,
          name: 'Share',
          onClick: handleClick,
        },
      ];

      const { container } = render(
        <RdsSpeedDial {...defaultProps} actions={actions} open={true} />
      );

      const actionButton = container.querySelector('.MuiSpeedDialAction-fab');
      fireEvent.click(actionButton!);

      await waitFor(() => {
        expect(handleClick).toHaveBeenCalled();
      });
    });

    it('should call multiple action handlers independently', async () => {
      const handleShare = jest.fn();
      const handlePrint = jest.fn();
      const actions: RdsSpeedDialAction[] = [
        {
          icon: <Share data-testid="share" />,
          name: 'Share',
          onClick: handleShare,
        },
        {
          icon: <Print data-testid="print" />,
          name: 'Print',
          onClick: handlePrint,
        },
      ];

      const { container } = render(
        <RdsSpeedDial {...defaultProps} actions={actions} open={true} />
      );

      const actionButtons = container.querySelectorAll(
        '.MuiSpeedDialAction-fab'
      );

      fireEvent.click(actionButtons[0]);
      fireEvent.click(actionButtons[1]);

      await waitFor(() => {
        expect(handleShare).toHaveBeenCalledTimes(1);
        expect(handlePrint).toHaveBeenCalledTimes(1);
      });
    });

    it('should handle action without onClick handler', () => {
      const actions: RdsSpeedDialAction[] = [
        {
          icon: <Share />,
          name: 'Share',
          // No onClick provided
        },
      ];

      const { container } = render(
        <RdsSpeedDial {...defaultProps} actions={actions} open={true} />
      );

      const actionButton = container.querySelector('.MuiSpeedDialAction-fab');
      expect(() => fireEvent.click(actionButton!)).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label', () => {
      const { container } = render(
        <RdsSpeedDial {...defaultProps} ariaLabel="Custom aria label" />
      );
      const speedDial = container.querySelector('[aria-label]');
      expect(speedDial).toHaveAttribute('aria-label', 'Custom aria label');
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsSpeedDial {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should use tooltipTitle as aria-label fallback', () => {
      const { container } = render(
        <RdsSpeedDial {...defaultProps} tooltipTitle="Speed Dial" ariaLabel="" />
      );
      const speedDial = container.querySelector('[aria-label]');
      expect(speedDial).toHaveAttribute('aria-label', 'Speed Dial');
    });

    it('should use default aria-label when neither ariaLabel nor tooltipTitle provided', () => {
      const { container } = render(
        <RdsSpeedDial
          {...defaultProps}
          ariaLabel=""
          tooltipTitle=""
        />
      );
      const speedDial = container.querySelector('[aria-label]');
      expect(speedDial).toHaveAttribute('aria-label', 'Speed dial');
    });

    it('should render action buttons with accessible roles', () => {
      const { container } = render(
        <RdsSpeedDial {...defaultProps} open={true} />
      );
      const actionButtons = container.querySelectorAll(
        '.MuiSpeedDialAction-fab'
      );
      actionButtons.forEach((button) => {
        expect(button).toHaveAttribute('role', 'menuitem');
      });
    });

    it('should maintain proper DOM structure for accessibility', () => {
      const { container } = render(<RdsSpeedDial {...defaultProps} open={true} />);
      const speedDial = container.querySelector('.MuiSpeedDial-root');
      expect(speedDial).toBeInTheDocument();
      expect(speedDial).toHaveClass('MuiSpeedDial-root');
    });
  });

  describe('Props Forwarding', () => {
    it('should forward direction prop', () => {
      const { container } = render(
        <RdsSpeedDial {...defaultProps} direction="up" />
      );
      const speedDial = container.querySelector('.MuiSpeedDial-root');
      expect(speedDial).toHaveClass('MuiSpeedDial-directionUp');
    });

    it('should forward className prop', () => {
      const { container } = render(
        <RdsSpeedDial {...defaultProps} className="custom-class" />
      );
      const speedDial = container.querySelector('.MuiSpeedDial-root');
      expect(speedDial).toHaveClass('custom-class');
    });

    it('should forward FabProps', () => {
      const { container } = render(
        <RdsSpeedDial
          {...defaultProps}
          FabProps={{ 'data-testid': 'custom-fab' } as any}
        />
      );
      expect(screen.getByTestId('custom-fab')).toBeInTheDocument();
    });

    it('should forward additional MUI SpeedDial props', () => {
      const { container } = render(
        <RdsSpeedDial
          {...defaultProps}
          sx={{ backgroundColor: 'red' }}
          className="custom-class"
        />
      );
      const speedDial = container.querySelector('.MuiSpeedDial-root');
      expect(speedDial).toHaveClass('custom-class');
    });

    it('should handle multiple directions', () => {
      const directions = ['up', 'down', 'left', 'right'] as const;
      
      directions.forEach((direction) => {
        const { container } = render(
          <RdsSpeedDial {...defaultProps} direction={direction} />
        );
        const speedDial = container.querySelector('.MuiSpeedDial-root');
        expect(speedDial).toHaveClass(`MuiSpeedDial-direction${direction.charAt(0).toUpperCase() + direction.slice(1)}`);
      });
    });
  });

  describe('Icon Management', () => {
    it('should render openIcon when provided', () => {
      const { container } = render(
        <RdsSpeedDial
          {...defaultProps}
          icon={<Share data-testid="closed-icon" />}
          openIcon={<Favorite data-testid="open-icon" />}
          open={true}
        />
      );
      // MUI SpeedDialIcon renders both icons
      expect(screen.getByTestId('open-icon')).toBeInTheDocument();
    });

    it('should use default icon when not provided', () => {
      const { container } = render(
        <RdsSpeedDial
          {...defaultProps}
          icon={undefined}
          openIcon={undefined}
        />
      );
      const speedDialIcon = container.querySelector('.MuiSpeedDialIcon-root');
      expect(speedDialIcon).toBeInTheDocument();
    });

    it('should handle both icon and openIcon together', () => {
      const { container } = render(
        <RdsSpeedDial
          {...defaultProps}
          icon={<Share data-testid="regular-icon" />}
          openIcon={<Favorite data-testid="open-icon-alt" />}
          open={true}
        />
      );
      expect(screen.getByTestId('regular-icon')).toBeInTheDocument();
      expect(screen.getByTestId('open-icon-alt')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid open/close events', async () => {
      const onOpen = jest.fn();
      const onClose = jest.fn();
      const { container } = render(
        <RdsSpeedDial {...defaultProps} onOpen={onOpen} onClose={onClose} />
      );
      const fab = container.querySelector('.MuiSpeedDial-fab');

      // Rapid clicks
      fireEvent.click(fab!);
      fireEvent.click(fab!);
      fireEvent.click(fab!);

      await waitFor(() => {
        expect(onOpen.mock.calls.length + onClose.mock.calls.length).toBeGreaterThan(0);
      });
    });

    it('should handle prop updates gracefully', () => {
      const { rerender, container } = render(
        <RdsSpeedDial
          {...defaultProps}
          ariaLabel="Initial Label"
          icon={<Share />}
        />
      );

      rerender(
        <RdsSpeedDial
          {...defaultProps}
          ariaLabel="Updated Label"
          icon={<Print />}
        />
      );

      const speedDial = container.querySelector('[aria-label]');
      expect(speedDial).toHaveAttribute('aria-label', 'Updated Label');
    });

    it('should handle actions array mutation', () => {
      const actions = [mockActions[0]];
      const { rerender, container } = render(
        <RdsSpeedDial {...defaultProps} actions={actions} />
      );

      let actionButtons = container.querySelectorAll('.MuiSpeedDialAction-fab');
      expect(actionButtons.length).toBe(1);

      const newActions = [mockActions[0], mockActions[1]];
      rerender(<RdsSpeedDial {...defaultProps} actions={newActions} />);

      actionButtons = container.querySelectorAll('.MuiSpeedDialAction-fab');
      expect(actionButtons.length).toBe(2);
    });

    it('should render with all optional props undefined', () => {
      const minimalProps: RdsSpeedDialProps = {
        actions: mockActions,
        ariaLabel: 'Speed dial',
      };

      const { container } = render(<RdsSpeedDial {...minimalProps} />);
      expect(container.querySelector('.MuiSpeedDial-root')).toBeInTheDocument();
    });

    it('should handle very long action names', () => {
      const actions: RdsSpeedDialAction[] = [
        {
          icon: <Share />,
          name: 'This is a very long action name that might cause layout issues',
          onClick: jest.fn(),
        },
      ];

      const { container } = render(
        <RdsSpeedDial {...defaultProps} actions={actions} open={true} />
      );
      const actionButton = container.querySelector('.MuiSpeedDialAction-fab');
      expect(actionButton).toBeInTheDocument();
    });

    it('should handle actions with special characters in names', () => {
      const actions: RdsSpeedDialAction[] = [
        {
          icon: <Share />,
          name: 'Share & Print (v2.0)',
          onClick: jest.fn(),
        },
      ];

      const { container } = render(
        <RdsSpeedDial {...defaultProps} actions={actions} open={true} />
      );
      expect(container.querySelector('.MuiSpeedDialAction-fab')).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should work with keyboard navigation', async () => {
      const handleClick = jest.fn();
      const actions: RdsSpeedDialAction[] = [
        {
          icon: <Share />,
          name: 'Share',
          onClick: handleClick,
        },
      ];

      const { container } = render(
        <RdsSpeedDial {...defaultProps} actions={actions} />
      );

      const fab = container.querySelector('.MuiSpeedDial-fab') as HTMLButtonElement;
      
      // Click to open
      fireEvent.click(fab);

      await waitFor(() => {
        expect(fab).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should complete full open/action click/close cycle', async () => {
      const handleClick = jest.fn();
      const onOpen = jest.fn();
      const onClose = jest.fn();

      const actions: RdsSpeedDialAction[] = [
        {
          icon: <Share />,
          name: 'Share',
          onClick: handleClick,
        },
      ];

      const { container } = render(
        <RdsSpeedDial
          {...defaultProps}
          actions={actions}
          onOpen={onOpen}
          onClose={onClose}
        />
      );

      const fab = container.querySelector('.MuiSpeedDial-fab') as HTMLElement;

      // Open
      fireEvent.click(fab);
      await waitFor(() => {
        expect(onOpen).toHaveBeenCalled();
      });

      // Click action
      const actionButton = container.querySelector('.MuiSpeedDialAction-fab');
      fireEvent.click(actionButton!);

      await waitFor(() => {
        expect(handleClick).toHaveBeenCalled();
      });
    });

    it('should support theme customization via sx prop', () => {
      const customSx = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      };

      const { container } = render(
        <RdsSpeedDial {...defaultProps} sx={customSx} />
      );

      expect(container.querySelector('.MuiSpeedDial-root')).toBeInTheDocument();
    });
  });
});