import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsFormControl, { type RdsFormControlProps } from './rds-form-control';
import { axe } from 'jest-axe';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-form-control.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

describe('RdsFormControl', () => {
  const defaultProps: RdsFormControlProps = {
    children: <input type="text" data-testid="form-input" />,
    label: 'Form Label',
  };
  const setup = (p: Partial<RdsFormControlProps> = {}) => render(<RdsFormControl {...defaultProps} {...p} />);
  const labelOf = (c: HTMLElement) => c.querySelector('.MuiFormLabel-root');
  const rootOf = (c: HTMLElement) => c.querySelector('.MuiFormControl-root');

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = setup();
      expect(container).toBeInTheDocument();
      expect(rootOf(container)).toBeInTheDocument();
      expect(container.querySelector('.rds-form-control')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsFormControl.displayName).toBe('RdsFormControl');
    });

    it('should accept className prop', () => {
      const { container } = setup({ className: 'custom-class' });
      expect(container.querySelector('.rds-form-control')).toHaveClass('custom-class');
    });
  });

  describe('Label Rendering', () => {
    it('should render label when provided', () => {
      const { container } = setup({ label: 'Test Label' });
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(labelOf(container)).toBeInTheDocument();
      expect(container.querySelector('.rds-form-control__label')).toBeInTheDocument();
    });

    it.each([undefined, ''])('should not render label when label is %j', (label) => {
      const { container } = setup({ label });
      expect(container.querySelector('.rds-form-control__label')).not.toBeInTheDocument();
    });
  });

  describe('Required Field Indicator', () => {
    it.each([
      [{ isRequired: true }, true],
      [{ isRequired: false }, false],
      [{ isRequired: false, required: true }, true],
      [{}, false],
    ])('should handle props %j (required=%s)', (props, required) => {
      const { container } = setup(props);
      expect(labelOf(container)?.classList.contains('Mui-required')).toBe(required);
    });
  });

  describe('Helper Text', () => {
    it('should render helper text when provided', () => {
      const { container } = setup({ helperText: 'This is helper text' });
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
      expect(container.querySelector('.MuiFormHelperText-root')).toBeInTheDocument();
    });

    it.each([undefined, ''])('should not render helper text when helperText is %j', (helperText) => {
      const { container } = setup({ helperText });
      expect(container.querySelector('.MuiFormHelperText-root')).not.toBeInTheDocument();
    });

    it('should render multiple lines of helper text', () => {
      setup({ helperText: 'Line 1\nLine 2' });
      expect(screen.getByText((content) => content.includes('Line 1') && content.includes('Line 2'))).toBeInTheDocument();
    });
  });

  describe('Form Group Mode', () => {
    it('should render children in FormGroup when isGroup is true', () => {
      const { container } = render(
        <RdsFormControl isGroup={true} label="Group Label">
          <input type="checkbox" data-testid="checkbox1" />
          <input type="checkbox" data-testid="checkbox2" />
        </RdsFormControl>
      );
      expect(container.querySelector('.MuiFormGroup-root')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox1')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox2')).toBeInTheDocument();
    });

    it('should render children without FormGroup when isGroup is false', () => {
      const { container } = render(
        <RdsFormControl isGroup={false} label="Single Control">
          <input type="text" data-testid="input" />
        </RdsFormControl>
      );
      expect(container.querySelector('.MuiFormGroup-root')).not.toBeInTheDocument();
      expect(screen.getByTestId('input')).toBeInTheDocument();
    });

    it('should default to isGroup false', () => {
      const { container } = setup();
      expect(container.querySelector('.MuiFormGroup-root')).not.toBeInTheDocument();
    });

    it('should render multiple children in FormGroup', () => {
      render(
        <RdsFormControl isGroup={true} label="Options">
          <label>
            <input type="radio" name="group" value="1" /> Option 1
          </label>
          <label>
            <input type="radio" name="group" value="2" /> Option 2
          </label>
        </RdsFormControl>
      );
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    });
  });

  describe('Children Rendering', () => {
    it('should render children provided', () => {
      render(
        <RdsFormControl label="Input">
          <input type="text" data-testid="custom-input" />
        </RdsFormControl>
      );
      expect(screen.getByTestId('custom-input')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <RdsFormControl label="Controls">
          <input type="text" data-testid="input1" />
          <input type="text" data-testid="input2" />
        </RdsFormControl>
      );
      expect(screen.getByTestId('input1')).toBeInTheDocument();
      expect(screen.getByTestId('input2')).toBeInTheDocument();
    });

    it('should render complex children structure', () => {
      render(
        <RdsFormControl label="Complex">
          <div data-testid="wrapper">
            <span>Content</span>
            <button>Action</button>
          </div>
        </RdsFormControl>
      );
      expect(screen.getByTestId('wrapper')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render React component children', () => {
      const CustomComponent = () => <div data-testid="custom">Custom</div>;
      render(
        <RdsFormControl label="Custom">
          <CustomComponent />
        </RdsFormControl>
      );
      expect(screen.getByTestId('custom')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it.each([true, false])('should render label with error=%s', (error) => {
      const { container } = setup({ error });
      expect(labelOf(container)?.classList.contains('Mui-error')).toBe(error);
    });

    it('should show error helper text when error and helperText provided', () => {
      setup({ error: true, helperText: 'Error message' });
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('Size and Variant Props', () => {
    it.each([
      [{ size: 'small' }],
      [{ size: 'medium' }],
      [{ variant: 'standard' }],
      [{ variant: 'filled' }],
      [{ variant: 'outlined' }],
      [{ sx: { mt: 2 } }],
      [{ sx: { backgroundColor: 'rgb(255, 0, 0)', padding: '10px' } }],
      [{}],
    ] as Partial<RdsFormControlProps>[][])('should render MuiFormControl with %j', (props) => {
      const { container } = setup(props);
      expect(rootOf(container)).toBeInTheDocument();
    });
  });

  describe('Full Width', () => {
    it.each([true, false])('should handle fullWidth=%s', (fullWidth) => {
      const { container } = setup({ fullWidth });
      expect(rootOf(container)?.classList.contains('MuiFormControl-fullWidth')).toBe(fullWidth);
    });
  });

  describe('Margin Prop', () => {
    it('should forward margin prop to MuiFormControl', () => {
      const { container } = setup({ margin: 'normal' });
      expect(rootOf(container)).toHaveClass('MuiFormControl-marginNormal');
    });

    it('should support dense margin', () => {
      const { container } = setup({ margin: 'dense' });
      expect(rootOf(container)).toHaveClass('MuiFormControl-marginDense');
    });

    it('should support none margin', () => {
      const { container } = setup({ margin: 'none' });
      expect(rootOf(container)).not.toHaveClass('MuiFormControl-marginNormal');
    });
  });

  describe('Disabled State', () => {
    it.each([true, false])('should handle disabled=%s', (disabled) => {
      const { container } = setup({ disabled });
      expect(labelOf(container)?.classList.contains('Mui-disabled')).toBe(disabled);
    });
  });

  describe('Combination of Props', () => {
    it('should render with label, required, and helper text', () => {
      const { container } = render(
        <RdsFormControl label="Full Name" isRequired={true} helperText="Enter your full name">
          <input type="text" />
        </RdsFormControl>
      );
      expect(screen.getByText('Full Name')).toBeInTheDocument();
      expect(screen.getByText('Enter your full name')).toBeInTheDocument();
      expect(labelOf(container)).toHaveClass('Mui-required');
    });

    it('should render with error state, label, and helper text', () => {
      const { container } = render(
        <RdsFormControl label="Email" error={true} helperText="Invalid email format">
          <input type="email" />
        </RdsFormControl>
      );
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      expect(labelOf(container)).toHaveClass('Mui-error');
    });

    it('should render as form group with label and required', () => {
      render(
        <RdsFormControl isGroup={true} label="Preferences" isRequired={true}>
          <label>
            <input type="checkbox" /> Option 1
          </label>
        </RdsFormControl>
      );
      expect(screen.getByText('Preferences')).toBeInTheDocument();
      expect(document.querySelector('.MuiFormGroup-root')).toBeInTheDocument();
    });

    it('should render full width, required form with all features', () => {
      const { container } = render(
        <RdsFormControl
          label="Description"
          isRequired={true}
          helperText="Describe the issue"
          fullWidth={true}
          margin="normal"
        >
          <textarea />
        </RdsFormControl>
      );
      const formControl = rootOf(container);
      expect(formControl).toHaveClass('MuiFormControl-fullWidth');
      expect(formControl).toHaveClass('MuiFormControl-marginNormal');
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Describe the issue')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle component with only children', () => {
      const { container } = render(
        <RdsFormControl>
          <input type="text" data-testid="input" />
        </RdsFormControl>
      );
      expect(screen.getByTestId('input')).toBeInTheDocument();
      expect(labelOf(container)).not.toBeInTheDocument();
    });

    it('should handle null label', () => {
      const { container } = setup({ label: null as any });
      expect(labelOf(container)).not.toBeInTheDocument();
    });

    it('should handle special characters in label', () => {
      render(
        <RdsFormControl label="Field & Values <test>">
          <input type="text" />
        </RdsFormControl>
      );
      expect(screen.getByText('Field & Values <test>')).toBeInTheDocument();
    });

    it('should handle very long helper text', () => {
      const longText = 'a'.repeat(500);
      setup({ helperText: longText });
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should handle changing props dynamically', () => {
      const { rerender, container } = setup({ isRequired: false });
      expect(labelOf(container)).not.toHaveClass('Mui-required');
      rerender(<RdsFormControl {...defaultProps} isRequired={true} />);
      expect(labelOf(container)).toHaveClass('Mui-required');
    });

    it('should handle toggling error state', () => {
      const { rerender, container } = setup({ error: false });
      expect(labelOf(container)).not.toHaveClass('Mui-error');
      rerender(<RdsFormControl {...defaultProps} error={true} />);
      expect(labelOf(container)).toHaveClass('Mui-error');
    });
  });

  describe('Accessibility', () => {
    it('should render label for accessibility', () => {
      setup({ label: 'Accessible Field' });
      expect(screen.getByText('Accessible Field')).toBeInTheDocument();
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(
        <RdsFormControl label="Name">
          <input type="text" id="name-input" aria-label="Name" />
        </RdsFormControl>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('should support aria-label and aria-describedby props', () => {
      const { container } = setup({ 'aria-label': 'Form field', 'aria-describedby': 'field-description' } as any);
      expect(rootOf(container)).toHaveAttribute('aria-label', 'Form field');
      expect(rootOf(container)).toHaveAttribute('aria-describedby', 'field-description');
    });
  });

  describe('Integration Tests', () => {
    it('should render complete form control with all options', () => {
      const { container } = render(
        <RdsFormControl
          label="Email Address"
          isRequired={true}
          helperText="Enter valid email"
          isGroup={false}
          fullWidth={true}
          margin="normal"
          size="medium"
          variant="outlined"
          sx={{ maxWidth: '400px' }}
        >
          <input type="email" placeholder="your@email.com" data-testid="email-input" />
        </RdsFormControl>
      );
      expect(screen.getByText('Email Address')).toBeInTheDocument();
      expect(screen.getByText('Enter valid email')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
      expect(labelOf(container)).toHaveClass('Mui-required');
    });

    it('should render checkbox group form control', () => {
      const { container } = render(
        <RdsFormControl isGroup={true} label="Select Options" isRequired={true} helperText="Choose at least one">
          <label>
            <input type="checkbox" value="opt1" /> Option 1
          </label>
          <label>
            <input type="checkbox" value="opt2" /> Option 2
          </label>
        </RdsFormControl>
      );
      expect(container.querySelector('.MuiFormGroup-root')).toBeInTheDocument();
      expect(screen.getByText('Select Options')).toBeInTheDocument();
    });

    it('should render with error state for validation feedback', () => {
      const { container } = render(
        <RdsFormControl label="Username" error={true} helperText="Username already taken" isRequired={true}>
          <input type="text" defaultValue="john123" data-testid="username" />
        </RdsFormControl>
      );
      expect(screen.getByTestId('username')).toBeInTheDocument();
      expect(screen.getByText('Username already taken')).toBeInTheDocument();
      expect(labelOf(container)).toHaveClass('Mui-error');
    });
  });
});

describe('audit fixes', () => {
  const { warnDeprecatedProp } = jest.requireMock('../shared/utils/deprecation') as {
    warnDeprecatedProp: jest.Mock;
  };

  beforeEach(() => {
    warnDeprecatedProp.mockClear();
  });

  describe('G1-293: required replaces isRequired', () => {
    it('marks the label required via `required` without a deprecation warning', () => {
      const { container } = render(
        <RdsFormControl label="Name" required>
          <input type="text" />
        </RdsFormControl>
      );
      expect(container.querySelector('.MuiFormLabel-root')).toHaveClass('Mui-required');
      expect(container.querySelector('.MuiFormLabel-asterisk')).toBeInTheDocument();
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('still supports isRequired and warns that it is deprecated', () => {
      const { container } = render(
        <RdsFormControl label="Name" isRequired>
          <input type="text" />
        </RdsFormControl>
      );
      expect(container.querySelector('.MuiFormLabel-root')).toHaveClass('Mui-required');
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsFormControl', 'isRequired', '`required`');
    });

    it('lets `required` win over isRequired', () => {
      const { container } = render(
        <RdsFormControl label="Name" required={false} isRequired>
          <input type="text" />
        </RdsFormControl>
      );
      expect(container.querySelector('.MuiFormLabel-root')).not.toHaveClass('Mui-required');
    });
  });

  describe('G1-296: FormLabel inherits required from FormControl context', () => {
    it('renders exactly one asterisk when required', () => {
      const { container } = render(
        <RdsFormControl label="Name" required>
          <input type="text" />
        </RdsFormControl>
      );
      expect(container.querySelectorAll('.MuiFormLabel-asterisk')).toHaveLength(1);
    });
  });

  describe('G1-292: group semantics', () => {
    it('gives a group role and names it by the label when isGroup is set', () => {
      render(
        <RdsFormControl label="Preferences" isGroup>
          <label><input type="checkbox" /> Option 1</label>
        </RdsFormControl>
      );
      const group = screen.getByRole('group', { name: 'Preferences' });
      expect(group).toHaveClass('rds-form-control');
      expect(group.tagName).toBe('DIV');
    });

    it('does not add a role when isGroup is not set', () => {
      const { container } = render(
        <RdsFormControl label="Name">
          <input type="text" />
        </RdsFormControl>
      );
      const root = container.querySelector('.rds-form-control');
      expect(root).not.toHaveAttribute('role');
      expect(root).not.toHaveAttribute('aria-labelledby');
      expect(container.querySelector('.MuiFormLabel-root')).not.toHaveAttribute('id');
    });

    it('keeps consumer role and aria-labelledby', () => {
      const { container } = render(
        <RdsFormControl label="Choice" isGroup role="radiogroup" aria-labelledby="external">
          <label><input type="radio" /> A</label>
        </RdsFormControl>
      );
      const root = container.querySelector('.rds-form-control');
      expect(root).toHaveAttribute('role', 'radiogroup');
      expect(root).toHaveAttribute('aria-labelledby', 'external');
    });

    it('does not override a consumer aria-label', () => {
      const { container } = render(
        <RdsFormControl label="Choice" isGroup aria-label="Custom name">
          <label><input type="checkbox" /> A</label>
        </RdsFormControl>
      );
      const root = container.querySelector('.rds-form-control');
      expect(root).toHaveAttribute('aria-label', 'Custom name');
      expect(root).not.toHaveAttribute('aria-labelledby');
    });

    it('supports component="fieldset" and renders the label as a legend', () => {
      const { container } = render(
        <RdsFormControl component="fieldset" label="Preferences" isGroup>
          <label><input type="checkbox" /> Option 1</label>
        </RdsFormControl>
      );
      const root = container.querySelector('.rds-form-control');
      expect(root?.tagName).toBe('FIELDSET');
      expect(container.querySelector('legend')).toHaveTextContent('Preferences');
      expect(screen.getByRole('group', { name: 'Preferences' })).toBe(root);
    });

    it('has no axe violations as a labelled group', async () => {
      const { container } = render(
        <RdsFormControl label="Preferences" isGroup helperText="Pick any">
          <label><input type="checkbox" /> Option 1</label>
          <label><input type="checkbox" /> Option 2</label>
        </RdsFormControl>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('G1-295: helper text id', () => {
    it('gives the helper text a generated id', () => {
      const { container } = render(
        <RdsFormControl label="Name" helperText="Help">
          <input type="text" />
        </RdsFormControl>
      );
      expect(container.querySelector('.MuiFormHelperText-root')?.id).toMatch(/^rds-form-control-.+-helper-text$/);
    });

    it('derives the helper text id from the consumer id', () => {
      render(
        <RdsFormControl id="email" label="Email" helperText="We never share it">
          <input type="email" aria-describedby="email-helper-text" aria-label="Email" />
        </RdsFormControl>
      );
      expect(screen.getByText('We never share it')).toHaveAttribute('id', 'email-helper-text');
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription('We never share it');
    });
  });

  describe('className merge', () => {
    it('keeps rds-form-control alongside a consumer className', () => {
      const { container } = render(
        <RdsFormControl className="mine" label="Name">
          <input type="text" />
        </RdsFormControl>
      );
      const root = container.querySelector('.MuiFormControl-root');
      expect(root).toHaveClass('rds-form-control');
      expect(root).toHaveClass('mine');
    });
  });
});

describe('RdsFormControl additive renames', () => {
  beforeEach(() => (warnDeprecatedProp as jest.Mock).mockClear());

  it('renders a named group with group and warns for isGroup', () => {
    const { rerender } = render(<RdsFormControl label="L" group><input aria-label="i" /></RdsFormControl>);
    expect(screen.getByRole('group', { name: 'L' })).toBeInTheDocument();
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
    rerender(<RdsFormControl label="L" isGroup><input aria-label="i" /></RdsFormControl>);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsFormControl', 'isGroup', '`group`');
  });
});
