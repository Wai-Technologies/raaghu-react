import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, Stack, Paper } from '@mui/material';
import { Brush, Upload, Edit, Clear, Save, Delete, Undo } from '@mui/icons-material';
import './rds-comp-e-signature.scss';

export interface RdsCompESignatureProps {
  mode?: 'draw' | 'upload' | 'choose';
  state?: 'default' | 'selected' | 'active' | 'disabled' | 'error';
  type?: 'fullname' | 'initials';
  colourSwatch?: boolean;
  errorText?: string; // legacy (unused after removing validation)
  disableText?: string;
  disableMessage?: boolean;
  errorMessage?: boolean; // legacy
  showError?: boolean; // legacy
  showDisabled?: boolean;
  // Validation props removed (kept typed for backwards compatibility but unused)
  required?: boolean;
  minBoxWidth?: number;
  minBoxHeight?: number;
  maxPointDensity?: number;
  showValidationMessage?: boolean;
  onValidationChange?: (valid: boolean, reason?: string) => void;
  onSignatureChange?: (signature: string | File | null) => void;
  onModeChange?: (mode: 'draw' | 'upload' | 'choose') => void;
  signatureData?: string | File | null;
  predefinedSignatures?: Array<{ id: string; name: string; style: string; fullName: string; initials: string; }>;
  width?: number;
  height?: number;
  penColor?: string;
  title?: string;
}

const RdsCompESignature: React.FC<RdsCompESignatureProps> = ({
  mode = 'draw',
  state = 'default',
  type = 'fullname',
  colourSwatch = true,
  errorText = 'Signature not clear. Please draw again.',
  disableText = 'Another method already selected',
  disableMessage = true,
  errorMessage = true,
  showError = false,
  showDisabled = false,
  required = false,
  minBoxWidth = 100,
  minBoxHeight = 20,
  maxPointDensity = 5,
  showValidationMessage = true,
  onValidationChange,
  onSignatureChange,
  onModeChange,
  signatureData,
  predefinedSignatures = [
    { id: '1', name: 'Style 1', style: 'cursive', fullName: 'John Doe', initials: 'J.D' },
    { id: '2', name: 'Style 2', style: 'print', fullName: 'John Doe', initials: 'J.D' },
    { id: '3', name: 'Style 3', style: 'script', fullName: 'John Doe', initials: 'J.D' },
    { id: '4', name: 'Style 4', style: 'bold', fullName: 'John Doe', initials: 'J.D' },
    { id: '5', name: 'Style 5', style: 'elegant', fullName: 'John Doe', initials: 'J.D' },
    { id: '6', name: 'Style 6', style: 'modern', fullName: 'John Doe', initials: 'J.D' },
  ],
  width = 695,
  height = 237,
  penColor = '#000000',
  title = 'Draw Signature',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(penColor);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Track strokes for validation (array of point arrays)
  const strokesRef = useRef<{x:number;y:number;}[][]>([]);
  // Signature length validation: show error until it looks like at least 2 letters
  const [showLengthError, setShowLengthError] = useState(false);
  // Track if any drawing has occurred (controls placeholder visibility)
  const [hasDrawn, setHasDrawn] = useState(false);

  const colors = ['#000000', '#0066ff', '#ff0000'];

  // Ensure canvas matches display size & device pixel ratio for accurate coordinates
  useEffect(() => {
    if (!canvasRef.current || mode !== 'draw') return;
    const canvas = canvasRef.current;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      // Set actual pixel size accounting for DPR
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = 2; // line width in CSS pixels
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [mode, selectedColor, type]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (state === 'disabled') return;
    setIsDrawing(true);
  if (!hasDrawn) setHasDrawn(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width; // account for DPR & CSS scaling
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x / scaleX, y / scaleY); // convert back to CSS pixel space after scaling ctx
      }
  // Start new stroke (store CSS pixel coordinates)
  strokesRef.current.push([{ x: x / scaleX, y: y / scaleY }]);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || state === 'disabled') return;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(x / scaleX, y / scaleY);
        ctx.stroke();
      }
  // Append to current stroke
  const currentStroke = strokesRef.current[strokesRef.current.length - 1];
  if (currentStroke) currentStroke.push({ x: x / scaleX, y: y / scaleY });
    }
  };

  // Evaluate approximate letter count based on bounding box width & total points
  const evaluateSignatureLength = () => {
    const strokes = strokesRef.current;
    const totalPoints = strokes.reduce((a,s)=>a+s.length,0);
    if (totalPoints === 0) { setShowLengthError(false); return; }
    // Compute bounding box
    let minX=Infinity,maxX=-Infinity; strokes.forEach(s=>s.forEach(p=>{ if(p.x<minX) minX=p.x; if(p.x>maxX) maxX=p.x; }));
    const boxW = maxX - minX;
  // Heuristic: assume one letter ~40px wide; require >=4 letters => width >= 160px and enough points
  const hasFourLetters = boxW >= 160 && totalPoints >= 40; // tuned for ~4 chars
  setShowLengthError(!hasFourLetters);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current && onSignatureChange) {
      const dataURL = canvasRef.current.toDataURL();
      onSignatureChange(dataURL);
    }
    // After finishing stroke, evaluate length
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onSignatureChange?.(file);
    }
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    const selectedSignature = predefinedSignatures.find(sig => sig.id === styleId);
    if (selectedSignature) {
      onSignatureChange?.(type === 'fullname' ? selectedSignature.fullName : selectedSignature.initials);
    }
    // Choosing a signature counts as valid if required
  // validation removed
  };

  // Validation removed

  const handleSave = () => {
    // On save: clear input and hide error
  clearCanvas();
  setShowLengthError(false);
  };

  const getStateClassName = () => {
    let className = `rds-e-signature rds-e-signature--${mode} rds-e-signature--type-${type}`;
    if (state === 'selected' || isHovered) {
      className += ` rds-e-signature--selected`;
    }
    if (state === 'active') {
      className += ` rds-e-signature--active`;
    }
    if (state === 'disabled') {
      className += ` rds-e-signature--disabled`;
    }
  // No external error styling now
    return className;
  };

  const renderDrawMode = () => (
    <Box className="rds-e-signature__draw-container">
      <Typography variant="h6" className="rds-e-signature__title">
        {title}
        <span className="rds-e-signature__required">*</span>
      </Typography>
      
      <Paper className="rds-e-signature__canvas-container" elevation={0}>
        {!hasDrawn && (
          <Box className="rds-e-signature__canvas-header" aria-hidden={hasDrawn}>
            <Typography className="rds-e-signature__canvas-title">
              <Brush className="rds-e-signature__canvas-icon" />
              {type === 'initials' ? 'Draw Initial' : 'Draw Signature'}
            </Typography>
          </Box>
        )}
        
        <canvas
          ref={canvasRef}
          className="rds-e-signature__canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        
        <Box className="rds-e-signature__controls">
          {colourSwatch && (
            <Box className="rds-e-signature__color-palette">
              {colors.map((color, index) => (
                <Box
                  key={color}
                  className={`rds-e-signature__color-button ${selectedColor === color ? 'rds-e-signature__color-button--selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && index === 0 && <span className="rds-e-signature__checkmark">✓</span>}
                </Box>
              ))}
            </Box>
          )}
          <Box className="rds-e-signature__actions">
            <IconButton className="rds-e-signature__action-button" onClick={clearCanvas} disabled={state === 'disabled'} aria-label="undo">
              <Undo fontSize="small" />
            </IconButton>
    <IconButton className="rds-e-signature__action-button" disabled={state === 'disabled'} aria-label="save" onClick={handleSave}>
              <Save fontSize="small" />
            </IconButton>
            <IconButton className="rds-e-signature__action-button rds-e-signature__action-button--delete" disabled={state === 'disabled'} aria-label="delete">
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Paper>
      
    {showLengthError && (
        <Typography className="rds-e-signature__error" role="alert">
          Signature not clear. Please draw again.
        </Typography>
      )}
    </Box>
  );

  const renderUploadMode = () => (
    <Box className="rds-e-signature__upload-container">
      <Typography variant="h6" className="rds-e-signature__title">
        Upload Signature
        <span className="rds-e-signature__required">*</span>
      </Typography>
      
      <Paper className="rds-e-signature__upload-area" elevation={0}>
        <Box className="rds-e-signature__upload-content">
          <Typography className="rds-e-signature__upload-label">
            Title <span className="rds-e-signature__required">*</span>
          </Typography>
          <Box className="rds-e-signature__file-input-container">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="rds-e-signature__file-input"
              disabled={state === 'disabled'}
            />
            <button
              className="rds-e-signature__file-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={state === 'disabled'}
            >
              Choose File
            </button>
            <span className="rds-e-signature__file-text">
              {selectedFile ? selectedFile.name : 'No File Chosen'}
            </span>
          </Box>
          <Typography className="rds-e-signature__file-limit">
            Maximum 5MB
          </Typography>
        </Box>
      </Paper>
    </Box>
  );

  const renderChooseMode = () => (
    <Box className="rds-e-signature__choose-container">
      <Typography variant="h6" className="rds-e-signature__title">
        Choose Signature
        <span className="rds-e-signature__required">*</span>
      </Typography>
      
      <Box className="rds-e-signature__styles-grid">
        {predefinedSignatures.map((signature) => (
          <Paper
            key={signature.id}
            className={`rds-e-signature__style-card ${selectedStyle === signature.id ? 'rds-e-signature__style-card--selected' : ''}`}
            onClick={() => !state.includes('disabled') && handleStyleSelect(signature.id)}
            elevation={0}
          >
            <Typography className="rds-e-signature__style-name">
              {signature.name}
            </Typography>
            <Box className="rds-e-signature__style-preview">
              <Typography className={`rds-e-signature__signature-text rds-e-signature__signature-text--${signature.style}`}>
                {type === 'fullname' ? signature.fullName : signature.initials}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      
      <Box className="rds-e-signature__create-custom">
        <Typography className="rds-e-signature__create-link">
          ➕ Create your own signature
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      className={getStateClassName()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {mode === 'draw' && renderDrawMode()}
      {mode === 'upload' && renderUploadMode()}
      {mode === 'choose' && renderChooseMode()}
      
      {showDisabled && disableMessage && (
        <Typography className="rds-e-signature__disable-message">
          {disableText}
        </Typography>
      )}
    </Box>
  );
};

export default RdsCompESignature;
