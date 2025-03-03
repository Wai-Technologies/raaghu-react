/* eslint-disable */
import React from 'react';
import RdsMap from './rds-map';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/Map/Map',
  component: RdsMap,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsMap>;

export default meta;
type Story = StoryObj<typeof RdsMap>;



export const WorldMapWithCounter: Story = {
  args: {
    title: 'Map ',
    color: '#A478E6',
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
  }
} satisfies Story;

