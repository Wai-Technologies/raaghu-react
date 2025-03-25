import { Meta, StoryObj } from "@storybook/react";
import RdsWidgetPortal from "./rds-widget-portal";

const meta: Meta = {
    title: "Components/Widget Portal",
    component: RdsWidgetPortal,
    tags: ['autodocs'],
    argTypes: {
    }
} satisfies Meta<typeof RdsWidgetPortal>;

export default meta;
type Story = StoryObj<typeof RdsWidgetPortal>;

export const Default: Story = {
    args: {
      btnLabel: "Buy Ticket",
      widgetTitle: "Team",
      statusMsg: "Upgrade licence to get more features",
      subTitle: "Liecence Type",
      icon: "arrow_down",
      btnShow: true,
      statusBarMsg: false
    }
} satisfies Story;
Default.parameters = { controls: { include: ['btnLabel', 'widgetTitle', 'statusMsg', 'subTitle', 'icon', 'btnShow', 'statusBarMsg'] } };
