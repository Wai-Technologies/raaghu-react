
import React from 'react';
import { type DialogProps } from '@mui/material';
import { StandardRdsDialog, DefaultRdsDialog } from './rds-dialog.helpers';
import './rds-dialog.scss';

export interface RdsDialogProps extends DialogProps {
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  ShowDissmiss?: boolean;
  onClose?: () => void;
  variant?: 'standard' | 'default';
  ShowPrimary?: boolean;
  ShowSecondary?: boolean;
  showTitle?: boolean;
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | false;
}

const RdsDialog = ({
  title,
  children,
  actions,
  ShowDissmiss = true,
  onClose,
  variant = 'default',
  ShowPrimary,
  ShowSecondary,
  showTitle = true,
  size = 'medium',
  ...props
}: RdsDialogProps) => {
  if (variant === 'standard') {
    return (
      <StandardRdsDialog
        title={title}
        ShowDissmiss={ShowDissmiss}
        onClose={onClose}
        ShowPrimary={ShowPrimary}
        ShowSecondary={ShowSecondary}
        showTitle={showTitle}
        size={size}
        {...props}
      >
        {children}
      </StandardRdsDialog>
    );
  }

  return (
    <DefaultRdsDialog
      title={title}
      actions={actions}
      ShowDissmiss={ShowDissmiss}
      onClose={onClose}
      showTitle={showTitle}
      size={size}
      {...props}
    >
      {children}
    </DefaultRdsDialog>
  );
};
RdsDialog.displayName = 'RdsDialog';
export default RdsDialog;
