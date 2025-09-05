import React from 'react';
import {
  LinearProgress as MuiLinearProgress,
  CircularProgress as MuiCircularProgress,
  Box,
  Typography
} from '@mui/material';
import './rds-progress.scss';

export interface RdsProgressProps {
  type?: 'linear' | 'circular';
  style?: 'circular' | 'line' | 'stepper' | 'dash' | 'block';
  value?: number;
  steps?: 0 | 1 | 2 | 3 | 4 | 5;
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: number;
  thickness?: number;
  showLabel?: boolean;
  label?: string;
  totalSteps?: number;
  stepperType?: 'number' | 'circle';
  sx?: any;
}

const RdsProgress = ({
  type = 'linear',
  style = 'line',
  value,
  steps,
  variant = 'indeterminate',
  color = 'primary',
  size = 50,
  thickness = 3.6,
  showLabel = false,
  label,
  totalSteps = 5,
  stepperType = 'number',
  sx,
  ...props
}:RdsProgressProps) => {
  const getProgressValue = () => steps !== undefined && ['circular', 'line', 'stepper', 'dash', 'block'].includes(style) ? steps * 20 : value;

  const getColorValue = () => ({
    primary: 'var(--rds-color-primary, #1976d2)', secondary: 'var(--rds-color-secondary, #dc004e)', error: 'var(--rds-color-error, #d32f2f)',
    info: 'var(--rds-color-info, #0288d1)', success: 'var(--rds-color-success, #2e7d32)', warning: 'var(--rds-color-warning, #ed6c02)',
  })[color] || 'var(--rds-color-primary, #1976d2)';

  const getBaseClasses = (styleType: string) => `rds-progress rds-progress--${styleType} rds-progress--${color}${variant === 'indeterminate' ? ' rds-progress--indeterminate' : ''}`;

  const finalValue = getProgressValue();
  const colorValue = getColorValue();

  const renderWithLabel = (baseClasses: string, progressElement: React.ReactNode, labelPosition: 'overlay' | 'side') => {
    if (!showLabel || variant !== 'determinate') return <div className={baseClasses}>{progressElement}</div>;
    
    const labelElement = <Typography variant={labelPosition === 'overlay' ? 'caption' : 'body2'} component="div" color="text.secondary" className="rds-progress__label">{label || `${Math.round(finalValue || 0)}%`}</Typography>;
    
    return labelPosition === 'overlay' ? (
      <div className={baseClasses}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          {progressElement}
          <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {labelElement}
          </Box>
        </Box>
      </div>
    ) : (
      <div className={baseClasses}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }} className="rds-progress__bar">{progressElement}</Box>
          <Box sx={{ minWidth: 35 }}>{labelElement}</Box>
        </Box>
      </div>
    );
  };

  const renderCircular = () => renderWithLabel(getBaseClasses('circular'), <MuiCircularProgress variant={variant as any} value={finalValue} color={color} size={size} thickness={thickness} sx={sx} />, 'overlay');

  const renderLinear = () => renderWithLabel(getBaseClasses('line'), <MuiLinearProgress variant={variant as any} value={finalValue} color={color} sx={sx} />, 'side');

  const renderStepper = () => {
    const currentStep = Math.ceil(((finalValue || 0) / 100) * totalSteps);
  const isDark = typeof document !== 'undefined' && (document.documentElement.getAttribute('data-theme') === 'dark' || document.body.classList.contains('theme-dark'));
    return (
      <div className={`rds-progress rds-progress--stepper rds-progress--${color}`}>
        <Box sx={{ display: 'flex', alignItems: 'center', ...sx }} className="rds-progress__stepper">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep - 1;
            const stepClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';
            const typeClass = stepperType === 'circle' ? 'rds-progress__stepper-step--circle' : 'rds-progress__stepper-step--number';
            return (
              <React.Fragment key={index}>
                <Box
                  className={`rds-progress__stepper-step ${typeClass} rds-progress__stepper-step--${stepClass}`}
                  sx={{ width: 40, height: 40 }}
                >
                  {stepperType === 'number' ? (
                    <Typography variant="body2" className="rds-progress__stepper-number" sx={{ fontWeight: 600, fontSize: '14px' }}>{stepNumber}</Typography>
                  ) : (
                    <span className="rds-progress__stepper-inner-dot" />
                  )}
                </Box>
                {index < totalSteps - 1 && (
                  <Box
                    className={`rds-progress__stepper-connector ${isCompleted ? 'rds-progress__stepper-connector--completed' : ''}`}
                    sx={{ width: 60, height: 2 }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </div>
    );
  };

  const renderSegmented = (type: 'dash' | 'block') => {
    const count = 5;
    const filledCount = Math.ceil(((finalValue || 0) / 100) * count);
    const isDash = type === 'dash';
    
    return (
      <div className={`rds-progress rds-progress--${type} rds-progress--${color}`}>
        <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
          <Box sx={{ display: 'flex', gap: isDash ? 0.5 : 0, alignItems: 'center' }}>
            {Array.from({ length: count }, (_, index) => {
              // Calculate border radius for dash and block styles
              const getBorderRadius = () => {
                if (isDash) {
                  // For dash style: all dashes should have rounded corners
                  return 'var(--rds-border-radius-sm, 4px)';
                } else {
                  // For block style: round outer corners only
                  if (index === 0) return '4px 0 0 4px'; // First block: left corners rounded
                  if (index === count - 1) return '0 4px 4px 0'; // Last block: right corners rounded
                  return '0'; // Middle blocks: no rounding
                }
              };

              return (
                <Box
                  key={index}
                  className={`rds-progress__${type} ${index < filledCount ? `rds-progress__${type}--filled` : ''}`}
                  sx={{
                    width: isDash ? 50 : 80, 
                    height: isDash ? 5 : 40, 
                    backgroundColor: index < filledCount ? colorValue : 'var(--rds-color-gray-300, #e0e0e0)',
                    borderRadius: getBorderRadius(),
                    ...(isDash ? {} : { display: 'flex', alignItems: 'center', justifyContent: 'center', color: index < filledCount ? 'white' : 'var(--rds-color-gray-600, #666)', fontWeight: 'bold', fontSize: '14px' })
                  }}
                >
                  {!isDash && `Step ${index + 1}`}
                </Box>
              );
            })}
          </Box>
        </Box>
      </div>
    );
  };

  switch (style) {
    case 'circular': return renderCircular();
    case 'line': return renderLinear();
    case 'stepper': return renderStepper();
    case 'dash': return renderSegmented('dash');
    case 'block': return renderSegmented('block');
    default: return renderLinear();
  }
};
RdsProgress.displayName = 'RdsProgress';
export default RdsProgress;
