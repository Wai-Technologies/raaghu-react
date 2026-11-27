import { eSignaturePenColors } from '../../raaghu-react-themes/tokens/design-tokens';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Brush, Save, Delete, Undo } from '@mui/icons-material';
import { RdsESignatureUpload, RdsESignatureChoose } from './rds-comp-e-signature-modes';
import './rds-comp-e-signature.scss';
import { joinClassNames, type RdsStylingProps } from '../../raaghu-elements/shared/utils/styling-props';

export interface RdsCompESignatureProps extends RdsStylingProps {
  mode?: 'draw' | 'upload' | 'choose';
  type?: 'fullname' | 'initials';
  colourSwatch?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  disabledFooterMessage?: string;
  onSignatureChange?: (signature: string | File | null) => void;
  onSave?: (dataUrl: string) => void;
  /** @deprecated Has no effect and will be removed in the next major version. */
  signatureData?: string | File | null;
  predefinedSignatures?: Array<{ id: string; name: string; style: string; fullName: string; initials: string; }>;
  /** Width of the upload panel in px (upload mode). Defaults to a 695px max width. */
  width?: number;
  /** Minimum height of the upload panel in px (upload mode). */
  height?: number;
  /** Initial pen colour (draw mode). */
  penColor?: string;
  title?: string;
}

const RdsCompESignature = React.forwardRef<HTMLDivElement, RdsCompESignatureProps>(function RdsCompESignature({
  mode = 'draw',
  type = 'fullname',
  colourSwatch = true,
  disabled = false,
  disabledMessage = 'Draw option is currently disabled.\nClear uploaded signature to enable drawing.',
  disabledFooterMessage = 'Another method already selected',
  onSignatureChange,
  onSave,
  predefinedSignatures = [
    { id: '1', name: 'Style 1', style: 'cursive', fullName: 'John Doe', initials: 'J.D' },
    { id: '2', name: 'Style 2', style: 'print', fullName: 'John Doe', initials: 'J.D' },
    { id: '3', name: 'Style 3', style: 'script', fullName: 'John Doe', initials: 'J.D' },
    { id: '4', name: 'Style 4', style: 'bold', fullName: 'John Doe', initials: 'J.D' },
    { id: '5', name: 'Style 5', style: 'elegant', fullName: 'John Doe', initials: 'J.D' },
    { id: '6', name: 'Style 6', style: 'modern', fullName: 'John Doe', initials: 'J.D' },
  ],
  width,
  height,
  penColor = eSignaturePenColors.black,
  title,
  className,
  sx,
  style,
}, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const [selectedColor, setSelectedColor] = useState(penColor);
  const [prevPenColor, setPrevPenColor] = useState(penColor);
  if (penColor !== prevPenColor) {
    setPrevPenColor(penColor);
    setSelectedColor(penColor);
  }
  const [isHovered, setIsHovered] = useState(false);
  const strokesRef = useRef<{ color: string; points: { x: number; y: number; }[]; }[]>([]);
  const [showLengthError, setShowLengthError] = useState(false);

  const [hasDrawn, setHasDrawn] = useState(false);

  const colors = [eSignaturePenColors.black, eSignaturePenColors.blue, eSignaturePenColors.red];

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
      points.slice(1).forEach((pt) => ctx.lineTo(pt.x, pt.y));
      ctx.stroke();
    });
  }, []);

  useEffect(() => {
    if (!canvasRef.current || mode !== 'draw') return;
    const canvas = canvasRef.current;
    const resize = () => {
      const dpr = globalThis.devicePixelRatio || 1;
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
    globalThis.addEventListener('resize', resize);
    return () => globalThis.removeEventListener('resize', resize);
  }, [mode, type, redraw]);

  const getPoint = (canvas: HTMLCanvasElement, e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    isDrawingRef.current = true;
    if (!hasDrawn) setHasDrawn(true);
    canvas.setPointerCapture?.(e.pointerId);
    const point = getPoint(canvas, e);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = selectedColor;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    }
    strokesRef.current.push({ color: selectedColor, points: [point] });
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const point = getPoint(canvas, e);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
    const currentStroke = strokesRef.current[strokesRef.current.length - 1];
    if (currentStroke) currentStroke.points.push(point);
  };

  const evaluateSignatureLength = () => {
    const strokes = strokesRef.current;
    const totalPoints = strokes.reduce((a, st) => a + st.points.length, 0);
    if (totalPoints === 0) { setShowLengthError(false); return; }
    let minX = Infinity, maxX = -Infinity; strokes.forEach(st => st.points.forEach(pt => { if (pt.x < minX) minX = pt.x; if (pt.x > maxX) maxX = pt.x; }));
    const boxW = maxX - minX;
    const hasFourLetters = boxW >= 160 && totalPoints >= 40;
    setShowLengthError(!hasFourLetters);
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    if (canvasRef.current && onSignatureChange) {
      const dataURL = canvasRef.current.toDataURL();
      onSignatureChange(dataURL);
    }
    evaluateSignatureLength();
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        onSignatureChange?.(null);
      }
    }
    strokesRef.current = [];
    setHasDrawn(false);
    setShowLengthError(false);
  };

  const handleUndo = () => {
    strokesRef.current.pop();
    redraw();
    if (strokesRef.current.length === 0) {
      onSignatureChange?.(null);
      setHasDrawn(false);
      setShowLengthError(false);
      return;
    }
    if (canvasRef.current) onSignatureChange?.(canvasRef.current.toDataURL());
    evaluateSignatureLength();
  };

  const handleSave = () => {
    if (canvasRef.current) onSave?.(canvasRef.current.toDataURL());
  };


  const getStateClassName = () => {
    let className = `rds-e-signature rds-e-signature--${mode} rds-e-signature--type-${type}`;
    if (disabled) className += ' rds-e-signature--disabled';
    if (isHovered && !disabled) className += ' rds-e-signature--hover';
    if (showLengthError && !disabled && mode === 'draw') className += ' rds-e-signature--error';
    return className;
  };

  const renderDrawMode = () => (
    <Box className="rds-e-signature__draw-container">
      <Typography variant="h6" className="rds-e-signature__title">
        {title ?? 'Draw Signature'}
        <span className="rds-e-signature__required">*</span>
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
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          onPointerLeave={stopDrawing}
          style={{ width: '100%', height: '100%', touchAction: 'none' }}
        />

        <Box className="rds-e-signature__controls">
          {colourSwatch && (
            <Box className="rds-e-signature__color-palette">
                  {colors.map((color, index) => (
                  <Box
                    key={color}
                    className={`rds-e-signature__color-button ${selectedColor === color ? 'rds-e-signature__color-button--selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
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
      ref={ref}
      className={joinClassNames(getStateClassName(), className)}
      sx={sx}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {mode === 'draw' && renderDrawMode()}
      {mode === 'upload' && (
        <RdsESignatureUpload
          type={type}
          disabled={disabled}
          disabledFooterMessage={disabledFooterMessage}
          width={width}
          height={height}
          title={title}
          onSignatureChange={onSignatureChange}
        />
      )}
      {mode === 'choose' && (
        <RdsESignatureChoose
          type={type}
          disabled={disabled}
          predefinedSignatures={predefinedSignatures}
          title={title}
          onSignatureChange={onSignatureChange}
        />
      )}

    </Box>
  );
});
RdsCompESignature.displayName = 'RdsCompESignature';
export default RdsCompESignature;
