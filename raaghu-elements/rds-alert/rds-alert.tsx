import React from 'react';
import { Alert as MuiAlert, type AlertProps, type AlertColor } from '@mui/material';
import { resolveAlertIcon, AlertContent, AlertActions } from './rds-alert.helpers';
import './rds-alert.scss';

export interface RdsAlertProps extends AlertProps {
  description?: string;
  type?: AlertColor;
  showIcon?: boolean;
  changeIconName?: React.ReactNode;
  title?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  size?: 'small' | 'medium' | 'large';
  multiline?: boolean;
  variantStyle?: 'style1' | 'style2' | 'style3';
  showLink?: boolean;
  showSecondary?: boolean;
  showPrimary?: boolean;
  showButtons?: boolean;
}

const RdsAlert = ({
  description,
  children,
  type = 'info',
  severity,
  showIcon = true,
  changeIconName,
  title = 'Heading Title.',
  showTitle = false,
  showDescription = true,
  size = 'medium',
  multiline = false,
  variantStyle = 'style1',
  showLink = true,
  showSecondary = true,
  showPrimary = true,
  showButtons = true,
  variant = 'standard',
  ...props
}: RdsAlertProps) => {
  const mainText =
    description !== undefined ? String(description) : typeof children === 'string' ? children : '';
  const sizeClass = `rds-alert--${size}`;
  const styleClass = `rds-alert--${variantStyle}`;
  const severityValue = severity || type;
  const severityClass = `rds-alert--${severityValue}`;
  const multilineClass = multiline ? 'rds-alert--multiline' : '';
  const iconNode = resolveAlertIcon(showIcon, changeIconName);

  return (
    <MuiAlert
      variant={variant}
      severity={severityValue}
      icon={iconNode}
      className={`rds-alert ${sizeClass} ${styleClass} ${severityClass} ${multilineClass}${props.className ? ` ${props.className}` : ''}`}
      {...props}
    >
      <div className="rds-alert__wrapper">
        <AlertContent
          multiline={multiline}
          showTitle={showTitle}
          showDescription={showDescription}
          title={title}
          mainText={mainText}
          children={children}
        />
        <AlertActions
          multiline={multiline}
          showButtons={showButtons}
          showLink={showLink}
          showSecondary={showSecondary}
          showPrimary={showPrimary}
          severityColor={severityValue}
        />
      </div>
    </MuiAlert>
  );
};

RdsAlert.displayName = 'RdsAlert';
export default RdsAlert;
