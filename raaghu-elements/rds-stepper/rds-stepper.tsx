import React from 'react';
import './rds-stepper.scss';
import {
  Stepper as MuiStepper,
  Step as MuiStep,
  StepLabel as MuiStepLabel,
  StepContent as MuiStepContent,
  StepperProps
} from '@mui/material';

export interface RdsStepperStep {
  label: string;
  content?: React.ReactNode;
  completed?: boolean;
  disabled?: boolean;
  optional?: boolean;
  error?: boolean;
}

export interface RdsStepperProps extends Omit<StepperProps, 'children' | 'variant'> {
  steps: RdsStepperStep[];
  currentStep?: number;
  direction?: 'horizontal' | 'vertical';
  showContent?: boolean;
}

const RdsStepper = React.forwardRef<HTMLDivElement, RdsStepperProps>(function RdsStepper({
  steps,
  currentStep = 0,
  direction = 'horizontal',
  showContent = false,
  activeStep,
  orientation,
  className,
  alternativeLabel,
  ...props
}, ref) {
  const stepperActiveStep = activeStep !== undefined ? activeStep : currentStep;
  const stepperOrientation = orientation || (direction === 'vertical' ? 'vertical' : 'horizontal');
  const isVertical = stepperOrientation === 'vertical';
  const rootClassName = [
    'rds-stepper',
    isVertical && alternativeLabel && 'rds-stepper--vertical-alternative-label',
    className,
  ].filter(Boolean).join(' ');
  const activeContent = !isVertical && showContent ? steps[stepperActiveStep]?.content : undefined;

  const hasWrapper = activeContent !== undefined && activeContent !== null;

  const stepper = (
    <MuiStepper
      ref={hasWrapper ? undefined : ref}
      activeStep={stepperActiveStep}
      orientation={stepperOrientation}
      className={rootClassName}
      {...(!isVertical ? { alternativeLabel } : {})}
      {...props}
    >
      {steps.map((step, index) => (
        <MuiStep
          key={step.label}
          completed={step.completed}
          disabled={step.disabled}
        >
          <MuiStepLabel
            optional={step.optional ? 'Optional' : undefined}
            error={step.error}
          >
            {step.label}
          </MuiStepLabel>
          {isVertical && showContent && step.content && (
            <MuiStepContent>
              {step.content}
            </MuiStepContent>
          )}
        </MuiStep>
      ))}
    </MuiStepper>
  );

  if (!hasWrapper) {
    return stepper;
  }

  return (
    <div ref={ref} className="rds-stepper__wrapper">
      {stepper}
      <div className="rds-stepper__content">{activeContent}</div>
    </div>
  );
});
RdsStepper.displayName = 'RdsStepper';
export default RdsStepper;
