
import clsx from 'clsx';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { useEffect, useState } from 'react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { useTheme } from '@mui/material/styles';
import { getCSSVar } from '../chart-utils';
import { WorldMap } from 'react-svg-worldmap';
import type { CountryContext, Data } from 'react-svg-worldmap';
import './rds-comp-map.scss';
import { componentTokens, mapTokens } from '../../raaghu-react-themes/tokens/design-tokens';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';

/** Theme palette keys that `color` resolves to `theme.palette[color].main`. */
export type RdsCompMapPaletteColor =
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success';

export interface RdsCompMapProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color' | 'children'> {
    /** Heading text shown above the map. Passing anything other than a string is deprecated; use `header`. */
    title?: string | ReactNode;
    /** Rich heading content shown above the map; wins over `title`. */
    header?: ReactNode;
    /** Values per country (ISO 3166-1 alpha-2 code). */
    data?: Array<{ country: string; value: number }>;
    /** @deprecated Use `data` instead. */
    mapList?: Array<{ country: string; value: number }>;
    /** Fill colour for the default variant: a CSS colour or a theme palette key. */
    color: RdsCompMapPaletteColor | (string & {});
    /** Visual style of the map. */
    variant?: 'default' | 'heatmap';
    /** @deprecated Use `variant` instead. */
    mapType?: 'default' | 'heatmap';
    /** Country codes filled with the info colour in the default variant. */
    highlightedCountries?: string[];
    /** Text appended to values in the tooltip. */
    valueSuffix?: string;
    /** MUI system styles applied to the root element. */
    sx?: SxProps<Theme>;
    ref?: Ref<HTMLDivElement>;
}

type MapSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'responsive' | undefined;

const PALETTE_KEYS: readonly string[] = [
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
];

const getMapSize = (): MapSize => {
    if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width <= 414) return 'responsive';
        if (width <= 768) return 'md';
        return 'lg';
    }
    return 'responsive';
};

const HEX6 = /^#?[0-9a-f]{6}$/i;

const hexToRgb = (hex: string): [number, number, number] => {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const interpolateColor = (t: number, palette: string[]) => {
    if (t <= 0) return palette[0];
    if (t >= 1) return palette[palette.length - 1];

    const scaled = t * (palette.length - 1);
    const idx = Math.floor(scaled);
    const frac = scaled - idx;

    if (!HEX6.test(palette[idx]) || !HEX6.test(palette[idx + 1])) {
        return frac < 0.5 ? palette[idx] : palette[idx + 1];
    }

    const a = hexToRgb(palette[idx]);
    const b = hexToRgb(palette[idx + 1]);
    const r = a[0] + (b[0] - a[0]) * frac;
    const g = a[1] + (b[1] - a[1]) * frac;
    const bl = a[2] + (b[2] - a[2]) * frac;

    return rgbToHex(r, g, bl);
};

const heatMapPalette: string[] =
    componentTokens.map?.heatmapPalette || Object.values(mapTokens.heatmap);

const RdsCompMap = (props: RdsCompMapProps) => {
    const {
        variant,
        mapType,
        color,
        data,
        mapList,
        title,
        header,
        highlightedCountries,
        valueSuffix = '',
        className,
        sx,
        ref,
        ...rest
    } = props;

    if (mapList !== undefined) {
        warnDeprecatedProp('RdsCompMap', 'mapList', '`data`');
    }

    if (title !== undefined && typeof title !== 'string') {
        warnDeprecatedProp('RdsCompMap', 'title (non-string)', '`header`');
    }

    if (mapType !== undefined) {
        warnDeprecatedProp('RdsCompMap', 'mapType', '`variant`');
    }

    const theme = useTheme();
    const resolvedVariant = variant ?? mapType ?? 'default';
    const resolvedData = (data ?? mapList ?? []) as Data;

    const resolvedColor = PALETTE_KEYS.includes(color)
        ? theme.palette[color as RdsCompMapPaletteColor].main
        : color;

    const defaultStylingFunction = (context: CountryContext) => {
        const range = context.maxValue - context.minValue;
        const normalizedValue =
            range > 0
                ? ((context.countryValue as number) - context.minValue) / range
                : 0;

        const opacityLevel = Math.min(1, 0.1 + 1.5 * normalizedValue);

        const isHighlighted = highlightedCountries?.some(
            (code) => code.toUpperCase() === context.countryCode.toUpperCase()
        );

        return {
            fill: isHighlighted ? getCSSVar('--rds-info-main') : resolvedColor,
            fillOpacity: opacityLevel,
            stroke: getCSSVar('--rds-success-main'),
            strokeWidth: 1,
            strokeOpacity: 0.2,
            cursor: 'pointer',
        };
    };

    const heatMapStylingFunction = (context: CountryContext) => {
        const intensity =
            ((context.countryValue as number) - context.minValue) /
                (context.maxValue - context.minValue) || 0;

        const mappedColor = interpolateColor(intensity, heatMapPalette);

        return {
            fill: mappedColor,
            fillOpacity: 0.7 + 0.3 * intensity,
            stroke: 'var(--rds-border-dark)',
            strokeWidth: 0.5,
            strokeOpacity: 0.7,
            cursor: 'pointer',
        };
    };

    const stylingFunction =
        resolvedVariant === 'heatmap'
            ? heatMapStylingFunction
            : defaultStylingFunction;

    const [mapSize, setMapSize] = useState<MapSize>(() => getMapSize());

    useEffect(() => {
        const handleResize = () => {
            setMapSize(getMapSize());
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <Box
            {...rest}
            ref={ref}
            className={clsx(
                'rds-comp-map',
                resolvedVariant === 'heatmap' && 'rds-comp-map--heatmap',
                className
            )}
            sx={sx}
        >
            {(header ?? title) && (
                <div className="rds-comp-map__label">{header ?? title}</div>
            )}

            <div className="rds-comp-map__center">
                <div className="rds-comp-map__worldmap-host">
                    <WorldMap
                        styleFunction={stylingFunction}
                        color={resolvedColor}
                        backgroundColor="transparent"
                        title=""
                        valueSuffix={valueSuffix}
                        size={mapSize}
                        data={resolvedData}
                    />
                </div>
            </div>
        </Box>
    );
};

RdsCompMap.displayName = 'RdsCompMap';

export default RdsCompMap;
