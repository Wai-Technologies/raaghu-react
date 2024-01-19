/* eslint-disable */
import React from 'react';
import RdsMap from './rds-map';
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Map/Map",
  component: RdsMap,
  argTypes: {},
} as ComponentMeta<typeof RdsMap>;

const Template: ComponentStory<typeof RdsMap> = (args) => (
  <RdsMap {...args} />
);

export const Map = Template.bind({});
Map.args = {
  title:'Map ',
  color:'#A478E6',
  mapList: [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
    { country: "us", value: 331883986 },  // united states
    { country: "id", value: 264935824 },  // indonesia
    { country: "pk", value: 210797836 },  // pakistan
    { country: "br", value: 210301591 },  // brazil
    { country: "ng", value: 208679114 },  // nigeria
    { country: "bd", value: 161062905 },  // bangladesh
    { country: "ru", value: 141944641 },  // russia
    { country: "mx", value: 127318112 }   // mexico
  ]
};
