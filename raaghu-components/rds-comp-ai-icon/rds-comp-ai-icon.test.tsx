import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompAiIcon, { RdsCompAiIconProps } from './rds-comp-ai-icon';

jest.mock('./rds-comp-ai-icon.scss', () => ({}));
jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';

jest.mock('@mui/icons-material/PersonOutline', () => {
  return React.forwardRef((props: any, ref: any) => (
    <svg
      ref={ref}
      data-icon-name="person-outline"
      {...props}
    />
  ));
});

jest.mock('@mui/icons-material/GroupOutlined', () => {
  return React.forwardRef((props: any, ref: any) => (
    <svg
      ref={ref}
      data-icon-name="group-outlined"
      {...props}
    />
  ));
});

const defaultProps: RdsCompAiIconProps = {
  name: 'person-outline',
  width: '24px',
  height: '24px',
};

const getIcon = (container: HTMLElement) => {
  return container.querySelector('.rds-comp-ai-icon');
};

describe('RdsCompAiIcon', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompAiIcon {...defaultProps} />);
      const icon = getIcon(container);
      expect(icon).toBeInTheDocument();
    });

    it('renders Material UI icon when name is provided', () => {
      const { container } = render(<RdsCompAiIcon name="person-outline" />);
      const icon = getIcon(container);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('rds-comp-ai-icon');
    });

    it('renders with correct display name for debugging', () => {
      expect(RdsCompAiIcon.displayName).toBe('RdsCompAiIcon');
    });

    it('renders null when no icon source is provided', () => {
      const { container } = render(<RdsCompAiIcon />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Width and Height Props', () => {
    it('applies width and height styles', () => {
      const { container } = render(<RdsCompAiIcon {...defaultProps} width="30px" height="30px" />);
      const icon = getIcon(container);
      expect(icon).toHaveStyle({ width: '30px', height: '30px' });
    });

    it('renders with default width and height of 22px', () => {
      const { container } = render(<RdsCompAiIcon name="person-outline" />);
      const icon = getIcon(container);
      expect(icon).toHaveStyle({ width: '22px', height: '22px' });
    });

    it('applies different width values', () => {
      const { rerender, container } = render(
        <RdsCompAiIcon {...defaultProps} width="16px" />
      );
      let icon = getIcon(container);
      expect(icon).toHaveStyle({ width: '16px' });

      rerender(<RdsCompAiIcon {...defaultProps} width="48px" />);
      icon = getIcon(container);
      expect(icon).toHaveStyle({ width: '48px' });
    });

    it('applies different height values', () => {
      const { rerender, container } = render(
        <RdsCompAiIcon {...defaultProps} height="16px" />
      );
      let icon = getIcon(container);
      expect(icon).toHaveStyle({ height: '16px' });

      rerender(<RdsCompAiIcon {...defaultProps} height="48px" />);
      icon = getIcon(container);
      expect(icon).toHaveStyle({ height: '48px' });
    });

    it('handles very large width and height', () => {
      const { container } = render(
        <RdsCompAiIcon {...defaultProps} width="9999px" height="9999px" />
      );
      const icon = getIcon(container);
      expect(icon).toHaveStyle({ width: '9999px', height: '9999px' });
    });
  });

  describe('Color and Styling', () => {
    it('applies color variant class', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          colorVariant="primary"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon--primary');
    });

    it('applies different color variants', () => {
      const variants = ['primary', 'secondary', 'success', 'danger', 'warning'];
      variants.forEach((variant) => {
        const { container, unmount } = render(
          <RdsCompAiIcon
            {...defaultProps}
            colorVariant={variant}
          />
        );
        const icon = getIcon(container);
        expect(icon).toHaveClass(`rds-comp-ai-icon--${variant}`);
        unmount();
      });
    });

    it('applies cursor pointer class when isCursorPointer is true', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          isCursorPointer={true}
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon--cursor');
    });

    it('does not apply cursor pointer class when isCursorPointer is false', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          isCursorPointer={false}
        />
      );
      const icon = getIcon(container);
      expect(icon).not.toHaveClass('rds-comp-ai-icon--cursor');
    });

    it('applies custom classes from props.classes', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          classes="custom-class"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveClass('custom-class');
    });

    it('applies multiple classes together', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          colorVariant="secondary"
          isCursorPointer={true}
          classes="extra-class"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon');
      expect(icon).toHaveClass('rds-comp-ai-icon--secondary');
      expect(icon).toHaveClass('rds-comp-ai-icon--cursor');
      expect(icon).toHaveClass('extra-class');
    });

    it('applies fill property when fill is true', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          fill={true}
          strokeColor="blue"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveAttribute('fill', 'currentColor');
    });

    it('applies stroke property when stroke is true', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          stroke={true}
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveAttribute('stroke', 'currentColor');
    });

    it('applies default fill and stroke of none', () => {
      const { container } = render(<RdsCompAiIcon {...defaultProps} />);
      const icon = getIcon(container);
      expect(icon).toHaveAttribute('fill', 'none');
      expect(icon).toHaveAttribute('stroke', 'none');
    });
  });

  describe('Position Props', () => {
    it('applies center position margin', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          position="center"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveStyle({ margin: 'auto' });
    });

    it('applies top-left position margin', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          position="top-left"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveStyle({ margin: '0' });
    });

    it('applies none position', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          position="none"
        />
      );
      const icon = getIcon(container);
      expect(icon).toBeInTheDocument();
    });

    it('applies default margin when position is not specified', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          position={undefined}
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveStyle({ margin: 'auto' });
    });
  });

  describe('Event Handling', () => {
    it('calls onClick handler when icon is clicked', () => {
      const onClick = jest.fn();
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          onClick={onClick}
        />
      );
      const icon = getIcon(container) as SVGElement;
      fireEvent.click(icon);
      expect(onClick).toHaveBeenCalled();
    });

    it('passes event to onClick handler', () => {
      const onClick = jest.fn();
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          onClick={onClick}
        />
      );
      const icon = getIcon(container) as SVGElement;
      fireEvent.click(icon);
      expect(onClick).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('Data Attributes', () => {
    it('applies id attribute', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          id="icon-id"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveAttribute('id', 'icon-id');
    });

    it('applies bootstrap data attributes', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          databstoggle="modal"
          databstarget="#myModal"
          databsdismiss="modal"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveAttribute('data-bs-toggle', 'modal');
      expect(icon).toHaveAttribute('data-bs-target', '#myModal');
      expect(icon).toHaveAttribute('data-bs-dismiss', 'modal');
    });

    it('applies aria-controls attribute', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          ariacontrols="panel-id"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveAttribute('aria-controls', 'panel-id');
    });
  });

  describe('SVG Props', () => {
    it('renders SVG icon with svg class', () => {
      const { container } = render(<RdsCompAiIcon {...defaultProps} />);
      const icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon__svg');
    });

    it('applies stroke width', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          strokeWidth="2px"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveStyle({ strokeWidth: '2px' });
    });

    it('applies default stroke width of inherit', () => {
      const { container } = render(<RdsCompAiIcon {...defaultProps} />);
      const icon = getIcon(container);
      expect(icon).toHaveStyle({ strokeWidth: 'inherit' });
    });
  });

  describe('Props and Defaults', () => {
    it('renders with minimum props', () => {
      const { container } = render(<RdsCompAiIcon name="person-outline" />);
      const icon = getIcon(container);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('rds-comp-ai-icon');
    });

    it('renders with all props provided', () => {
      const { container } = render(
        <RdsCompAiIcon
          name="person-outline"
          width="30px"
          height="30px"
          colorVariant="danger"
          isCursorPointer={true}
          classes="custom"
          id="my-icon"
          fill={true}
        />
      );
      const icon = getIcon(container);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('rds-comp-ai-icon--danger');
      expect(icon).toHaveClass('rds-comp-ai-icon--cursor');
      expect(icon).toHaveClass('custom');
      expect(icon).toHaveAttribute('id', 'my-icon');
      expect(icon).toHaveAttribute('fill', 'currentColor');
    });

    it('updates when props change', () => {
      const { rerender, container } = render(
        <RdsCompAiIcon name="person-outline" />
      );
      let icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon');

      rerender(
        <RdsCompAiIcon name="users" />
      );
      icon = getIcon(container);
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Component Classes', () => {
    it('applies base component class', () => {
      const { container } = render(<RdsCompAiIcon {...defaultProps} />);
      const icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon');
    });

    it('applies svg modifier class', () => {
      const { container } = render(<RdsCompAiIcon {...defaultProps} />);
      const icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon__svg');
    });

    it('combines multiple classes correctly', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          colorVariant="warning"
          isCursorPointer={true}
          classes="custom"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon');
      expect(icon).toHaveClass('rds-comp-ai-icon--warning');
      expect(icon).toHaveClass('rds-comp-ai-icon--cursor');
      expect(icon).toHaveClass('custom');
    });
  });

  describe('Different Icon Names', () => {
    it('renders person-outline icon', () => {
      const { container } = render(<RdsCompAiIcon name="person-outline" />);
      const icon = getIcon(container);
      expect(icon).toHaveAttribute('data-icon-name', 'person-outline');
    });

    it('renders users icon', () => {
      const { container } = render(<RdsCompAiIcon name="users" />);
      const icon = getIcon(container);
      expect(icon).toHaveAttribute('data-icon-name', 'group-outlined');
    });

    it('handles lowercase icon name', () => {
      const { container } = render(<RdsCompAiIcon name="PERSON-OUTLINE" />);
      const icon = getIcon(container);
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles special characters in id', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          id="icon-with-special-!@#"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveAttribute('id', 'icon-with-special-!@#');
    });

    it('handles null onClick handler', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          onClick={null}
        />
      );
      const icon = getIcon(container);
      expect(icon).toBeInTheDocument();
    });

    it('renders multiple instances independently', () => {
      const { container } = render(
        <div>
          <RdsCompAiIcon name="person-outline" colorVariant="primary" />
          <RdsCompAiIcon name="users" colorVariant="secondary" />
        </div>
      );
      const icons = container.querySelectorAll('.rds-comp-ai-icon');
      expect(icons).toHaveLength(2);
      expect(icons[0]).toHaveClass('rds-comp-ai-icon--primary');
      expect(icons[1]).toHaveClass('rds-comp-ai-icon--secondary');
    });

    it('handles undefined color variant', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          colorVariant={undefined}
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon');
      expect(icon).not.toHaveClass('rds-comp-ai-icon--undefined');
    });

    it('handles empty classes string', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          classes=""
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon');
    });

    it('handles very long width value', () => {
      const { container } = render(
        <RdsCompAiIcon {...defaultProps} width="999999999px" />
      );
      const icon = getIcon(container);
      expect(icon).toHaveStyle({ width: '999999999px' });
    });

    it('handles zero values for dimensions', () => {
      const { container } = render(
        <RdsCompAiIcon {...defaultProps} width="0px" height="0px" />
      );
      const icon = getIcon(container);
      expect(icon).toHaveStyle({ width: '0px', height: '0px' });
    });
  });

  describe('Accessibility', () => {
    it('renders as SVG element', () => {
      const { container } = render(<RdsCompAiIcon {...defaultProps} />);
      const icon = getIcon(container);
      expect(icon?.tagName).toBe('svg');
    });
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompAiIcon {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports aria-controls attribute for accessibility', () => {
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          ariacontrols="menu"
        />
      );
      const icon = getIcon(container);
      expect(icon).toHaveAttribute('aria-controls', 'menu');
    });

    it('icon is clickable when onClick is provided', () => {
      const mockClick = jest.fn();
      const { container } = render(
        <RdsCompAiIcon
          {...defaultProps}
          onClick={mockClick}
        />
      );
      const icon = getIcon(container) as SVGElement;
      expect(icon?.onclick).toBeDefined();
    });
  });

  describe('Re-render Behavior', () => {
    it('maintains props on re-render', () => {
      const { rerender, container } = render(
        <RdsCompAiIcon
          name="person-outline"
          width="32px"
          colorVariant="success"
        />
      );

      let icon = getIcon(container);
      expect(icon).toHaveStyle({ width: '32px' });
      expect(icon).toHaveClass('rds-comp-ai-icon--success');

      rerender(
        <RdsCompAiIcon
          name="person-outline"
          width="32px"
          colorVariant="success"
        />
      );

      icon = getIcon(container);
      expect(icon).toHaveStyle({ width: '32px' });
      expect(icon).toHaveClass('rds-comp-ai-icon--success');
    });

    it('updates color variant on prop change', () => {
      const { rerender, container } = render(
        <RdsCompAiIcon {...defaultProps} colorVariant="primary" />
      );
      let icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon--primary');

      rerender(
        <RdsCompAiIcon {...defaultProps} colorVariant="danger" />
      );
      icon = getIcon(container);
      expect(icon).toHaveClass('rds-comp-ai-icon--danger');
      expect(icon).not.toHaveClass('rds-comp-ai-icon--primary');
    });

    it('updates size on prop change', () => {
      const { rerender, container } = render(
        <RdsCompAiIcon {...defaultProps} width="24px" height="24px" />
      );
      let icon = getIcon(container);
      expect(icon).toHaveStyle({ width: '24px', height: '24px' });

      rerender(
        <RdsCompAiIcon {...defaultProps} width="40px" height="40px" />
      );
      icon = getIcon(container);
      expect(icon).toHaveStyle({ width: '40px', height: '40px' });
    });
  });
});
describe('audit fixes', () => {
  it('G3-118/119: deprecated props warn and keep working; rest passes through', () => {
    const { container } = render(
      <RdsCompAiIcon {...defaultProps} classes="old" dataTestId="old-id" isAnimate aria-label="x" data-foo="bar" />
    );
    const el = container.querySelector('svg')!;
    expect(el).toHaveClass('old');
    expect(el).toHaveAttribute('data-testid', 'old-id');
    expect(el).toHaveAttribute('aria-label', 'x');
    expect(el).toHaveAttribute('data-foo', 'bar');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompAiIcon', 'isAnimate', expect.any(String));
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompAiIcon', 'classes', '`className`');
  });

  it('G3-119: new names win over deprecated ones', () => {
    const { container } = render(
      <RdsCompAiIcon {...defaultProps} className="new" classes="old" data-testid="new-id" dataTestId="old-id" />
    );
    const el = container.querySelector('svg')!;
    expect(el).toHaveClass('new');
    expect(el).not.toHaveClass('old');
    expect(el).toHaveAttribute('data-testid', 'new-id');
  });

  it('G3-120: clickable svg is keyboard accessible', () => {
    const onClick = jest.fn();
    const { container } = render(<RdsCompAiIcon {...defaultProps} onClick={onClick} />);
    const el = container.querySelector('svg')!;
    expect(el).toHaveAttribute('role', 'button');
    expect(el).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(el, { key: 'Enter' });
    fireEvent.keyDown(el, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});

describe('audit fixes: aliases', () => {
  it('src and component aliases work; imageUrl warns', () => {
    const Custom = (props: any) => <svg {...props} />;
    const { container, rerender } = render(<RdsCompAiIcon component={Custom} />);
    expect(container.querySelector('svg.rds-comp-ai-icon__svg')).toBeInTheDocument();
    rerender(<RdsCompAiIcon src="a.png" imageUrl="b.png" />);
    expect(container.querySelector('img')).toHaveAttribute('src', 'a.png');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompAiIcon', 'imageUrl', '`src`');
  });
});
