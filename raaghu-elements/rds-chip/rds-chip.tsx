import { Chip as MuiChip, type ChipProps } from '@mui/material';

export interface RdsChipProps extends Omit<ChipProps, 'component'> {}

const RdsChip = ({
  label,
  ...props
}: RdsChipProps) => {
  return (
    <MuiChip
      label={label}
      {...props}
    />
  );
};

RdsChip.displayName = 'RdsChip';
export default RdsChip;
