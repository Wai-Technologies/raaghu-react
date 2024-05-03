import React, { FC } from 'react';
import { WorldMap } from "react-svg-worldmap"

export interface RdsMapProps {
   title?: any,
   mapList: any,
   color: any
}



const RdsMap = (props: RdsMapProps) => {
   const stylingFunction = (context: any) => {
      const opacityLevel = 0.1 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))
      return {
         fill: context.country === "US" ? "blue" : context.color,
         fillOpacity: opacityLevel,
         stroke: "green",
         strokeWidth: 1,
         strokeOpacity: 0.2,
         cursor: "pointer"
      }
   }

   return (
      <div className="App" >
         <WorldMap styleFunction={stylingFunction} color={props.color} title={props.title} value-suffix="people" size="sm" data={props.mapList} />
      </div>

   );
}

export default RdsMap;
