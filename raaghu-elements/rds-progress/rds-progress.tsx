import { Fragment, type CSSProperties, type ReactNode } from 'react';
import {
  LinearProgress as MuiLinearProgress,
  CircularProgress as MuiCircularProgress,
  Box,
  Typography,
  type SxProps
} from '@mui/material';
import clsx from 'clsx';
import './rds-progress.scss';

export interface RdsProgressProps {
  type?: 'linear' | 'circular';
  style?: 'circular' | 'line' | 'stepper' | 'dash' | 'block';
  value?: number;
  valueBuffer?: number;
  steps?: 0 | 1 | 2 | 3 | 4 | 5;
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: number;
  thickness?: number;
  showLabel?: boolean;
  label?: string;
  totalSteps?: number;
  stepperType?: 'number' | 'circle';
  sx?: CSSProperties;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

const RdsProgress = ({
  type = 'linear',
  style = 'line',
  value,
  valueBuffer,
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
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  ...props
}:RdsProgressProps) => {
  const getProgressValue = () => steps !== undefined && ['circular', 'line', 'stepper', 'dash', 'block'].includes(style) ? steps * 20 : value;

  const getColorValue = () => ({
    primary: 'var(--rds-color-primary)', secondary: 'var(--rds-color-secondary)', error: 'var(--rds-color-error)',
    info: 'var(--rds-color-info)', success: 'var(--rds-color-success)', warning: 'var(--rds-color-warning)',
  })[color] || 'var(--rds-color-primary)';

  const getBaseClasses = (styleType: string) =>
    clsx('rds-progress', `rds-progress--${styleType}`, `rds-progress--${color}`, variant === 'indeterminate' && 'rds-progress--indeterminate');

  const finalValue = getProgressValue();
  const colorValue = getColorValue();

  const renderWithLabel = (baseClasses: string, progressElement: ReactNode, labelPosition: 'overlay' | 'side') => {
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

  const renderCircular = () => renderWithLabel(getBaseClasses('circular'), <MuiCircularProgress variant={variant as 'determinate' | 'indeterminate'} value={finalValue} color={color} size={size} thickness={thickness} sx={sx} aria-label={label || 'Progress'} />, 'overlay');

  const renderLinear = () => renderWithLabel(getBaseClasses('line'), <MuiLinearProgress variant={variant as 'determinate' | 'indeterminate' | 'buffer' | 'query'} value={finalValue} valueBuffer={valueBuffer} color={color} sx={sx} aria-label={label || 'Progress'} />, 'side');

  const renderStepper = () => {
    const currentStep = Math.ceil(((finalValue || 0) / 100) * totalSteps);
    return (
      <div className={`rds-progress rds-progress--stepper rds-progress--${color}`}>
        <Box sx={{ display: 'flex', alignItems: 'center', ...sx }} className="rds-progress__stepper">
          {Array.from({ length: totalSteps }, (_, stepNumber) => stepNumber + 1).map((stepNumber) => {
            const isCompleted = stepNumber <= currentStep;
            const isCurrent = stepNumber === currentStep;
            const stepClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';
            const typeClass = stepperType === 'circle' ? 'rds-progress__stepper-step--circle' : 'rds-progress__stepper-step--number';
            return (
              <Fragment key={stepNumber}>
                <Box
                  className={`rds-progress__stepper-step ${typeClass} rds-progress__stepper-step--${stepClass}`}
                  sx={{ width: 'var(--rds-progress-step-size)', height: 'var(--rds-progress-step-size)' }}
                >
                  {stepperType === 'number' ? (
                    <Typography variant="body2" className="rds-progress__stepper-number" sx={{ fontWeight: 'var(--rds-font-weight-bold)', fontSize: 'var(--rds-font-size-sm)' }}>{stepNumber}</Typography>
                  ) : (
                    <span className="rds-progress__stepper-inner-dot" />
                  )}
                </Box>
                {stepNumber < totalSteps && (
                  <Box
                    className={`rds-progress__stepper-connector ${isCompleted ? 'rds-progress__stepper-connector--completed' : ''}`}
                      sx={{ width: 'var(--rds-progress-connector-width)', height: '2px' }}
                  />
                )}
              </Fragment>
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
            {Array.from({ length: count }, (_, segmentNumber) => segmentNumber + 1).map((segmentNumber) => {
              const getBorderRadius = () => {
                if (isDash) {
                  return 'var(--rds-border-radius-sm)';
                } else {
                  if (segmentNumber === 1) return 'var(--rds-border-radius-sm) 0 0 var(--rds-border-radius-sm)';
                  if (segmentNumber === count) return '0 var(--rds-border-radius-sm) var(--rds-border-radius-sm) 0';
                  return '0';
                }
              };

              return (
                <Box
                  key={segmentNumber}
                  className={`rds-progress__${type} ${segmentNumber <= filledCount ? `rds-progress__${type}--filled` : ''}`}
                  sx={{
                    width: isDash ? 'var(--rds-progress-dash-width)' : 'var(--rds-progress-block-width)', 
                    height: isDash ? 'var(--rds-progress-dash-height)' : 'var(--rds-progress-block-height)', 
                    backgroundColor: segmentNumber <= filledCount ? colorValue : 'var(--rds-color-gray-300)',
                    borderRadius: getBorderRadius(),
                    ...(isDash ? {} : { display: 'flex', alignItems: 'center', justifyContent: 'center', color: segmentNumber <= filledCount ? 'var(--rds-color-white)' : 'var(--rds-color-gray-600)', fontWeight: 'var(--rds-font-weight-bold)', fontSize: 'var(--rds-font-size-sm)' })
                  }}
                >
                  {!isDash && `Step ${segmentNumber}`}
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
