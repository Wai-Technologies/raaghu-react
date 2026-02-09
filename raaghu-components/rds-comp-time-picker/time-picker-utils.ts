import { RdsTimePickerProps } from './rds-comp-time-picker';

export const getButtonClasses = (colorVariant?: string) => {
  const variant = colorVariant || 'primary';
  if (variant === 'light') {
    return {
      setTime: 'set-time bg-light text-dark',
      cancel: 'cancel border-none text-dark'
    };
  }
  return {
    setTime: `set-time bg-${variant} text-white`,
    cancel: `cancel border-none text-${variant}`
  };
};

export const getInputBorderClass = (colorVariant?: string) => {
  const variant = colorVariant || 'primary';
  return variant === 'light' ? 'border-dark' : `border-${variant}`;
};

export const getIconColor = (colorVariant?: string): "primary" | "default" | "inherit" | "secondary" | "error" | "info" | "success" | "warning" => {
  const allowedColors = [
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning"
  ] as const;
  
  const variant = colorVariant || 'primary';
  
  if (variant === 'light' || variant === 'dark') {
    return 'default';
  }
  
  if (allowedColors.includes(variant as any)) {
    return variant as typeof allowedColors[number];
  }
  
  return "primary";
};

export const getTextColor = (colorVariant?: string) => {
  const variant = colorVariant || 'primary';
  return variant === 'light' ? 'dark' : variant;
};

export const parseTimeFromValue = (timeValue: string) => {
  if (!timeValue) return { hours: 12, minutes: 0, period: 'AM' };

  const timeParts = timeValue.split(' ');
  
  if (timeParts.length === 2) {
    const [timeStr, ampm] = timeParts;
    const [hourStr, minuteStr] = timeStr.split(':');
    
    if (hourStr && minuteStr && ampm) {
      const hourVal = parseInt(hourStr, 10);
      const adjHourVal = hourVal === 0 ? 12 : hourVal;
      const minVal = parseInt(minuteStr, 10);
      
      return {
        hours: adjHourVal,
        minutes: minVal,
        period: ampm
      };
    }
  }
  
  return { hours: 12, minutes: 0, period: 'AM' };
};

export const getCurrentTime = () => {
  const now = new Date();
  let currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentPeriod = currentHours >= 12 ? 'PM' : 'AM';

  if (currentHours > 12) {
    currentHours -= 12;
  } else if (currentHours === 0) {
    currentHours = 12;
  }
  
  return { 
    hours: currentHours, 
    minutes: currentMinutes, 
    period: currentPeriod 
  };
};

export const formatTime = (hours: number, minutes: number, period: string) => {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
};
