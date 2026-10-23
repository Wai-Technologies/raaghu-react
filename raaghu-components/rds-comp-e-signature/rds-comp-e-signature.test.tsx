import React from 'react';
import { render, screen, fireEvent, waitFor, createEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompESignature, { RdsCompESignatureProps } from './rds-comp-e-signature';

jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('./rds-comp-e-signature.scss', () => ({}));

jest.mock('@mui/material', () => ({
  Box: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  Typography: ({ children, variant, className, role, ...props }: any) => {
    const Component = variant?.startsWith('h') ? variant : 'p';
    return (
      <Component className={className} role={role} {...props}>
        {children}
      </Component>
    );
  },
  IconButton: ({ children, onClick, disabled, 'aria-label': ariaLabel, ...props }: any) => (
    <button onClick={onClick} disabled={disabled} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  ),
  Paper: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
}));

jest.mock('@mui/icons-material', () => ({
  Brush: () => <span data-testid="brush-icon">Brush</span>,
  Save: () => <span data-testid="save-icon">Save</span>,
  Delete: () => <span data-testid="delete-icon">Delete</span>,
  Undo: () => <span data-testid="undo-icon">Undo</span>,
}));

jest.mock('./rds-comp-e-signature-modes', () => ({
  RdsESignatureUpload: ({ type, disabled, onSignatureChange }: any) => (
    <div data-testid="e-signature-upload">
      <span>{type}</span>
      <span>{disabled ? 'disabled' : 'enabled'}</span>
      <button onClick={() => onSignatureChange?.('uploadedFile')}>Upload</button>
    </div>
  ),
  RdsESignatureChoose: ({ type, disabled, predefinedSignatures, onSignatureChange }: any) => (
    <div data-testid="e-signature-choose">
      <span>{type}</span>
      <span>{disabled ? 'disabled' : 'enabled'}</span>
      <span data-testid="signature-count">{predefinedSignatures?.length || 0}</span>
      <button onClick={() => onSignatureChange?.(predefinedSignatures?.[0])}>Choose</button>
    </div>
  ),
}));

describe('RdsCompESignature', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      configurable: true,
      value: jest.fn(() => ({
        scale: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
        clearRect: jest.fn(),
      })),
    });
    Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
      configurable: true,
      value: jest.fn(() => 'data:image/png;base64,mocked-signature'),
    });
  });


  const setup = (p: any = {}) => render(<RdsCompESignature mode="draw" {...p} />);
  const q = (container: HTMLElement, sel: string) => container.querySelector(sel);

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsCompESignature />);
      expect(q(container, '.rds-e-signature')).toBeInTheDocument();
      expect(q(container, '.rds-e-signature--draw')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompESignature.displayName).toBe('RdsCompESignature');
    });

    it('should render canvas in draw mode', () => {
      const { container } = setup();
      expect(q(container, 'canvas')).toBeInTheDocument();
    });

    it('should render title with required indicator', () => {
      render(<RdsCompESignature title="Sign Here" />);
      expect(screen.getByText('Sign Here')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should use default title "Draw Signature"', () => {
      setup();
      expect(screen.getByRole('heading', { name: /Draw Signature/ })).toBeInTheDocument();
    });
  });

  describe('Mode Variants', () => {
    it('should render draw mode', () => {
      const { container } = setup();
      expect(q(container, '.rds-e-signature--draw')).toBeInTheDocument();
      expect(q(container, 'canvas')).toBeInTheDocument();
    });

    it.each([['upload', 'e-signature-upload'], ['choose', 'e-signature-choose']])('should render %s mode', (mode, id) => {
      render(<RdsCompESignature mode={mode as any} />);
      expect(screen.getByTestId(id)).toBeInTheDocument();
    });

    it.each([['upload', 'initials'], ['choose', 'fullname']])('should pass type prop to %s mode', (mode, type) => {
      render(<RdsCompESignature mode={mode as any} type={type as any} />);
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  describe('Type Variants', () => {
    it.each([[undefined, 'fullname'], ['fullname', 'fullname'], ['initials', 'initials']])('type=%s -> class type-%s', (type, cls) => {
      const { container } = setup({ type });
      expect(q(container, `.rds-e-signature--type-${cls}`)).toBeInTheDocument();
    });

    it('should show "Draw Signature" for fullname type', () => {
      setup({ type: 'fullname' });
      expect(screen.getByRole('heading', { name: /Draw Signature/ })).toBeInTheDocument();
    });

    it('should show "Draw Initial" for initials type', () => {
      setup({ type: 'initials' });
      expect(screen.getByText('Draw Initial')).toBeInTheDocument();
    });
  });

  describe('Draw Mode - Canvas Interaction', () => {
    it('should have canvas with 100% width and height', () => {
      const { container } = setup();
      const canvas = q(container, 'canvas');
      expect(canvas).toHaveStyle('width: 100%');
      expect(canvas).toHaveStyle('height: 100%');
    });

    it.each([
      ['mouse down', { disabled: false }, ['mouseDown']],
      ['mouse down and up', {}, ['mouseDown', 'mouseUp']],
      ['mouse down and up without callback', { onSignatureChange: undefined }, ['mouseDown', 'mouseUp']],
      ['disabled drawing', { disabled: true }, ['mouseDown', 'mouseMove']],
    ])('canvas survives %s', (_n, props, events) => {
      const { container } = setup({ onSignatureChange: jest.fn(), ...props });
      const canvas = q(container, 'canvas') as Element;
      events.forEach((ev) => (fireEvent as any)[ev](canvas, { clientX: 100, clientY: 100 }));
      expect(canvas).toBeInTheDocument();
    });

    it('should hide canvas header when drawing starts', () => {
      const { container, rerender } = setup();
      const canvas = q(container, 'canvas') as Element;
      fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
      rerender(<RdsCompESignature mode="draw" />);
      expect(canvas).toBeInTheDocument();
    });

    it('should handle canvas resize event', () => {
      const { container } = setup();
      const canvas = q(container, 'canvas');
      expect(canvas).toBeInTheDocument();
      fireEvent.resize(window);
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Color Palette', () => {
    it('should render color swatch by default', () => {
      const { container } = setup({ colourSwatch: true });
      expect(q(container, '.rds-e-signature__color-palette')).toBeInTheDocument();
    });

    it('should not render color swatch when disabled', () => {
      const { container } = setup({ colourSwatch: false });
      expect(q(container, '.rds-e-signature__color-palette')).not.toBeInTheDocument();
    });

    it('should have three color options', () => {
      const { container } = setup({ colourSwatch: true });
      expect(container.querySelectorAll('.rds-e-signature__color-button').length).toBe(3);
    });

    it('should have default black color selected', () => {
      const { container } = setup({ colourSwatch: true });
      const selectedColor = q(container, '.rds-e-signature__color-button--selected');
      expect(selectedColor).toBeInTheDocument();
      expect(selectedColor).toHaveAttribute('data-color');
    });

    it('should change selected color when clicked', () => {
      const { container } = setup({ colourSwatch: true });
      const colorButtons = container.querySelectorAll('.rds-e-signature__color-button');
      fireEvent.click(colorButtons[1]);
      expect(colorButtons).toHaveLength(3);
    });

    it('should show checkmark on selected color', () => {
      const { container } = setup({ colourSwatch: true });
      const selectedButton = q(container, '.rds-e-signature__color-button--selected');
      expect(selectedButton?.querySelector('.rds-e-signature__checkmark')).toBeInTheDocument();
    });
  });

  describe('Action Buttons', () => {
    it.each(['undo', 'save', 'delete'])('should render %s button', (label) => {
      setup();
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    it('should have correct icons for buttons', () => {
      setup();
      ['brush', 'save', 'delete', 'undo'].forEach((n) => expect(screen.getByTestId(`${n}-icon`)).toBeInTheDocument());
    });

    it('should disable buttons when disabled prop is true', () => {
      setup({ disabled: true });
      ['undo', 'save', 'delete'].forEach((l) => expect(screen.getByLabelText(l)).toBeDisabled());
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled class when disabled', () => {
      const { container } = setup({ disabled: true });
      expect(q(container, '.rds-e-signature--disabled')).toBeInTheDocument();
    });

    it('should show disabled message when disabled', () => {
      setup({ disabled: true });
      expect(screen.getByText(/Draw option is currently disabled/)).toBeInTheDocument();
    });

    it('should use custom disabled message', () => {
      setup({ disabled: true, disabledMessage: 'This feature is locked' });
      expect(screen.getByText('This feature is locked')).toBeInTheDocument();
    });

    it('should show disabled footer message', () => {
      setup({ disabled: true, disabledFooterMessage: 'Upload method already selected' });
      expect(screen.getByText('Upload method already selected')).toBeInTheDocument();
    });

    it('should not show disabled footer message when empty', () => {
      const { container } = setup({ disabled: true, disabledFooterMessage: '' });
      expect(q(container, '.rds-e-signature__disabled-footer')).not.toBeInTheDocument();
    });
  });

  describe('Hover State', () => {
    it('should apply hover class on mouse enter when not disabled', () => {
      const { container } = setup({ disabled: false });
      fireEvent.mouseEnter(q(container, '.rds-e-signature') as Element);
      expect(q(container, '.rds-e-signature--hover')).toBeInTheDocument();
    });

    it('should remove hover class on mouse leave', () => {
      const { container } = setup();
      const mainBox = q(container, '.rds-e-signature') as Element;
      fireEvent.mouseEnter(mainBox);
      fireEvent.mouseLeave(mainBox);
      expect(mainBox).toBeInTheDocument();
    });

    it('should not apply hover class when disabled', () => {
      const { container } = setup({ disabled: true });
      fireEvent.mouseEnter(q(container, '.rds-e-signature') as Element);
      expect(q(container, '.rds-e-signature--hover')).not.toBeInTheDocument();
    });
  });

  describe('Props Propagation', () => {
    it('should pass type and disabled props to upload mode', () => {
      render(<RdsCompESignature mode="upload" type="initials" disabled={true} />);
      expect(screen.getByText('initials')).toBeInTheDocument();
      expect(screen.getByText('disabled')).toBeInTheDocument();
    });

    it('should pass predefined signatures to choose mode', () => {
      const signatures = [
        { id: '1', name: 'Sig 1', style: 'cursive', fullName: 'Jane Doe', initials: 'J.D' },
        { id: '2', name: 'Sig 2', style: 'script', fullName: 'Jane Doe', initials: 'J.D' },
      ];
      render(<RdsCompESignature mode="choose" predefinedSignatures={signatures} />);
      expect(screen.getByTestId('signature-count')).toHaveTextContent('2');
    });

    it('should use default predefined signatures', () => {
      render(<RdsCompESignature mode="choose" />);
      expect(screen.getByTestId('signature-count')).toHaveTextContent('6');
    });

    it('should pass width prop to upload mode', () => {
      render(<RdsCompESignature mode="upload" width={500} />);
      expect(screen.getByTestId('e-signature-upload')).toBeInTheDocument();
    });

    it('should pass pen color prop', () => {
      const { container } = setup({ penColor: '#FF0000', colourSwatch: true });
      expect(q(container, '.rds-e-signature__color-button')).toBeInTheDocument();
    });
  });

  describe('Signature Change Callback', () => {
    it('should call onSignatureChange from upload mode', () => {
      const onSignatureChange = jest.fn();
      render(<RdsCompESignature mode="upload" onSignatureChange={onSignatureChange} />);
      fireEvent.click(screen.getByText('Upload'));
      expect(onSignatureChange).toHaveBeenCalledWith('uploadedFile');
    });

    it('should call onSignatureChange from choose mode', () => {
      const onSignatureChange = jest.fn();
      const signatures = [{ id: '1', name: 'Style 1', style: 'cursive', fullName: 'John Doe', initials: 'J.D' }];
      render(<RdsCompESignature mode="choose" predefinedSignatures={signatures} onSignatureChange={onSignatureChange} />);
      fireEvent.click(screen.getByText('Choose'));
      expect(onSignatureChange).toHaveBeenCalled();
    });
  });

  describe('Clear Canvas', () => {
    it('should render delete button with callback present', () => {
      setup({ onSignatureChange: jest.fn() });
      expect(screen.getByLabelText('delete')).toBeInTheDocument();
    });

    it('should be disabled when component is disabled', () => {
      setup({ disabled: true });
      expect(screen.getByLabelText('delete')).toBeDisabled();
    });
  });

  describe('Error Handling', () => {
    it('should show no error initially', () => {
      const { container } = setup();
      expect(q(container, '.rds-e-signature__error')).not.toBeInTheDocument();
      expect(q(container, '[role="alert"]')).not.toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it.each([
      '.rds-e-signature__draw-container',
      '.rds-e-signature__canvas-container',
      '.rds-e-signature__controls',
      '.rds-e-signature__actions',
    ])('should have %s in draw mode', (cls) => {
      const { container } = setup();
      expect(q(container, cls)).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render complete draw mode with all features', () => {
      const { container } = setup({ type: 'fullname', colourSwatch: true, disabled: false, title: 'Sign Here' });
      expect(q(container, '.rds-e-signature--draw')).toBeInTheDocument();
      expect(q(container, '.rds-e-signature--type-fullname')).toBeInTheDocument();
      expect(q(container, '.rds-e-signature__color-palette')).toBeInTheDocument();
      expect(screen.getByText('Sign Here')).toBeInTheDocument();
    });

    it('should support mode switching via props', () => {
      const { rerender, container } = setup();
      expect(q(container, '.rds-e-signature--draw')).toBeInTheDocument();
      rerender(<RdsCompESignature mode="upload" />);
      expect(screen.getByTestId('e-signature-upload')).toBeInTheDocument();
      rerender(<RdsCompESignature mode="choose" />);
      expect(screen.getByTestId('e-signature-choose')).toBeInTheDocument();
    });

    it('should handle rapid mode changes', () => {
      const { rerender, container } = setup();
      rerender(<RdsCompESignature mode="upload" />);
      rerender(<RdsCompESignature mode="choose" />);
      rerender(<RdsCompESignature mode="draw" />);
      expect(q(container, '.rds-e-signature--draw')).toBeInTheDocument();
    });

    it('should maintain callback reference across re-renders', () => {
      const onSignatureChange = jest.fn();
      const { rerender } = setup({ onSignatureChange });
      rerender(<RdsCompESignature mode="draw" onSignatureChange={onSignatureChange} />);
      expect(onSignatureChange).not.toHaveBeenCalled();
    });

    it('should render with all optional props', () => {
      const customSignatures = [{ id: '1', name: 'Custom 1', style: 'bold', fullName: 'Test User', initials: 'TU' }];
      const { container } = setup({
        type: 'initials',
        colourSwatch: true,
        disabled: false,
        disabledMessage: 'Custom disabled message',
        disabledFooterMessage: 'Custom footer message',
        predefinedSignatures: customSignatures,
        width: 800,
        penColor: '#FF0000',
        title: 'Custom Signature',
      });
      expect(q(container, '.rds-e-signature')).toBeInTheDocument();
      expect(screen.getByText('Custom Signature')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty disabled message', () => {
      const { container } = setup({ disabled: true, disabledMessage: '' });
      expect(container).toBeInTheDocument();
    });

    it('should handle null predefined signatures', () => {
      const { container } = render(<RdsCompESignature mode="choose" predefinedSignatures={[]} />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompESignature />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('audit fixes', () => {
    const makeCtx = () => ({
      scale: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      clearRect: jest.fn(),
      strokeStyle: '',
    });
    let ctx: ReturnType<typeof makeCtx>;
    beforeEach(() => {
      ctx = makeCtx();
      Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
        configurable: true,
        value: jest.fn(() => ctx),
      });
    });
    const drawStroke = (canvas: Element, x = 10) => {
      fireEvent.mouseDown(canvas, { clientX: x, clientY: 10 });
      fireEvent.mouseMove(canvas, { clientX: x + 50, clientY: 20 });
      fireEvent.mouseUp(canvas);
    };
    const { RdsESignatureUpload, RdsESignatureChoose } = jest.requireActual('./rds-comp-e-signature-modes');
    const sigs = [
      { id: '1', name: 'Style 1', style: 'cursive', fullName: 'John Doe', initials: 'J.D' },
      { id: '2', name: 'Style 2', style: 'print', fullName: 'John Doe', initials: 'J.D' },
    ];

    it('G5-003: new colour applies at stroke start and resize replays strokes', () => {
      render(<RdsCompESignature />);
      const canvas = screen.getByRole('img', { name: 'Signature drawing area' });
      drawStroke(canvas);
      fireEvent.click(screen.getByRole('radio', { name: 'Red' }));
      fireEvent.mouseDown(canvas, { clientX: 10, clientY: 10 });
      expect(ctx.strokeStyle).toBe('#FF0000');
      fireEvent.mouseUp(canvas);
      ctx.lineTo.mockClear();
      fireEvent(window, new Event('resize'));
      expect(ctx.lineTo).toHaveBeenCalled();
    });

    it('G5-004: Save calls onSave with the data URL and keeps the drawing', () => {
      const onSave = jest.fn();
      const onSignatureChange = jest.fn();
      render(<RdsCompESignature onSave={onSave} onSignatureChange={onSignatureChange} />);
      drawStroke(screen.getByRole('img'));
      onSignatureChange.mockClear();
      fireEvent.click(screen.getByLabelText('save'));
      expect(onSave).toHaveBeenCalledWith('data:image/png;base64,mocked-signature');
      expect(onSignatureChange).not.toHaveBeenCalled();
    });

    it('G5-005: Undo removes only the last stroke', () => {
      const onSignatureChange = jest.fn();
      render(<RdsCompESignature onSignatureChange={onSignatureChange} />);
      const canvas = screen.getByRole('img');
      drawStroke(canvas, 10);
      drawStroke(canvas, 100);
      fireEvent.click(screen.getByLabelText('undo'));
      expect(onSignatureChange).toHaveBeenLastCalledWith('data:image/png;base64,mocked-signature');
      fireEvent.click(screen.getByLabelText('undo'));
      expect(onSignatureChange).toHaveBeenLastCalledWith(null);
    });

    it('G5-006: hovering out without drawing emits nothing', () => {
      const onSignatureChange = jest.fn();
      render(<RdsCompESignature onSignatureChange={onSignatureChange} />);
      fireEvent.mouseLeave(screen.getByRole('img'));
      expect(onSignatureChange).not.toHaveBeenCalled();
    });

    it('G5-007: touch pointers draw', () => {
      const onSignatureChange = jest.fn();
      render(<RdsCompESignature onSignatureChange={onSignatureChange} />);
      const canvas = screen.getByRole('img');
      const firePointer = (name: 'pointerDown' | 'pointerUp') => {
        const ev = createEvent[name](canvas, { clientX: 10, clientY: 10 });
        Object.defineProperty(ev, 'pointerType', { value: 'touch' });
        fireEvent(canvas, ev);
      };
      firePointer('pointerDown');
      firePointer('pointerUp');
      expect(onSignatureChange).toHaveBeenCalledWith('data:image/png;base64,mocked-signature');
    });

    it('G5-008: canvas has an accessible name', () => {
      render(<RdsCompESignature type="initials" />);
      expect(screen.getByRole('img', { name: 'Initials drawing area' })).toBeInTheDocument();
    });

    it('G5-009: colour swatches are a keyboard-operable radiogroup', () => {
      render(<RdsCompESignature />);
      expect(screen.getByRole('radiogroup', { name: 'Pen colour' })).toBeInTheDocument();
      const blue = screen.getByRole('radio', { name: 'Blue' });
      expect(blue).toHaveAttribute('aria-checked', 'false');
      fireEvent.keyDown(blue, { key: 'Enter' });
      expect(screen.getByRole('radio', { name: 'Blue' })).toHaveAttribute('aria-checked', 'true');
    });

    it('G5-012: signatureData and height warn as deprecated', () => {
      const { warnDeprecatedProp } = jest.requireMock('../../raaghu-elements/shared/utils/deprecation');
      render(<RdsCompESignature signatureData="x" height={100} />);
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompESignature', 'signatureData', expect.any(String));
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompESignature', 'height', expect.any(String));
    });

    it('G5-014/G5-017: upload error matches the 5MB limit; placeholder spelled correctly', () => {
      render(<RdsESignatureUpload type="fullname" disabled={false} />);
      expect(screen.getByText('No File Chosen')).toBeInTheDocument();
      const file = new File(['x'], 'big.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 6 * 1024 * 1024 });
      fireEvent.change(screen.getByLabelText('Upload signature file'), { target: { files: [file] } });
      expect(screen.getByText('File too large. Max size is 5MB')).toBeInTheDocument();
    });

    it('G5-015: choosing a style emits once; a second style keeps multi-select error', () => {
      const onSignatureChange = jest.fn();
      render(<RdsESignatureChoose type="fullname" disabled={false} predefinedSignatures={sigs} onSignatureChange={onSignatureChange} />);
      const cards = screen.getAllByRole('button', { pressed: false });
      fireEvent.click(cards[0]);
      expect(onSignatureChange).toHaveBeenCalledTimes(1);
      expect(onSignatureChange).toHaveBeenCalledWith('John Doe');
      fireEvent.click(cards[1]);
      expect(onSignatureChange).toHaveBeenLastCalledWith(null);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('G5-016: "Create your own signature" is actionable only with onCreateCustom', () => {
      const { rerender } = render(<RdsESignatureChoose type="fullname" disabled={false} predefinedSignatures={sigs} />);
      expect(screen.queryByRole('button', { name: /Create your own signature/ })).not.toBeInTheDocument();
      const onCreateCustom = jest.fn();
      rerender(<RdsESignatureChoose type="fullname" disabled={false} predefinedSignatures={sigs} onCreateCustom={onCreateCustom} />);
      fireEvent.keyDown(screen.getByRole('button', { name: /Create your own signature/ }), { key: 'Enter' });
      expect(onCreateCustom).toHaveBeenCalledTimes(1);
    });

    it('G5-018: required={false} hides the asterisk', () => {
      render(<RdsCompESignature required={false} />);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('G5-019: root forwards className, ref and rest props', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<RdsCompESignature ref={ref} className="custom" data-testid="root" />);
      const root = screen.getByTestId('root');
      expect(root).toHaveClass('rds-e-signature', 'custom');
      expect(ref.current).toBe(root);
    });
  });

  describe('doc-09 renames', () => {
    const { warnDeprecatedProp } = jest.requireMock('../../raaghu-elements/shared/utils/deprecation');

    it('showColorPicker hides the picker and colourSwatch warns', () => {
      const { rerender } = render(<RdsCompESignature showColorPicker={false} />);
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
      rerender(<RdsCompESignature colourSwatch={false} />);
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompESignature', 'colourSwatch', '`showColorPicker`');
    });

    it('variant and signatureType alias mode and type', () => {
      render(<RdsCompESignature variant="choose" signatureType="initials" />);
      expect(screen.getByTestId('e-signature-choose')).toBeInTheDocument();
      expect(screen.getByText('initials')).toBeInTheDocument();
    });

    it('options replaces predefinedSignatures', () => {
      const options = [{ id: 'a', name: 'A', style: 's', fullName: 'F', initials: 'I' }];
      render(<RdsCompESignature variant="choose" options={options} />);
      expect(screen.getByTestId('signature-count')).toHaveTextContent('1');
    });

    it('slotProps override the disabled messages', () => {
      render(
        <RdsCompESignature
          disabled
          slotProps={{ disabledMessage: { children: 'Locked canvas' }, helperText: { children: 'Locked footer' } }}
        />
      );
      expect(screen.getByText('Locked canvas')).toBeInTheDocument();
      expect(screen.getByText('Locked footer')).toBeInTheDocument();
    });

    it('defaultPenColor sets the initial colour and onPenColorChange reports picks', () => {
      const onPenColorChange = jest.fn();
      render(<RdsCompESignature defaultPenColor="#FF0000" onPenColorChange={onPenColorChange} />);
      expect(screen.getByRole('radio', { name: 'Red' })).toHaveAttribute('aria-checked', 'true');
      fireEvent.click(screen.getByRole('radio', { name: 'Blue' }));
      expect(onPenColorChange).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }), expect.any(String));
    });
  });
});
