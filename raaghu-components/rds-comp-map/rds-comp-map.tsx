
import React from 'react';
import { WorldMap } from 'react-svg-worldmap';
import './rds-comp-map.scss';

export interface RdsCompMapProps {
    title?: any,
    mapList: any,
    color: any
}

const RdsCompMap = (props: RdsCompMapProps) => {
    const stylingFunction = (context: any) => {
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

    return (
        <div className="rds-comp-map">
            {props.title && (
                <div className="rds-comp-map__label">{props.title}</div>
            )}
            <div className="rds-comp-map__center">
                <WorldMap styleFunction={stylingFunction} color={props.color} title="" value-suffix="people" size="md" data={props.mapList} />
            </div>
        </div>
    );
}

export default RdsCompMap;
