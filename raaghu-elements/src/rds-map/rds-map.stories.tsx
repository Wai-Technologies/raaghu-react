/* eslint-disable */
import React from 'react';
import RdsMap from './rds-map';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Elements/Map',
  component: RdsMap,
  parameters: {
    layout: 'padded',
    docs: {
    description: {
        component:
            'The **Map** element is a visual component for displaying geographic data on a world map. It supports customizable titles, color schemes, and a list of country-value pairs to represent data such as population, statistics, or metrics for each country. The map can be styled to match your application’s theme and is ideal for dashboards, analytics, and any interface where visualizing data by country or region is required. Flexible props allow you to tailor its appearance and behavior for a wide range of use cases in your design system.'
    }
}
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsMap>;

export default meta;
type Story = StoryObj<typeof RdsMap>;



export const Default: Story = {
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

