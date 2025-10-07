
import React from 'react';
import { WorldMap } from 'react-svg-worldmap';
import './rds-comp-map.scss';

export interface RdsCompMapProps {
    title?: any,
    mapList: any,
    color: any,
    mapType?: 'default' | 'heatmap'
}

const RdsCompMap = (props: RdsCompMapProps) => {
    const { mapType = 'default' } = props;

    // Default map styling function
    const defaultStylingFunction = (context: any) => {
        const opacityLevel = 0.1 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))
        return {
            fill: context.country === "US" ? "blue" : props.color,
            fillOpacity: opacityLevel,
            stroke: "green",
            strokeWidth: 1,
            strokeOpacity: 0.2,
            cursor: "pointer"
        }
    }

    // Heat map styling function using Figma palette gradients
    const heatMapPalette = [
        '#FFAF00', 
        '#2CC1A5', 
        '#26BEAE',
        '#E1CF00',
        '#FEA200',
        '#28C0AB',
        '#F94E00',
        '#CCDE00',
        '#F84A00',
        '#1DBBBC',
        '#FC4703',
        '#25BDB1'
    ];

    // simple linear interpolation between palette stops
    const interpolateColor = (t: number) => {
        if (t <= 0) return heatMapPalette[0];
        if (t >= 1) return heatMapPalette[heatMapPalette.length - 1];

        const scaled = t * (heatMapPalette.length - 1);
        const idx = Math.floor(scaled);
        const frac = scaled - idx;

        const hexToRgb = (hex: string) => {
            const h = hex.replace('#', '');
            const bigint = parseInt(h, 16);
            return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
        }

        const rgbToHex = (r: number, g: number, b: number) => {
            const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        }

        const a = hexToRgb(heatMapPalette[idx]);
        const b = hexToRgb(heatMapPalette[idx + 1]);
        const r = a[0] + (b[0] - a[0]) * frac;
        const g = a[1] + (b[1] - a[1]) * frac;
        const bl = a[2] + (b[2] - a[2]) * frac;
        return rgbToHex(r, g, bl);
    }

    const heatMapStylingFunction = (context: any) => {
        const intensity = (context.countryValue - context.minValue) / (context.maxValue - context.minValue) || 0;
        const color = interpolateColor(intensity);
        return {
            fill: color,
            fillOpacity: 0.7 + (0.3 * intensity),
            stroke: '#222',
            strokeWidth: 0.5,
            strokeOpacity: 0.7,
            cursor: 'pointer'
        }
    }

    const stylingFunction = mapType === 'heatmap' ? heatMapStylingFunction : defaultStylingFunction;

    // Determine map size based on screen width
    const getMapSize = (): "sm" | "md" | "lg" | "xl" | "xxl" | "responsive" | undefined => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            if (width <= 320) return 'responsive';
            if (width <= 414) return 'responsive';
            if (width <= 768) return 'md';
            return 'lg';
        }
        return 'responsive';
    };

    const [mapSize, setMapSize] = React.useState<"sm" | "md" | "lg" | "xl" | "xxl" | "responsive" | undefined>(getMapSize());

    React.useEffect(() => {
        const handleResize = () => {
            setMapSize(getMapSize());
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className={`rds-comp-map ${mapType === 'heatmap' ? 'rds-comp-map--heatmap' : ''}`}>
            {props.title && (
                <div className="rds-comp-map__label">{props.title}</div>
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
                        color={props.color} 
                        title="" 
                        value-suffix="people" 
                        size={mapSize} 
                        data={props.mapList} 
                    />
                </div>
            </div>
        </div>
    );
}
RdsCompMap.displayName = "RdsCompMap";
export default RdsCompMap;
