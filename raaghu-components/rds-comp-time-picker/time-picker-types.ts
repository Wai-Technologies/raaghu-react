export interface RdsTimePickerProps {
  style?: 'default' | 'compact';
  colorVariant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  state?: 'default' | 'expanded' | 'selected';
  onChange?: (time: string) => void;
  value?: string;
  disabled?: boolean;
}
