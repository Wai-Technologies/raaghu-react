import { eSignaturePenColors } from '../../raaghu-react-themes/tokens/design-tokens';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Brush, Save, Delete, Undo } from '@mui/icons-material';
import { RdsESignatureUpload, RdsESignatureChoose } from './rds-comp-e-signature-modes';
import './rds-comp-e-signature.scss';

export interface RdsCompESignatureProps {
  mode?: 'draw' | 'upload' | 'choose';
  type?: 'fullname' | 'initials';
  colourSwatch?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  disabledFooterMessage?: string;
  onSignatureChange?: (signature: string | File | null) => void;
  signatureData?: string | File | null;
  predefinedSignatures?: Array<{ id: string; name: string; style: string; fullName: string; initials: string; }>;
  width?: number;
  height?: number;
  penColor?: string;
  title?: string;
}

const PEN_COLORS = [eSignaturePenColors.black, eSignaturePenColors.blue, eSignaturePenColors.red];

const RdsCompESignature = ({
  mode = 'draw',
  type = 'fullname',
  colourSwatch = true,
  disabled = false,
  disabledMessage = 'Draw option is currently disabled.\nClear uploaded signature to enable drawing.',
  disabledFooterMessage = 'Another method already selected',
  onSignatureChange,
  predefinedSignatures = [
    { id: '1', name: 'Style 1', style: 'cursive', fullName: 'John Doe', initials: 'J.D' },
    { id: '2', name: 'Style 2', style: 'print', fullName: 'John Doe', initials: 'J.D' },
    { id: '3', name: 'Style 3', style: 'script', fullName: 'John Doe', initials: 'J.D' },
    { id: '4', name: 'Style 4', style: 'bold', fullName: 'John Doe', initials: 'J.D' },
    { id: '5', name: 'Style 5', style: 'elegant', fullName: 'John Doe', initials: 'J.D' },
    { id: '6', name: 'Style 6', style: 'modern', fullName: 'John Doe', initials: 'J.D' },
  ],
  width = 695,
  penColor = eSignaturePenColors.black,
  title = 'Draw Signature',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(penColor);
  const [isHovered, setIsHovered] = useState(false);
  const strokesRef = useRef<{ x: number; y: number; }[][]>([]);
  const [showLengthError, setShowLengthError] = useState(false);

  const [hasDrawn, setHasDrawn] = useState(false);

  const colors = PEN_COLORS;

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
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = 2; 
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [mode, selectedColor, type]);

  const getCanvasPoint = useCallback((canvas: HTMLCanvasElement, e: MouseEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return { x, y, scaleX, scaleY };
  }, []);

  const startDrawing = useCallback((e: MouseEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    setIsDrawing(true);
    if (!hasDrawn) setHasDrawn(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const { x, y, scaleX, scaleY } = getCanvasPoint(canvas, e);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x / scaleX, y / scaleY);
      }
      strokesRef.current.push([{ x: x / scaleX, y: y / scaleY }]);
    }
  }, [disabled, getCanvasPoint, hasDrawn]);

  const draw = useCallback((e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const { x, y, scaleX, scaleY } = getCanvasPoint(canvas, e);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(x / scaleX, y / scaleY);
        ctx.stroke();
      }
      const currentStroke = strokesRef.current[strokesRef.current.length - 1];
      if (currentStroke) currentStroke.push({ x: x / scaleX, y: y / scaleY });
    }
  }, [disabled, getCanvasPoint, isDrawing]);


  const evaluateSignatureLength = useCallback(() => {
    const strokes = strokesRef.current;
    const totalPoints = strokes.reduce((a, s) => a + s.length, 0);
    if (totalPoints === 0) { setShowLengthError(false); return; }
    let minX = Infinity, maxX = -Infinity; strokes.forEach(s => s.forEach(p => { if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x; }));
    const boxW = maxX - minX;
    const hasFourLetters = boxW >= 160 && totalPoints >= 40;
    setShowLengthError(!hasFourLetters);
  }, []);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    if (canvasRef.current && onSignatureChange) {
      const dataURL = canvasRef.current.toDataURL();
      onSignatureChange(dataURL);
    }
    evaluateSignatureLength();
  }, [evaluateSignatureLength, onSignatureChange]);

  const clearCanvas = useCallback(() => {
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
  }, [onSignatureChange]);


  const handleSave = useCallback(() => {
    
    clearCanvas();
    setShowLengthError(false);
  }, [clearCanvas]);

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
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{ width: '100%', height: '100%' }}
        />

        <Box className="rds-e-signature__controls">
          {colourSwatch && (
            <Box className="rds-e-signature__color-palette">
                  {colors.map((color, index) => (
                  <Box
                    key={color}
                    className={clsx(
                      "rds-e-signature__color-button",
                      selectedColor === color && "rds-e-signature__color-button--selected"
                    )}
                    onClick={() => setSelectedColor(color)}
                    data-color={color}
                  >
                  {selectedColor === color && <span className="rds-e-signature__checkmark">✓</span>}
                </Box>
              ))}
            </Box>
          )}
          <Box className="rds-e-signature__actions">
            <IconButton className="rds-e-signature__action-button" onClick={clearCanvas} disabled={disabled} aria-label="undo">
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
      className={getStateClassName()}
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
          onSignatureChange={onSignatureChange}
        />
      )}
      {mode === 'choose' && (
        <RdsESignatureChoose
          type={type}
          disabled={disabled}
          predefinedSignatures={predefinedSignatures}
          onSignatureChange={onSignatureChange}
        />
      )}

    </Box>
  );
};
RdsCompESignature.displayName = 'RdsCompESignature';
export default RdsCompESignature;
