
import clsx from "clsx";
import { memo, useMemo, type ComponentType, type KeyboardEvent, type MouseEventHandler, type SVGProps, type Ref, type ReactNode } from "react";
import "./rds-comp-ai-icon.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { resolveDeprecatedProp, warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import { normalizePaletteColor, type RaaghuPaletteColor } from "../../raaghu-elements/shared/utils/palette-color";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

/** Accepts MUI SvgIcon components and plain SVG React components. */
type RdsIconComponent = ComponentType<SVGProps<SVGSVGElement> & { fontSize?: string | number }>;

const defaultMaterialIcons: Record<string, RdsIconComponent> = {
  users: GroupOutlinedIcon,
  "person-outline": PersonOutlineIcon,
};

const materialIconsRegistry: Record<string, RdsIconComponent> = {
  ...defaultMaterialIcons,
};

export const registerMaterialIcon = (
  name: string,
  iconComponent: RdsIconComponent
) => {
  materialIconsRegistry[name.toLowerCase()] = iconComponent;
};

export const registerMaterialIcons = (
  icons: Record<string, RdsIconComponent>
) => {
  Object.entries(icons).forEach(([name, component]) => {
    materialIconsRegistry[name.toLowerCase()] = component;
  });
};

const createMuiIconWrapper = (
  MuiIcon: RdsIconComponent
): ComponentType<SVGProps<SVGSVGElement>> =>
  ({
    ref,
    color,
    fontSize,
    className,
    style,
    ...restProps
  }: SVGProps<SVGSVGElement> & { ref?: Ref<SVGSVGElement> }) => {
    const combinedStyle = {
      ...style,
      ...(color && { color }),
      ...(fontSize && { fontSize }),
    };

    return (
      <MuiIcon
        ref={ref}
        className={className}
        style={combinedStyle}
        {...restProps}
      />
    );
  };

const resolveIconComponent = (
  iconName: string,
  SvgIcon?: RdsIconComponent
): ComponentType<SVGProps<SVGSVGElement>> | null => {
  try {
    if (SvgIcon) return SvgIcon;

    if (iconName && materialIconsRegistry[iconName]) {
      return createMuiIconWrapper(materialIconsRegistry[iconName]);
    }

    return null;
  } catch {
    return null;
  }
};

export interface RdsCompAiIconProps
  extends Omit<
    SVGProps<SVGSVGElement>,
    | "ref"
    | "width"
    | "height"
    | "name"
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "onClick"
    | "opacity"
    | "id"
    | "type"
    | "className"
    | "children"
  > {
  /** Icon width as a CSS length. */
  width?: string;
  /** Icon height as a CSS length. */
  height?: string;
  /** Palette class (`rds-comp-ai-icon--{color}`). `danger` is normalized to `error`. */
  color?: RaaghuPaletteColor;
  /** @deprecated Use `color`. */
  colorVariant?: RaaghuPaletteColor;
  /** Registered icon name (case-insensitive) looked up in the Material icon registry. */
  name?: string;
  /** Fills the icon with `currentColor` when true, none when false. */
  fill?: boolean;
  /** Strokes the icon with `strokeColor` or `currentColor` when true, none when false. */
  stroke?: boolean;
  /** Stroke width of the icon as a CSS length. */
  strokeWidth?: string;
  /** @deprecated Has no effect. */
  borderRadius?: string;
  /** Click handler; also makes the icon keyboard-activatable with Enter/Space. */
  onClick?: MouseEventHandler<HTMLElement | SVGSVGElement> | null;
  /** @deprecated Has no effect. */
  opacity?: string;
  /** Has no effect. */
  animate?: boolean;
  /** @deprecated Use `animate` instead. */
  isAnimate?: boolean;
  /** @deprecated Use `className` instead. */
  classes?: string;
  /** Extra CSS class applied to the icon root. */
  className?: string;
  /** MUI system styles applied to the icon wrapper. */
  sx?: SxProps<Theme>;
  /** Ref to the root icon element. */
  ref?: Ref<Element>;
  /** @deprecated Use `data-testid` instead. */
  dataTestId?: string;
  /** @deprecated Use `data-bs-dismiss` instead. */
  databsdismiss?: string;
  /** @deprecated Use `data-bs-target` instead. */
  databstarget?: string;
  /** @deprecated Use `data-bs-toggle` instead. */
  databstoggle?: string;
  /** @deprecated Use `aria-controls` instead. */
  ariacontrols?: string;
  /** Image URL rendered when no icon component resolves. */
  src?: string;
  /** @deprecated Use `src` instead. */
  imageUrl?: string;
  /** DOM id applied to the icon element. */
  id?: string;
  /** @deprecated Has no effect. */
  iconPath?: ReactNode;
  /** @deprecated Has no effect. */
  type?: "icon" | "lottie";
  /** Has no effect. */
  hover?: boolean;
  /** @deprecated Use `hover` instead. */
  isHover?: boolean;
  /** Has no effect. */
  continuousAnimate?: boolean;
  /** @deprecated Use `continuousAnimate` instead. */
  isContinueAnimate?: boolean;
  /** Has no effect. */
  hovered?: boolean;
  /** @deprecated Use `hovered` instead. */
  isHovered?: boolean;
  /** Applies a pointer cursor to the icon. */
  cursorPointer?: boolean;
  /** @deprecated Use `cursorPointer` instead. */
  isCursorPointer?: boolean;
  /** Stroke color used when `stroke` is true. */
  strokeColor?: string;
  /** Preferred custom SVG icon component. */
  svgIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Custom SVG icon component; used when `svgIcon` is not provided. */
  component?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Icon alignment; `top-left` sets zero margin, otherwise it is centered with auto margin. */
  position?: "center" | "top-left" | "none";
  /** Test id forwarded to the icon element. */
  "data-testid"?: string;
  /** Forwarded to the icon as the `data-bs-dismiss` attribute. */
  "data-bs-dismiss"?: string;
  /** Forwarded to the icon as the `data-bs-target` attribute. */
  "data-bs-target"?: string;
  /** Forwarded to the icon as the `data-bs-toggle` attribute. */
  "data-bs-toggle"?: string;
  "aria-controls"?: string;
}

const RdsCompAiIconComponent = ({
  width,
  height,
  color,
  colorVariant,
  name,
  fill,
  stroke,
  strokeWidth,
  onClick,
  classes,
  className: classNameProp,
  sx,
  ref,
  dataTestId,
  databsdismiss,
  databstarget,
  databstoggle,
  ariacontrols,
  src,
  imageUrl,
  id,
  cursorPointer: cursorPointerProp,
  isCursorPointer,
  strokeColor,
  svgIcon,
  component,
  position,
  borderRadius,
  opacity,
  animate,
  isAnimate,
  iconPath,
  type,
  hover,
  isHover,
  continuousAnimate,
  isContinueAnimate,
  hovered,
  isHovered,
  "data-testid": dataTestIdAttr,
  "data-bs-dismiss": dataBsDismiss,
  "data-bs-target": dataBsTarget,
  "data-bs-toggle": dataBsToggle,
  "aria-controls": ariaControls,
  ...rest
}: RdsCompAiIconProps) => {
  const setRootRef = (element: Element | null) => {
    if (typeof ref === "function") {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };
  if (isAnimate !== undefined) warnDeprecatedProp("RdsCompAiIcon", "isAnimate", "`animate`");
  if (isHover !== undefined) warnDeprecatedProp("RdsCompAiIcon", "isHover", "`hover`");
  if (isContinueAnimate !== undefined) warnDeprecatedProp("RdsCompAiIcon", "isContinueAnimate", "`continuousAnimate`");
  if (isHovered !== undefined) warnDeprecatedProp("RdsCompAiIcon", "isHovered", "`hovered`");
  if (isCursorPointer !== undefined) warnDeprecatedProp("RdsCompAiIcon", "isCursorPointer", "`cursorPointer`");
  const cursorPointer = cursorPointerProp ?? isCursorPointer;
  const noEffect: Record<string, unknown> = { borderRadius, opacity, animate, iconPath, type, hover, continuousAnimate, hovered };
  Object.keys(noEffect).forEach((key) => {
    if (noEffect[key] !== undefined) warnDeprecatedProp("RdsCompAiIcon", key, "nothing (it has no effect)");
  });

  if (classes !== undefined) warnDeprecatedProp("RdsCompAiIcon", "classes", "`className`");
  if (dataTestId !== undefined) warnDeprecatedProp("RdsCompAiIcon", "dataTestId", "`data-testid`");
  if (databsdismiss !== undefined) warnDeprecatedProp("RdsCompAiIcon", "databsdismiss", "`data-bs-dismiss`");
  if (databstarget !== undefined) warnDeprecatedProp("RdsCompAiIcon", "databstarget", "`data-bs-target`");
  if (databstoggle !== undefined) warnDeprecatedProp("RdsCompAiIcon", "databstoggle", "`data-bs-toggle`");
  if (ariacontrols !== undefined) warnDeprecatedProp("RdsCompAiIcon", "ariacontrols", "`aria-controls`");
  if (imageUrl !== undefined) warnDeprecatedProp("RdsCompAiIcon", "imageUrl", "`src`");
  const resolvedSvgIcon = svgIcon ?? component;
  const imageSrc = src ?? imageUrl;

  const resolvedTestId = dataTestIdAttr ?? dataTestId;
  const resolvedDismiss = dataBsDismiss ?? databsdismiss;
  const resolvedTarget = dataBsTarget ?? databstarget;
  const resolvedToggle = dataBsToggle ?? databstoggle;
  const resolvedControls = ariaControls ?? ariacontrols;

  const normalizedName = name?.toLowerCase() ?? "";

  const IconComponent = useMemo(
    () => resolveIconComponent(normalizedName, resolvedSvgIcon),
    [normalizedName, resolvedSvgIcon]
  );

  const style = useMemo(
    () => ({
      height: height ?? "22px",
      width: width ?? "22px",
      strokeWidth: strokeWidth ?? "inherit",
      ...(fill !== undefined && { fill: fill ? "currentColor" : "none" }),
      ...(stroke !== undefined && {
        stroke: stroke ? strokeColor || "currentColor" : "none",
      }),
      ...(position === "center" && { margin: "auto" }),
      ...(position === "top-left" && { margin: "0" }),
      ...(!position && { margin: "auto" }),
    }),
    [height, width, strokeWidth, position, fill, stroke, strokeColor]
  );

  const resolvedColor = normalizePaletteColor(
    resolveDeprecatedProp(color, colorVariant, "RdsCompAiIcon", "colorVariant", "`color`"),
  );

  const className = clsx(
    "rds-comp-ai-icon",
    classNameProp ?? classes,
    cursorPointer && "rds-comp-ai-icon--cursor",
    resolvedColor && `rds-comp-ai-icon--${resolvedColor}`
  );

  if (IconComponent) {
    const Icon = IconComponent;

    const interactive = onClick
      ? {
          role: rest.role ?? "button",
          tabIndex: rest.tabIndex ?? 0,
          onKeyDown: (e: KeyboardEvent<SVGSVGElement>) => {
            rest.onKeyDown?.(e);

            if (e.defaultPrevented) return;

            if (e.key === "Enter" || e.key === " ") {
              if (e.key === " ") e.preventDefault();

              onClick(
                e as unknown as Parameters<
                  MouseEventHandler<SVGSVGElement>
                >[0]
              );
            }
          },
        }
      : {};

    return (
    

        <Icon
    {...rest}
    ref={setRootRef as Ref<SVGSVGElement>}
    className={clsx(className, "rds-comp-ai-icon__svg")}
    onClick={onClick || undefined}
    id={id}
    data-testid={resolvedTestId}
    style={style}
    data-bs-dismiss={resolvedDismiss}
    data-bs-target={resolvedTarget}
    data-bs-toggle={resolvedToggle}
    aria-controls={resolvedControls}
    fill={fill ? "currentColor" : "none"}
    stroke={stroke ? strokeColor || "currentColor" : "none"}
    {...interactive}
  />
    );
  }

  if (imageSrc) {
    const imageElement = (
      <Box
        component="img"
        {...(onClick ? {} : (rest as object))}
        ref={onClick ? undefined : setRootRef}
        src={imageSrc}
        alt=""
        className={clsx(className, "rds-comp-ai-icon__img")}
        id={id}
        data-testid={resolvedTestId}
        style={style}
        sx={onClick ? undefined : sx}
        data-bs-dismiss={resolvedDismiss}
        data-bs-target={resolvedTarget}
        data-bs-toggle={resolvedToggle}
        aria-controls={resolvedControls}
      />
    );

    if (onClick) {
      return (
        <Box
          component="button"
          {...(rest as object)}
          ref={setRootRef}
          type="button"
          className={clsx("rds-comp-ai-icon__button", classNameProp ?? classes)}
          onClick={onClick as MouseEventHandler<HTMLButtonElement>}
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            cursor: "pointer",
          }}
          sx={sx}
          data-bs-dismiss={resolvedDismiss}
          data-bs-target={resolvedTarget}
          data-bs-toggle={resolvedToggle}
          aria-controls={resolvedControls}
          aria-label={normalizedName || "icon button"}
        >
          {imageElement}
        </Box>
      );
    }

    return imageElement;
  }

  return null;
};

const RdsCompAiIcon = memo(RdsCompAiIconComponent);

RdsCompAiIcon.displayName = "RdsCompAiIcon";

export default RdsCompAiIcon;
