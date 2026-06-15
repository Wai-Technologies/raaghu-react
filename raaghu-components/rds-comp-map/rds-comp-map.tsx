import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCSSVar } from '../chart-utils';
import { WorldMap } from 'react-svg-worldmap';
import './rds-comp-map.scss';
import { componentTokens, mapTokens } from '../../raaghu-react-themes/tokens/design-tokens';

export interface RdsCompMapProps {
    title?: React.ReactNode,
    mapList: Array<{ country: string; value: number }>,
    color: string,
    mapType?: 'default' | 'heatmap'
}

type MapSize = "sm" | "md" | "lg" | "xl" | "xxl" | "responsive" | undefined;

interface MapStyleContext {
    countryValue: number;
    minValue: number;
    maxValue: number;
    country: string;
}

const getMapSize = (): MapSize => {
    if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width <= 320) return 'responsive';
        if (width <= 414) return 'responsive';
        if (width <= 768) return 'md';
        return 'lg';
    }
    return 'responsive';
};

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

    const a = hexToRgb(palette[idx]);
    const b = hexToRgb(palette[idx + 1]);
    const r = a[0] + (b[0] - a[0]) * frac;
    const g = a[1] + (b[1] - a[1]) * frac;
    const bl = a[2] + (b[2] - a[2]) * frac;
    return rgbToHex(r, g, bl);
};

const RdsCompMap = (props: RdsCompMapProps) => {
    const { mapType = 'default', color, mapList, title } = props;

    const heatMapPalette = useMemo(
        () => (componentTokens.map?.heatmapPalette || Object.values(mapTokens.heatmap)),
        []
    );

    const defaultStylingFunction = useCallback((context: MapStyleContext) => {
        const opacityLevel = 0.1 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))
        const highlightFill = getCSSVar('--rds-info-main');
        const strokeColor = getCSSVar('--rds-success-main');
        return {
            fill: context.country === "US" ? highlightFill : color,
            fillOpacity: opacityLevel,
            stroke: strokeColor,
            strokeWidth: 1,
            strokeOpacity: 0.2,
            cursor: "pointer"
        }
    }, [color]);

    const heatMapStylingFunction = useCallback((context: MapStyleContext) => {
        const intensity = (context.countryValue - context.minValue) / (context.maxValue - context.minValue) || 0;
        const mappedColor = interpolateColor(intensity, heatMapPalette as string[]);
        return {
            fill: mappedColor,
            fillOpacity: 0.7 + (0.3 * intensity),
            stroke: 'var(--rds-border-dark)',
            strokeWidth: 0.5,
            strokeOpacity: 0.7,
            cursor: 'pointer'
        }
    }, [heatMapPalette]);

    const stylingFunction = useMemo(
        () => (mapType === 'heatmap' ? heatMapStylingFunction : defaultStylingFunction),
        [defaultStylingFunction, heatMapStylingFunction, mapType]
    );

    const [mapSize, setMapSize] = useState<MapSize>(getMapSize());

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
        <div className={clsx("rds-comp-map", mapType === 'heatmap' && "rds-comp-map--heatmap")}>
            {title && (
                <div className="rds-comp-map__label">{title}</div>
            )}
            <div className="rds-comp-map__center">
                <div style={{ 
                    width: '100%', 
                    height: 'auto', 
                    overflow: 'visible',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}>
                    <WorldMap 
                        styleFunction={stylingFunction} 
                        color={color} 
                        title="" 
                        value-suffix="people" 
                        size={mapSize} 
                        data={mapList} 
                    />
                </div>
            </div>
        </div>
    );
}
RdsCompMap.displayName = "RdsCompMap";
export default RdsCompMap;
