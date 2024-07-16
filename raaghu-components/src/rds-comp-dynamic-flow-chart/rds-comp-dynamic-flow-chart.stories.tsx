/* eslint-disable */
import RdsCompDynamicFlowChart from './rds-comp-dynamic-flow-chart';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = { 
  title: "Components/Dynamic Flow Chart",
  component: RdsCompDynamicFlowChart,
  parameters: {
      layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompDynamicFlowChart>;

export default meta;
type Story = StoryObj<typeof RdsCompDynamicFlowChart>;

export const List_View: Story = {
  args: {
            
             
  }
} satisfies Story;
List_View .parameters = { controls: { include: ['enablecheckboxselection', 'actionPosition', 'tableHeaders','tableData','actions','pagination','recordsPerPage','recordsPerPageSelectListOption'] } };