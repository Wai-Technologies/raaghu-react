import { type ReactNode, type Ref, type HTMLAttributes } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import clsx from "clsx";
import "./rds-comp-app-shell.scss";

export interface RdsCompAppShellItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** Heading text shown above the item content. */
  title: string;
  children: ReactNode;
  /** Heading element used for the title. Defaults to `h2`. */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
  /** Ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompAppShellItem = ({
  title,
  children,
  headingLevel: Heading = 'h2',
  className,
  ...rest
}: RdsCompAppShellItemProps) => {
  return (
    <Box {...rest} className={clsx("rds-comp-app-shell-item", className)}>
      <Heading className="rds-comp-app-shell-item__header">{title}</Heading>
      <div className="rds-comp-app-shell-item__content">{children}</div>
    </Box>
  );
};

RdsCompAppShellItem.displayName = 'RdsCompAppShellItem';
export default RdsCompAppShellItem;
