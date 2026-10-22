
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

// The stylesheet is keyed on the legacy class names, so map the new variant onto them.
const VARIANT_CLASS: Record<AccordionVariant, LegacyAccordionStyle> = {
  outlined: 'border',
  underline: 'bottomline',
  plain: 'borderhide',
};

export interface RdsAccordionProps
  extends Omit<AccordionProps, 'children' | 'component' | 'variant'> {
  title: string;
  children: ReactNode;
  /** Visual style of the accordion. Defaults to `'outlined'`. */
  variant?: AccordionVariant;
  /** Icon shown before the title. Pass `null` to hide it. Defaults to an "add" icon. */
  startIcon?: ReactNode;
  /** Icon used for the expand indicator. Defaults to a chevron. */
  expandIcon?: ReactNode;
  /** Highlights the accordion as selected. */
  selected?: boolean;
  defaultExpanded?: boolean;
  size?: 'small' | 'medium' | 'large';
  /** Duration of the expand/collapse animation in milliseconds. Defaults to MUI's automatic timing. */
  animationDuration?: number;
  /** @deprecated Use `startIcon={null}` to hide the icon. */
  ShowLeftIcon?: boolean;
  /** @deprecated Use `startIcon`. */
  changeleftIcon?: ReactNode;
  /** @deprecated Use `startIcon`. */
  icon?: ReactNode;
  /** @deprecated Use `variant` (`'outlined' | 'underline' | 'plain'`). */
  accordionStyle?: LegacyAccordionStyle;
}

const resolveStartIcon = (
  startIcon: ReactNode | undefined,
  ShowLeftIcon: boolean | undefined,
  changeleftIcon: ReactNode | undefined,
  icon: ReactNode | undefined,
): ReactNode => {
  if (startIcon !== undefined) return startIcon;
  if (ShowLeftIcon === false || changeleftIcon === null) return null;
  return changeleftIcon ?? icon ?? <AddIcon fontSize="small" />;
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
  ShowLeftIcon,
  changeleftIcon,
  icon,
  accordionStyle,
  className,
  slotProps,
  onChange,
  ...props
}: RdsAccordionProps) => {
  if (ShowLeftIcon !== undefined) {
    warnDeprecatedProp('RdsAccordion', 'ShowLeftIcon', '`startIcon={null}`');
  }
  if (changeleftIcon !== undefined) {
    warnDeprecatedProp('RdsAccordion', 'changeleftIcon', '`startIcon`');
  }
  if (icon !== undefined) {
    warnDeprecatedProp('RdsAccordion', 'icon', '`startIcon`');
  }
  if (accordionStyle !== undefined) {
    warnDeprecatedProp('RdsAccordion', 'accordionStyle', '`variant`');
  }

  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const isControlled = typeof props.expanded === 'boolean';
  const isExpanded = isControlled ? Boolean(props.expanded) : uncontrolledExpanded;
  const isDisabled = props.disabled;
  const styleClass = variant ? VARIANT_CLASS[variant] : accordionStyle ?? 'border';
  const resolvedStartIcon = resolveStartIcon(startIcon, ShowLeftIcon, changeleftIcon, icon);

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
    <div className={clsx('rds-accordion__container', `rds-accordion--${styleClass}`)}>
      <MuiAccordion
        {...props}
        expanded={isExpanded}
        onChange={handleChange}
        slotProps={mergedSlotProps}
        className={accordionClassName}
      >
        <MuiAccordionSummary
          expandIcon={expandIcon ?? <ExpandMoreIcon />}
          className="rds-accordion__summary"
        >
          <div className="rds-accordion__header">
            {resolvedStartIcon != null && resolvedStartIcon !== false && (
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
