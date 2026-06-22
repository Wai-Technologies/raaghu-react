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

export interface RdsStepperProps extends Omit<StepperProps, 'children' | 'variant'> {
  steps: RdsStepperStep[];
  currentStep?: number;
  direction?: 'horizontal' | 'vertical';
  showContent?: boolean;
}

const RdsStepper = ({
  steps,
  currentStep = 0,
  direction = 'horizontal',
  showContent = false,
  activeStep,
  orientation,
  className,
  alternativeLabel,
  ...props
}: RdsStepperProps) => {
  const stepperActiveStep = activeStep !== undefined ? activeStep : currentStep;
  const stepperOrientation = orientation || (direction === 'vertical' ? 'vertical' : 'horizontal');
  const rootClassName = clsx('rds-stepper', className);

  return (
    <MuiStepper
      activeStep={stepperActiveStep}
      orientation={stepperOrientation}
  className={rootClassName}
  {...(stepperOrientation === 'horizontal' ? { alternativeLabel } : {})}
  {...props}
    >
      {steps.map((step, index) => (
        <MuiStep
          key={`${step.label}-${step.optional ? 'optional' : 'required'}`}
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
