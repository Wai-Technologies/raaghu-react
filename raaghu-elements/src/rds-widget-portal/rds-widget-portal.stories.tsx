import { Meta, StoryObj } from "@storybook/react-vite";
import RdsWidgetPortal from "./rds-widget-portal";

const meta: Meta = {
    title: "Components/Widget Portal",
    component: RdsWidgetPortal,
    parameters:{
      docs: {
    description: {
        component: 
            'The **Widget Portal** component is a versatile and customizable UI element designed to display interactive widgets within your application. It supports features such as a customizable **button label** (`btnLabel`), a **widget title** (`widgetTitle`), a **status message** (`statusMsg`), and a **subtitle** (`subTitle`) to provide context and enhance usability. The component also includes an **icon** (`icon`) for visual appeal and allows toggling the visibility of the button (`btnShow`) and status bar message (`statusBarMsg`). Ideal for dashboards, portals, or any interface requiring modular and interactive widget displays, the Widget Portal component is fully customizable to align with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    }
} satisfies Meta<typeof RdsWidgetPortal>;

export default meta;
type Story = StoryObj<typeof RdsWidgetPortal>;

export const Standard: Story = {
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
Standard.parameters = { controls: { include: ['btnLabel', 'widgetTitle', 'statusMsg', 'subTitle', 'icon', 'btnShow', 'statusBarMsg'] } };
