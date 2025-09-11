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

const RdsStepper: React.FC<RdsStepperProps> = ({
  steps,
  currentStep = 0,
  direction = 'horizontal',
  showContent = false,
  activeStep,
  orientation,
  className,
  alternativeLabel,
  ...props
}) => {
  const stepperActiveStep = activeStep !== undefined ? activeStep : currentStep;
  const stepperOrientation = orientation || (direction === 'vertical' ? 'vertical' : 'horizontal');
  const rootClassName = ['rds-stepper', className].filter(Boolean).join(' ');

  return (
    <MuiStepper
      activeStep={stepperActiveStep}
      orientation={stepperOrientation}
  className={rootClassName}
  // Only pass `alternativeLabel` to MUI Stepper when orientation is horizontal.
  {...(stepperOrientation === 'horizontal' ? { alternativeLabel } : {})}
  {...props}
    >
      {steps.map((step, index) => (
        <MuiStep
          key={index}
          completed={step.completed}
          disabled={step.disabled}
        >
          <MuiStepLabel
            optional={step.optional ? 'Optional' : undefined}
            error={step.error}
          >
            {step.label}
          </MuiStepLabel>
          {showContent && step.content && (
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
