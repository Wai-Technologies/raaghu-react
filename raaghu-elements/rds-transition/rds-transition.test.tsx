import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsTransition, { RdsTransitionProps } from './rds-transition';

describe('RdsTransition', () => {
  describe('Rendering', () => {
    it('renders children when in prop is true', () => {
      render(
        <RdsTransition in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies fade class by default', () => {
      const { container } = render(
        <RdsTransition in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('.rds-transition--fade')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <RdsTransition in={true} className="custom-class">
          <div>Test Content</div>
        </RdsTransition>
      );
      const element = container.querySelector('.rds-transition');
      expect(element).toHaveClass('custom-class');
    });

    it('applies inline styles', () => {
      const { container } = render(
        <RdsTransition in={true} style={{ padding: '20px' }}>
          <div>Test Content</div>
        </RdsTransition>
      );
      const element = container.querySelector('.rds-transition');
      expect(element).toHaveStyle('padding: 20px');
    });
  });

  describe('Transition Types', () => {
    it('renders grow transition', () => {
      const { container } = render(
        <RdsTransition type="grow" in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('.rds-transition--grow')).toBeInTheDocument();
    });

    it('renders slide transition with direction', () => {
      const { container } = render(
        <RdsTransition type="slide" direction="up" in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      const element = container.querySelector('.rds-transition--slide');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('rds-transition--slide-up');
    });

    it('renders zoom transition', () => {
      const { container } = render(
        <RdsTransition type="zoom" in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('.rds-transition--zoom')).toBeInTheDocument();
    });

    it('renders fade transition explicitly', () => {
      const { container } = render(
        <RdsTransition type="fade" in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('.rds-transition--fade')).toBeInTheDocument();
    });
  });

  describe('Slide Directions', () => {
    it('renders slide up direction', () => {
      const { container } = render(
        <RdsTransition type="slide" direction="up" in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('.rds-transition--slide-up')).toBeInTheDocument();
    });

    it('renders slide down direction', () => {
      const { container } = render(
        <RdsTransition type="slide" direction="down" in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('.rds-transition--slide-down')).toBeInTheDocument();
    });

    it('renders slide left direction', () => {
      const { container } = render(
        <RdsTransition type="slide" direction="left" in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('.rds-transition--slide-left')).toBeInTheDocument();
    });

    it('renders slide right direction', () => {
      const { container } = render(
        <RdsTransition type="slide" direction="right" in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('.rds-transition--slide-right')).toBeInTheDocument();
    });
  });

  describe('Visibility Control', () => {
    it('unmounts on exit when unmountOnExit is true', async () => {
      const { container, rerender } = render(
        <RdsTransition in={true} unmountOnExit={true}>
          <div data-testid="test-content">Test Content</div>
        </RdsTransition>
      );
      expect(screen.getByTestId('test-content')).toBeInTheDocument();

      rerender(
        <RdsTransition in={false} unmountOnExit={true}>
          <div data-testid="test-content">Test Content</div>
        </RdsTransition>
      );

      await waitFor(() => {
        expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();
      });
    });

    it('keeps children when in is false but unmountOnExit is false', () => {
      const { container } = render(
        <RdsTransition in={false} unmountOnExit={false}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('calls onEnter callback', async () => {
      const handleEnter = jest.fn();
      render(
        <RdsTransition in={true} onEnter={handleEnter}>
          <div>Test Content</div>
        </RdsTransition>
      );
      await waitFor(() => {
        expect(handleEnter).toHaveBeenCalled();
      });
    });

    it('calls onEntered callback', async () => {
      const handleEntered = jest.fn();
      render(
        <RdsTransition in={true} onEntered={handleEntered} timeout={50}>
          <div>Test Content</div>
        </RdsTransition>
      );
      await waitFor(() => {
        expect(handleEntered).toHaveBeenCalled();
      });
    });

    it('calls onExit callback', async () => {
      const handleExit = jest.fn();
      const { rerender } = render(
        <RdsTransition in={true} onExit={handleExit}>
          <div>Test Content</div>
        </RdsTransition>
      );

      rerender(
        <RdsTransition in={false} onExit={handleExit} unmountOnExit={true}>
          <div>Test Content</div>
        </RdsTransition>
      );

      await waitFor(() => {
        expect(handleExit).toHaveBeenCalled();
      });
    });
  });

  describe('Accessibility', () => {
    it('has role="region"', () => {
      const { container } = render(
        <RdsTransition in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('[role="region"]')).toBeInTheDocument();
    });

    it('has aria-live="polite"', () => {
      const { container } = render(
        <RdsTransition in={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('accepts custom duration as number', () => {
      const { container } = render(
        <RdsTransition in={true} duration={500}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('.rds-transition')).toBeInTheDocument();
    });

    it('accepts custom duration as object', () => {
      const { container } = render(
        <RdsTransition in={true} duration={{ enter: 300, exit: 200 }}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('.rds-transition')).toBeInTheDocument();
    });

    it('accepts custom easing function', () => {
      const { container } = render(
        <RdsTransition in={true} easing="ease-in-out">
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(container.querySelector('.rds-transition')).toBeInTheDocument();
    });

    it('accepts mountOnEnter prop', () => {
      const { container } = render(
        <RdsTransition in={true} mountOnEnter={true}>
          <div>Test Content</div>
        </RdsTransition>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('has correct displayName', () => {
      expect(RdsTransition.displayName).toBe('RdsTransition');
    });
  });
});
