import { type ReactNode } from 'react';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-stepper.scss';
import {
  Stepper as MuiStepper,
  Step as MuiStep,
  StepLabel as MuiStepLabel,
  StepContent as MuiStepContent,
  type StepperProps
} from '@mui/material';
import clsx from 'clsx';

/** A step of the stepper. */
export interface RdsStepperStep {
  /** Step label (also used as the aria-label). */
  label: string;
  /** Content shown under the step when the stepper is vertical. */
  content?: ReactNode;
  /** Marks the step as completed. */
  completed?: boolean;
  /** Disables the step. */
  disabled?: boolean;
  /** `true` shows the 'Optional' caption; a node is rendered as the caption instead. */
  optional?: boolean | ReactNode;
  /** Shows the step in the error state. */
  error?: boolean;
}

export interface RdsStepperProps extends Omit<StepperProps, 'children' | 'variant' | 'component'> {
  /** Steps to render. */
  steps: RdsStepperStep[];
  /** @deprecated Use `activeStep` instead. */
  currentStep?: number;
  /** @deprecated Use `orientation` instead. */
  direction?: 'horizontal' | 'vertical';
  /** When true, step label text is visible; when false, only step icons are shown. */
  showContent?: boolean;
}

const RdsStepper = ({
  steps,
  currentStep,
  direction,
  showContent = true,
  activeStep,
  orientation,
  className,
  alternativeLabel,
  ...props
}: RdsStepperProps) => {
  if (currentStep !== undefined) warnDeprecatedProp('RdsStepper', 'currentStep', '`activeStep`');
  if (direction !== undefined) warnDeprecatedProp('RdsStepper', 'direction', '`orientation`');
  const stepperActiveStep = activeStep !== undefined ? activeStep : (currentStep ?? 0);
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
            optional={showContent && step.optional ? (step.optional === true ? 'Optional' : step.optional) : undefined}
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
