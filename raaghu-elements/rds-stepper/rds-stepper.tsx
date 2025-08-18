import React from 'react';
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
  ...props
}) => {
  const stepperActiveStep = activeStep !== undefined ? activeStep : currentStep;
  const stepperOrientation = orientation || (direction === 'vertical' ? 'vertical' : 'horizontal');

  return (
    <MuiStepper
      activeStep={stepperActiveStep}
      orientation={stepperOrientation}
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
