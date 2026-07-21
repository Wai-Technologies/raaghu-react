import type { SliderProps } from '@mui/material/Slider';

type SliderMarks = NonNullable<SliderProps['marks']>;

export function resolveSliderStep(
  step: number | undefined | null,
  min: number,
  safeMax: number
): number {
  if (step !== undefined && step !== null && step > 0) return step;
  const range = safeMax - min;
  if (range <= 10) return 1;
  if (range <= 100) return 10;
  return Math.ceil(range / 10);
}

export function shouldDisableMarks(
  marks: SliderMarks | undefined,
  min: number,
  safeMax: number
): boolean {
  return marks === true && (typeof min !== 'number' || typeof safeMax !== 'number' || safeMax <= min);
}

export function capSliderStepForMarks(
  sliderStep: number,
  min: number,
  safeMax: number
): number {
  const numberOfMarks = Math.floor((safeMax - min) / sliderStep) + 1;
  if (numberOfMarks > 100) {
    return Math.ceil((safeMax - min) / 20);
  }
  return sliderStep;
}

export function getInitialSliderValue(
  value: number | number[] | undefined,
  defaultValue: number | number[] | undefined,
  isRangeSlider: boolean,
  min: number,
  safeMax: number
): number | number[] {
  if (value !== undefined) return value;
  if (defaultValue !== undefined) return defaultValue as number | number[];
  if (isRangeSlider) {
    const midPoint = min + (safeMax - min) * 0.5;
    const range = (safeMax - min) * 0.2;
    return [midPoint - range / 2, midPoint + range / 2];
  }
  return min + (safeMax - min) * 0.3;
}

export function hasExternalValueChanged(
  value: number | number[] | undefined,
  sliderValue: number | number[]
): boolean {
  if (value === undefined) return false;
  if (Array.isArray(value) && Array.isArray(sliderValue)) {
    if (value.length !== sliderValue.length) return true;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== sliderValue[i]) return true;
    }
    return false;
  }
  return value !== sliderValue;
}

export function getLevelBasedSliderValue(
  level: number,
  isRangeSlider: boolean,
  min: number,
  safeMax: number
): number | number[] {
  const percent = (level - 1) * 25;
  const calculated = min + ((safeMax - min) * percent) / 100;
  if (isRangeSlider) {
    const range = (safeMax - min) * 0.1;
    const lowerValue = Math.max(min, calculated - range);
    const upperValue = Math.min(safeMax, calculated + range);
    return [lowerValue, upperValue];
  }
  return calculated;
}

export function normalizeRangeSliderValue(
  sliderValue: number | number[],
  isRangeSlider: boolean,
  min: number,
  safeMax: number
): number | number[] | null {
  if (isRangeSlider && !Array.isArray(sliderValue)) {
    const currentVal = typeof sliderValue === 'number' ? sliderValue : min;
    const range = (safeMax - min) * 0.2;
    const lowerValue = Math.max(min, currentVal - range / 2);
    const upperValue = Math.min(safeMax, currentVal + range / 2);
    return [lowerValue, upperValue];
  }
  if (!isRangeSlider && Array.isArray(sliderValue)) {
    return (sliderValue[0] + sliderValue[1]) / 2;
  }
  return null;
}

export function formatSliderValue(val: number | number[], unit?: string): string {
  const suffix = typeof unit === 'string' ? unit : '';
  if (Array.isArray(val)) {
    return `${val[0]}${suffix} - ${val[1]}${suffix}`;
  }
  return `${val}${suffix}`;
}

export function resolveSliderMarksAndStep(
  marks: SliderMarks | undefined,
  step: number | undefined | null,
  min: number,
  safeMax: number
): { sliderStep: number | undefined; sliderMarks: SliderMarks | undefined } {
  let sliderStep = step ?? undefined;
  let sliderMarks = marks;

  if (shouldDisableMarks(sliderMarks, min, safeMax)) {
    return { sliderStep, sliderMarks: false };
  }

  if (sliderMarks === true) {
    sliderStep = resolveSliderStep(sliderStep, min, safeMax);
    sliderStep = capSliderStepForMarks(sliderStep, min, safeMax);
  }

  return { sliderStep, sliderMarks };
}
