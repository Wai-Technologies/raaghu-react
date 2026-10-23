import { Fragment, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import {
  LinearProgress as MuiLinearProgress,
  CircularProgress as MuiCircularProgress,
  Box,
  Typography,
  type SxProps,
  type Theme
} from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-progress.scss';

export interface RdsProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'color' | 'className'> {
  className?: string;
  /** @deprecated Has no effect; rendering is chosen by style. */
  type?: 'linear' | 'circular';
  /** Figma variant that selects the rendering: circular, line, stepper, dash or block. */
  style?: 'circular' | 'line' | 'stepper' | 'dash' | 'block';
  value?: number;
  valueBuffer?: number;
  /** Completed steps; progress becomes `steps / totalSteps * 100` for every style. */
  steps?: 0 | 1 | 2 | 3 | 4 | 5;
  mode?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  /** @deprecated Use `mode` instead. */
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: number;
  thickness?: number;
  showLabel?: boolean;
  label?: string;
  /** Number of steps (stepper) or segments (dash/block). Defaults to 5. */
  totalSteps?: number;
  /** Marker inside each stepper step. */
  stepIcon?: 'number' | 'dot';
  /** Figma variant; `circle` renders dots like `stepIcon="dot"`. */
  stepperType?: 'number' | 'circle';
  sx?: SxProps<Theme>;
  /** Ref to the root element. */
  ref?: Ref<HTMLDivElement>;
  /** Custom content for each block segment; defaults to `Step n`. */
  formatStepLabel?: (step: number) => ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

const RdsProgress = ({
  type,
  style = 'line',
  value,
  valueBuffer,
  steps,
  mode,
  variant,
  color = 'primary',
  size = 50,
  thickness = 3.6,
  showLabel = false,
  label,
  totalSteps = 5,
  stepIcon,
  stepperType = 'number',
  sx,
  ref,
  formatStepLabel,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  ...props
}:RdsProgressProps) => {
  if (type !== undefined) warnDeprecatedProp('RdsProgress', 'type', '`style`');
  if (variant !== undefined) warnDeprecatedProp('RdsProgress', 'variant', '`mode`');
  const resolvedMode = mode ?? variant ?? 'indeterminate';
  const isDot = stepIcon ? stepIcon === 'dot' : stepperType === 'circle';
  const hasSteps = steps !== undefined && ['circular', 'line', 'stepper', 'dash', 'block'].includes(style);
  const getProgressValue = () => hasSteps ? (steps as number) / totalSteps * 100 : value;
  const filledOf = (total: number) => hasSteps ? Math.ceil((steps as number) / totalSteps * total) : Math.ceil(((finalValue || 0) / 100) * total);
  const sxArray = Array.isArray(sx) ? sx : [sx];
  const resolvedAriaLabel = ariaLabel ?? (label || 'Progress');

  const getColorValue = () => ({
    primary: 'var(--rds-color-primary)', secondary: 'var(--rds-color-secondary)', error: 'var(--rds-color-error)',
    info: 'var(--rds-color-info)', success: 'var(--rds-color-success)', warning: 'var(--rds-color-warning)',
  })[color] || 'var(--rds-color-primary)';

  const getBaseClasses = (styleType: string) =>
    clsx('rds-progress', `rds-progress--${styleType}`, `rds-progress--${color}`, resolvedMode === 'indeterminate' && 'rds-progress--indeterminate');

  const finalValue = getProgressValue();
  const colorValue = getColorValue();
  const progressAria = {
    role: 'progressbar',
    'aria-valuenow': Math.round(finalValue || 0),
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-label': resolvedAriaLabel,
    'aria-labelledby': ariaLabelledby,
  };

  const renderWithLabel = (baseClasses: string, progressElement: ReactNode, labelPosition: 'overlay' | 'side') => {
    if (!showLabel || resolvedMode !== 'determinate') return <Box {...props} ref={ref} className={clsx(baseClasses, className)} sx={sx}>{progressElement}</Box>;
    
    const labelElement = <Typography variant={labelPosition === 'overlay' ? 'caption' : 'body2'} component="div" color="text.secondary" className="rds-progress__label">{label || `${Math.round(finalValue || 0)}%`}</Typography>;
    
    return labelPosition === 'overlay' ? (
      <Box {...props} ref={ref} className={clsx(baseClasses, className)} sx={sx}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          {progressElement}
          <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {labelElement}
          </Box>
        </Box>
      </Box>
    ) : (
      <Box {...props} ref={ref} className={clsx(baseClasses, className)} sx={sx}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }} className="rds-progress__bar">{progressElement}</Box>
          <Box sx={{ minWidth: 35 }}>{labelElement}</Box>
        </Box>
      </Box>
    );
  };

  const renderCircular = () => renderWithLabel(getBaseClasses('circular'), <MuiCircularProgress variant={resolvedMode as 'determinate' | 'indeterminate'} value={finalValue} color={color} size={size} thickness={thickness} sx={sx} aria-label={resolvedAriaLabel} aria-labelledby={ariaLabelledby} />, 'overlay');

  const renderLinear = () => renderWithLabel(getBaseClasses('line'), <MuiLinearProgress variant={resolvedMode as 'determinate' | 'indeterminate' | 'buffer' | 'query'} value={finalValue} valueBuffer={valueBuffer} color={color} sx={sx} aria-label={resolvedAriaLabel} aria-labelledby={ariaLabelledby} />, 'side');

  const renderStepper = () => {
    const currentStep = filledOf(totalSteps);
    return (
      <Box {...props} ref={ref} className={clsx('rds-progress', 'rds-progress--stepper', `rds-progress--${color}`, className)} sx={sx}>
        <Box sx={[{ display: 'flex', alignItems: 'center' }, ...sxArray]} className="rds-progress__stepper" {...progressAria}>
          {Array.from({ length: totalSteps }, (_, stepNumber) => stepNumber + 1).map((stepNumber) => {
            const isCompleted = stepNumber <= currentStep;
            const isCurrent = stepNumber === currentStep;
            const stepClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';
            const typeClass = isDot ? 'rds-progress__stepper-step--circle' : 'rds-progress__stepper-step--number';
            return (
              <Fragment key={stepNumber}>
                <Box
                  className={`rds-progress__stepper-step ${typeClass} rds-progress__stepper-step--${stepClass}`}
                  sx={{ width: 'var(--rds-progress-step-size)', height: 'var(--rds-progress-step-size)' }}
                >
                  {!isDot ? (
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
      </Box>
    );
  };

  const renderSegmented = (type: 'dash' | 'block') => {
    const count = totalSteps;
    const filledCount = filledOf(count);
    const isDash = type === 'dash';
    
    return (
      <Box {...props} ref={ref} className={clsx('rds-progress', `rds-progress--${type}`, `rds-progress--${color}`, className)} sx={sx}>
        <Box sx={[{ display: 'flex', alignItems: 'center' }, ...sxArray]} {...progressAria}>
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
                  {!isDash && (formatStepLabel?.(segmentNumber) ?? `Step ${segmentNumber}`)}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
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
