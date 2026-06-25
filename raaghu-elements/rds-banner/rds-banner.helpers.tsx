import React from 'react';
import type { AlertProps, AlertColor } from '@mui/material';
import RdsButton from '../rds-button/rds-button';

export function resolveBannerMainText(description?: string, children?: React.ReactNode): string {
  if (description !== undefined) return String(description);
  return typeof children === 'string' ? children : '';
}

export function resolveBannerClasses(
  size: string,
  variantStyle: string,
  type: AlertColor,
  fullWidth: boolean,
  showOutline: boolean,
  className?: string
): string {
  const sizeClass = `rds-banner--${size}`;
  const styleClass = `rds-banner--${variantStyle}`;
  const severityClass = `rds-banner--${type}`;
  const widthClass = fullWidth ? 'rds-banner--full-width' : 'rds-banner--auto-width';
  let outlineClass = '';
  if (showOutline) {
    if (variantStyle === 'style1') outlineClass = 'rds-banner--style1-outline';
    if (variantStyle === 'style2') outlineClass = 'rds-banner--style2-outline';
  }
  return `rds-banner ${sizeClass} ${styleClass} ${severityClass} ${widthClass}${outlineClass ? ` ${outlineClass}` : ''}${className ? ` ${className}` : ''}`;
}

export function resolveBannerMuiVariant(
  variantStyle: string,
  variant?: AlertProps['variant']
): AlertProps['variant'] {
  if (variant) return variant;
  if (variantStyle === 'style2') return 'outlined';
  if (variantStyle === 'style3') return 'standard';
  return 'standard';
}

export interface BannerTextContentProps {
  multiline: boolean;
  showTitle: boolean;
  showDescription: boolean;
  title: string;
  mainText: string;
  children?: React.ReactNode;
}

export function BannerTextContent({
  multiline,
  showTitle,
  showDescription,
  title,
  mainText,
  children,
}: BannerTextContentProps) {
  return (
    <div className="rds-banner__text-content">
      {multiline ? (
        <div>
          {showTitle && (
            <strong className="rds-banner__heading rds-banner__heading--multiline">{title}</strong>
          )}
          {showDescription && <div className="rds-banner__description">{mainText}</div>}
        </div>
      ) : (
        <span>
          {showTitle && <strong className="rds-banner__heading">{title}</strong>}
          {showDescription && mainText}
        </span>
      )}
      {React.isValidElement(children) ? children : null}
    </div>
  );
}

export interface BannerActionButtonsProps {
  showLink: boolean;
  showSecondary: boolean;
  showPrimary: boolean;
}

export function BannerActionButtons({ showLink, showSecondary, showPrimary }: BannerActionButtonsProps) {
  if (!showLink && !showSecondary && !showPrimary) return null;

  return (
    <div className="rds-banner__actions">
      {showLink && <RdsButton size="small" className="rds-banner__link-button" text="Link" />}
      {showSecondary && <RdsButton size="small" className="rds-banner__secondary-button" text="Cancel" />}
      {showPrimary && (
        <RdsButton style="filled" size="small" className="rds-banner__primary-button" text="Okay" />
      )}
    </div>
  );
}
