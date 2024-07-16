import type { Meta, StoryObj } from '@storybook/react';
import RdsCompContribution from "./rds-comp-contribution";

const meta: Meta = {
    title: "Components/Contribution",
    component: RdsCompContribution,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
     
    },
} satisfies Meta<typeof RdsCompContribution>;

export default meta;
type Story = StoryObj<typeof RdsCompContribution>;

export const Default: Story = {

    args: {
      weekNames: ['', 'M', '', 'W', '', 'F', ''],
      monthNames: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      panelColors: ['#E7E1F0', '#CBB1F0', '#9E65F0', '#7E2EEF'],
      dateFormat: 'YYYY-MM-DD',
      values :{
        '2016-06-23': 1,
        '2016-06-26': 2,
        '2016-06-27': 3,
        '2016-06-28': 4,
        '2016-06-29': 4
      },
      until : '2016-06-30'      
    }
} satisfies Story;
Default.parameters = { controls: { include: ['weekNames','MonthNames', 'panelColors','dateFormat','values', 'until'] } };

export const WithAttribute: Story = {

  args: {
    weekNames: ['', 'M', '', 'W', '', 'F', ''],
    monthNames: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    panelColors: ['#E7E1F0', '#CBB1F0', '#9E65F0', '#7E2EEF'],
    dateFormat: 'YYYY-MM-DD',
    values :{
      '2016-06-23': 1,
      '2016-06-26': 2,
      '2016-06-27': 3,
      '2016-06-28': 4,
      '2016-06-29': 4
    },
    until : '2016-06-30',
    monthLabelAttributes : {
      'style': {
        'text-decoration': 'underline',
        'font-size': 10,
        'alignment-baseline': 'central',
        'fill': '#AAA'
      }
    },
    weekLabelAttributes : {'rotate': 20},
    panelAttributes :  { 'rx': 6, 'ry': 6 }
  }
} satisfies Story;
WithAttribute.parameters = { controls: { include: ['weekNames','MonthNames', 'panelColors','dateFormat','values', 'until','monthLabelAttributes','weekLabelAttributes','panelAttributes'] } };