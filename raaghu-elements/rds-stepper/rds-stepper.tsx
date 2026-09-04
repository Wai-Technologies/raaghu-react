import { type ReactNode } from 'react';
import './rds-stepper.scss';
import {
  Stepper as MuiStepper,
  Step as MuiStep,
  StepLabel as MuiStepLabel,
  StepContent as MuiStepContent,
  type StepperProps
} from '@mui/material';
import clsx from 'clsx';

export interface RdsStepperStep {
  label: string;
  content?: ReactNode;
  completed?: boolean;
  disabled?: boolean;
  optional?: boolean;
  error?: boolean;
}

export interface RdsStepperProps extends Omit<StepperProps, 'children' | 'variant' | 'component'> {
  steps: RdsStepperStep[];
  currentStep?: number;
  direction?: 'horizontal' | 'vertical';
  /** When true, step label text is visible; when false, only step icons are shown. */
  showContent?: boolean;
}

const RdsStepper = ({
  steps,
  currentStep = 0,
  direction = 'horizontal',
  showContent = true,
  activeStep,
  orientation,
  className,
  alternativeLabel,
  ...props
}: RdsStepperProps) => {
  const stepperActiveStep = activeStep !== undefined ? activeStep : currentStep;
  const stepperOrientation = orientation || (direction === 'vertical' ? 'vertical' : 'horizontal');
  const isVertical = stepperOrientation === 'vertical';
  const rootClassName = clsx(
    'rds-stepper',
    { 'rds-stepper--hide-labels': !showContent },
    className,
  );

  return (
    <MuiStepper
      activeStep={stepperActiveStep}
      orientation={stepperOrientation}
      className={rootClassName}
      {...(isVertical ? {} : { alternativeLabel })}
      {...props}
    >
      {steps.map((step) => (
        <MuiStep
          key={`${step.label}-${step.optional ? 'optional' : 'required'}`}
          completed={step.completed}
          disabled={step.disabled}
        >
          <MuiStepLabel
            optional={showContent && step.optional ? 'Optional' : undefined}
            error={step.error}
            aria-label={step.label}
          >
            {showContent ? step.label : null}
          </MuiStepLabel>
          {isVertical && step.content && (
            <MuiStepContent>
              {step.content}
            </MuiStepContent>
          )}
        </MuiStep>
      ))}
    </MuiStepper>
  );
};
RdsStepper.displayName = 'RdsStepper';
export default RdsStepper;
