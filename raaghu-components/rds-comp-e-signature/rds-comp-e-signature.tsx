import { eSignaturePenColors } from '../../raaghu-react-themes/tokens/design-tokens';
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type Ref,
} from 'react';
import clsx from 'clsx';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { Brush, Save, Delete, Undo } from '@mui/icons-material';
import { RdsESignatureUpload, RdsESignatureChoose, type PredefinedSignatureItem } from './rds-comp-e-signature-modes';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';
import './rds-comp-e-signature.scss';

export interface RdsCompESignatureProps extends Omit<BoxProps, 'title' | 'width' | 'height' | 'ref' | 'children'> {
  /** Signature method shown: draw on a canvas, upload an image, or choose a predefined style. */
  mode?: 'draw' | 'upload' | 'choose';
  /** Whether the signature is a full name or initials. */
  type?: 'fullname' | 'initials';
  /** Shows the pen colour picker in draw mode. */
  colourSwatch?: boolean;
  /** Disables all interaction. */
  disabled?: boolean;
  /** Message shown on the canvas when disabled. */
  disabledMessage?: string;
  /** Footer message shown below the component when disabled. */
  disabledFooterMessage?: string;
  /** Called with the canvas data URL, uploaded file, chosen text, or `null` when cleared. */
  onSignatureChange?: (signature: string | File | null) => void;
  /** Called with the canvas data URL when the Save button is pressed (draw mode). */
  onSave?: (dataUrl: string) => void;
  /** Called when "Create your own signature" is activated (choose mode). Without it the text is not interactive. */
  onCreateCustom?: () => void;
  /** @deprecated Has no effect; it will be removed in the next major version. */
  signatureData?: string | File | null;
  /** Signature styles offered in choose mode. */
  predefinedSignatures?: PredefinedSignatureItem[];
  /** Maximum width (px) of the upload panel. */
  width?: number;
  /** @deprecated Has no effect; it will be removed in the next major version. */
  height?: number;
  /** Initial pen colour in draw mode. */
  penColor?: string;
  /** Heading shown in draw mode. */
  title?: string;
  /** Shows the required asterisk next to the headings. Defaults to `true`. */
  required?: boolean;
  /** Ref to the root element. */
  ref?: Ref<HTMLDivElement>;
}

const PEN_COLOR_OPTIONS = [
  { name: 'Black', value: eSignaturePenColors.black },
  { name: 'Blue', value: eSignaturePenColors.blue },
  { name: 'Red', value: eSignaturePenColors.red },
];

const DEFAULT_PREDEFINED_SIGNATURES: PredefinedSignatureItem[] = [
  { id: '1', name: 'Style 1', style: 'cursive', fullName: 'John Doe', initials: 'J.D' },
  { id: '2', name: 'Style 2', style: 'print', fullName: 'John Doe', initials: 'J.D' },
  { id: '3', name: 'Style 3', style: 'script', fullName: 'John Doe', initials: 'J.D' },
  { id: '4', name: 'Style 4', style: 'bold', fullName: 'John Doe', initials: 'J.D' },
  { id: '5', name: 'Style 5', style: 'elegant', fullName: 'John Doe', initials: 'J.D' },
  { id: '6', name: 'Style 6', style: 'modern', fullName: 'John Doe', initials: 'J.D' },
];

type Point = { x: number; y: number };
type Stroke = { color: string; points: Point[] };
type ClientPoint = { clientX: number; clientY: number };

const isTouchPointer = (e: ReactPointerEvent<HTMLCanvasElement>) =>
  e.pointerType === 'touch' || e.pointerType === 'pen';

const RdsCompESignature = ({
  mode = 'draw',
  type = 'fullname',
  colourSwatch = true,
  disabled = false,
  disabledMessage = 'Draw option is currently disabled.\nClear uploaded signature to enable drawing.',
  disabledFooterMessage = 'Another method already selected',
  onSignatureChange,
  onSave,
  onCreateCustom,
  signatureData,
  predefinedSignatures = DEFAULT_PREDEFINED_SIGNATURES,
  width = 695,
  height,
  penColor = eSignaturePenColors.black,
  title = 'Draw Signature',
  required = true,
  className,
  sx,
  ref,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: RdsCompESignatureProps) => {
  if (signatureData !== undefined) warnDeprecatedProp('RdsCompESignature', 'signatureData', 'nothing (it has no effect)');
  if (height !== undefined) warnDeprecatedProp('RdsCompESignature', 'height', 'nothing (it has no effect)');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [uiState, setUiState] = useState({
    isDrawing: false,
    selectedColor: eSignaturePenColors.black,
    isHovered: false,
    showLengthError: false,
    hasDrawn: false,
  });
  const { isDrawing, selectedColor, isHovered, showLengthError, hasDrawn } = uiState;
  const updateUiState = (updates: Partial<typeof uiState>) => {
    setUiState((prev) => ({ ...prev, ...updates }));
  };
  const [prevPenColor, setPrevPenColor] = useState(penColor);
  if (penColor !== prevPenColor) {
    setPrevPenColor(penColor);
    updateUiState({ selectedColor: penColor });
  }
  const strokesRef = useRef<Stroke[]>([]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokesRef.current.forEach(({ color, points }) => {
      if (points.length === 0) return;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    });
  }, []);

  useEffect(() => {
    if (!canvasRef.current || mode !== 'draw') return;
    const canvas = canvasRef.current;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
      redraw();
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [mode, redraw]);

  const getCanvasPoint = useCallback((canvas: HTMLCanvasElement, e: ClientPoint): Point => {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const startDrawing = useCallback((e: ClientPoint) => {
    if (disabled) return;
    updateUiState({ isDrawing: true, hasDrawn: true });
    const canvas = canvasRef.current;
    if (canvas) {
      const point = getCanvasPoint(canvas, e);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = selectedColor;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
      }
      strokesRef.current.push({ color: selectedColor, points: [point] });
    }
  }, [disabled, getCanvasPoint, selectedColor]);

  const draw = useCallback((e: ClientPoint) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const point = getCanvasPoint(canvas, e);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
      const currentStroke = strokesRef.current[strokesRef.current.length - 1];
      if (currentStroke) currentStroke.points.push(point);
    }
  }, [disabled, getCanvasPoint, isDrawing]);

  const evaluateSignatureLength = useCallback(() => {
    const strokes = strokesRef.current;
    const totalPoints = strokes.reduce((a, s) => a + s.points.length, 0);
    if (totalPoints === 0) { updateUiState({ showLengthError: false }); return; }
    let minX = Infinity, maxX = -Infinity; strokes.forEach(s => s.points.forEach(p => { if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x; }));
    const boxW = maxX - minX;
    const hasFourLetters = boxW >= 160 && totalPoints >= 40;
    updateUiState({ showLengthError: !hasFourLetters });
  }, []);

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    updateUiState({ isDrawing: false });
    if (canvasRef.current && onSignatureChange) {
      const dataURL = canvasRef.current.toDataURL();
      onSignatureChange(dataURL);
    }
    evaluateSignatureLength();
  }, [evaluateSignatureLength, isDrawing, onSignatureChange]);

  const clearCanvas = useCallback(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        onSignatureChange?.(null);
      }
    }
    strokesRef.current = [];
    updateUiState({ hasDrawn: false, showLengthError: false });
  }, [onSignatureChange]);

  const handleUndo = useCallback(() => {
    strokesRef.current.pop();
    redraw();
    if (strokesRef.current.length === 0) {
      onSignatureChange?.(null);
      updateUiState({ hasDrawn: false, showLengthError: false });
      return;
    }
    if (canvasRef.current) onSignatureChange?.(canvasRef.current.toDataURL());
    evaluateSignatureLength();
  }, [evaluateSignatureLength, onSignatureChange, redraw]);

  const handleSave = useCallback(() => {
    if (canvasRef.current) onSave?.(canvasRef.current.toDataURL());
  }, [onSave]);

  const handleSwatchKeyDown = (e: ReactKeyboardEvent<HTMLElement>, color: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      updateUiState({ selectedColor: color });
    }
  };

  const getStateClassName = useCallback(() => clsx(
    `rds-e-signature--${mode}`,
    `rds-e-signature--type-${type}`,
    "rds-e-signature",
    disabled && "rds-e-signature--disabled",
    isHovered && !disabled && "rds-e-signature--hover",
    showLengthError && !disabled && mode === "draw" && "rds-e-signature--error"
  ), [disabled, isHovered, mode, showLengthError, type]);

  const renderDrawMode = () => (
    <Box className="rds-e-signature__draw-container">
      <Typography variant="h6" className="rds-e-signature__title">
        {title}
        {required && <span className="rds-e-signature__required">*</span>}
      </Typography>

      <Paper className="rds-e-signature__canvas-container" elevation={0}>
        {(disabled || !hasDrawn) && (
          <Box className="rds-e-signature__canvas-header" aria-hidden={hasDrawn && !disabled}>
            {disabled ? (
              <Typography className="rds-e-signature__disabled-text">
                {disabledMessage}
              </Typography>
            ) : (
              <Typography className="rds-e-signature__canvas-title">
                <Brush className="rds-e-signature__canvas-icon" />
                {type === 'initials' ? 'Draw Initial' : 'Draw Signature'}
              </Typography>
            )}
          </Box>
        )}
        <canvas
          ref={canvasRef}
          className="rds-e-signature__canvas"
          role="img"
          aria-label={type === 'initials' ? 'Initials drawing area' : 'Signature drawing area'}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onPointerDown={(e) => { if (!isTouchPointer(e)) return; e.preventDefault(); startDrawing(e); }}
          onPointerMove={(e) => { if (isTouchPointer(e)) draw(e); }}
          onPointerUp={(e) => { if (isTouchPointer(e)) stopDrawing(); }}
          onPointerCancel={(e) => { if (isTouchPointer(e)) stopDrawing(); }}
          onPointerLeave={(e) => { if (isTouchPointer(e)) stopDrawing(); }}
          style={{ width: '100%', height: '100%', touchAction: 'none' }}
        />

        <Box className="rds-e-signature__controls">
          {colourSwatch && (
            <Box className="rds-e-signature__color-palette" role="radiogroup" aria-label="Pen colour">
              {PEN_COLOR_OPTIONS.map(({ name, value: color }) => (
                <Box
                  key={color}
                  className={clsx(
                    "rds-e-signature__color-button",
                    selectedColor === color && "rds-e-signature__color-button--selected"
                  )}
                  role="radio"
                  aria-checked={selectedColor === color}
                  aria-label={name}
                  tabIndex={0}
                  onClick={() => updateUiState({ selectedColor: color })}
                  onKeyDown={(e: ReactKeyboardEvent<HTMLElement>) => handleSwatchKeyDown(e, color)}
                  data-color={color}
                >
                  {selectedColor === color && <span className="rds-e-signature__checkmark">✓</span>}
                </Box>
              ))}
            </Box>
          )}
          <Box className="rds-e-signature__actions">
            <IconButton className="rds-e-signature__action-button" onClick={handleUndo} disabled={disabled} aria-label="undo">
              <Undo fontSize="small" />
            </IconButton>
            <IconButton className="rds-e-signature__action-button" disabled={disabled} aria-label="save" onClick={handleSave}>
              <Save fontSize="small" />
            </IconButton>
            <IconButton
              className="rds-e-signature__action-button rds-e-signature__action-button--delete"
              disabled={disabled}
              aria-label="delete"
              onClick={clearCanvas}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {showLengthError && (
        <Typography className="rds-e-signature__error" role="alert">
          <span className="rds-e-signature__error-icon" aria-hidden>!</span>
          Signature not clear. Please draw again.
        </Typography>
      )}
      {disabled && disabledFooterMessage && (
        <Typography className="rds-e-signature__disabled-footer">{disabledFooterMessage}</Typography>
      )}
    </Box>
  );

  return (
    <Box
      {...rest}
      ref={ref}
      className={clsx(getStateClassName(), className)}
      sx={sx}
      onMouseEnter={(e: ReactMouseEvent<HTMLDivElement>) => { updateUiState({ isHovered: true }); onMouseEnter?.(e); }}
      onMouseLeave={(e: ReactMouseEvent<HTMLDivElement>) => { updateUiState({ isHovered: false }); onMouseLeave?.(e); }}
    >
      {mode === 'draw' && renderDrawMode()}
      {mode === 'upload' && (
        <RdsESignatureUpload
          type={type}
          disabled={disabled}
          disabledFooterMessage={disabledFooterMessage}
          width={width}
          required={required}
          onSignatureChange={onSignatureChange}
        />
      )}
      {mode === 'choose' && (
        <RdsESignatureChoose
          type={type}
          disabled={disabled}
          predefinedSignatures={predefinedSignatures}
          required={required}
          onSignatureChange={onSignatureChange}
          onCreateCustom={onCreateCustom}
        />
      )}

    </Box>
  );
};
RdsCompESignature.displayName = 'RdsCompESignature';
export default RdsCompESignature;
