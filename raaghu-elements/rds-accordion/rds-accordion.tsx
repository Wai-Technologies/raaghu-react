
import { useState, type ReactNode, type SyntheticEvent } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  type AccordionProps,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-accordion.scss';

type AccordionVariant = 'outlined' | 'underline' | 'plain';
type LegacyAccordionStyle = 'border' | 'bottomline' | 'borderhide';

const VARIANT_CLASS: Record<AccordionVariant, LegacyAccordionStyle> = {
  outlined: 'border',
  underline: 'bottomline',
  plain: 'borderhide',
};

export interface RdsAccordionProps
  extends Omit<AccordionProps, 'children' | 'component' | 'variant'> {
  /** Heading text shown in the accordion summary. */
  title: string;
  children: ReactNode;
  /** Visual style of the accordion. Defaults to `'outlined'`. */
  variant?: AccordionVariant;
  /** Icon shown before the title. Pass `null` to hide it. Defaults to an "add" icon. */
  startIcon?: ReactNode;
  /** Icon used for the expand indicator. Pass `null` to hide it. Defaults to a chevron. */
  expandIcon?: ReactNode;
  /** Highlights the accordion as selected. */
  selected?: boolean;
  defaultExpanded?: boolean;
  /** Size of the accordion. @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** @deprecated Use `slotProps.transition.timeout` instead. */
  animationDuration?: number;
  /** Shows the leading icon. Defaults to `true`. */
  showLeftIcon?: boolean;
  /** Custom leading icon. */
  changeLeftIcon?: ReactNode;
  /** @deprecated Use `startIcon`. */
  icon?: ReactNode;
  /** @deprecated Use `variant` (`'outlined' | 'underline' | 'plain'`). */
  accordionStyle?: LegacyAccordionStyle;
}

const resolveStartIcon = (
  startIcon: ReactNode | undefined,
  showLeftIcon: boolean | undefined,
  changeLeftIcon: ReactNode | undefined,
  icon: ReactNode | undefined,
): ReactNode => {
  if (startIcon !== undefined) return startIcon;
  if (showLeftIcon === false || changeLeftIcon === null) return null;
  return changeLeftIcon ?? icon ?? <AddIcon fontSize="small" />;
};

const RdsAccordion = ({
  title,
  children,
  variant,
  startIcon,
  expandIcon,
  selected = false,
  defaultExpanded = false,
  size = 'medium',
  animationDuration,
  showLeftIcon,
  changeLeftIcon,
  icon,
  accordionStyle,
  className,
  slotProps,
  onChange,
  'data-testid': dataTestId,
  ...props
}: RdsAccordionProps) => {
  if (icon !== undefined) {
    warnDeprecatedProp('RdsAccordion', 'icon', '`startIcon`');
  }
  if (accordionStyle !== undefined) {
    warnDeprecatedProp('RdsAccordion', 'accordionStyle', '`variant`');
  }
  if (animationDuration !== undefined) {
    warnDeprecatedProp('RdsAccordion', 'animationDuration', '`slotProps.transition.timeout`');
  }

  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const isControlled = typeof props.expanded === 'boolean';
  const isExpanded = isControlled ? Boolean(props.expanded) : uncontrolledExpanded;
  const isDisabled = props.disabled;
  const styleClass = variant ? VARIANT_CLASS[variant] : accordionStyle ?? 'border';
  const resolvedStartIcon = resolveStartIcon(startIcon, showLeftIcon, changeLeftIcon, icon);

  const handleChange = (event: SyntheticEvent, expanded: boolean) => {
    if (!isControlled) setUncontrolledExpanded(expanded);
    onChange?.(event, expanded);
  };

  const accordionClassName = clsx(
    'rds-accordion',
    size && `rds-accordion--${size}`,
    `rds-accordion--${styleClass}`,
    isExpanded && 'rds-accordion--expanded',
    !isDisabled && selected && 'rds-accordion--selected',
    isDisabled && 'rds-accordion--disabled',
    className,
  );

  const mergedSlotProps =
    animationDuration === undefined
      ? slotProps
      : {
          ...slotProps,
          transition: {
            timeout: animationDuration,
            ...slotProps?.transition,
          },
        };

  return (
    <div
      className={clsx('rds-accordion__container', `rds-accordion--${styleClass}`)}
      data-testid={dataTestId}
    >
      <MuiAccordion
        {...props}
        expanded={isExpanded}
        onChange={handleChange}
        slotProps={mergedSlotProps}
        className={accordionClassName}
      >
        <MuiAccordionSummary
          expandIcon={expandIcon !== undefined ? expandIcon : <ExpandMoreIcon />}
          className="rds-accordion__summary"
        >
          <div className="rds-accordion__header">
            {resolvedStartIcon != null && (
              <span className="rds-accordion__icon">{resolvedStartIcon}</span>
            )}
            <Typography component="span" className="rds-accordion__title">
              {title}
            </Typography>
          </div>
        </MuiAccordionSummary>

        <MuiAccordionDetails className="rds-accordion__details">
          <div className="rds-accordion__details-panel">{children}</div>
        </MuiAccordionDetails>
      </MuiAccordion>
    </div>
  );
};

RdsAccordion.displayName = 'RdsAccordion';
export default RdsAccordion;
