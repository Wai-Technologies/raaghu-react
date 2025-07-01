
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompOtherSettings from "./rds-comp-other-settings";


const meta: Meta = { 
  title: "Components/Other Settings",
    component: RdsCompOtherSettings,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Other Settings** component is a customizable UI element designed to manage and display additional configuration options within your application. It provides a structured interface for handling miscellaneous settings, making it ideal for administrative dashboards, user preferences, or any application requiring flexible configuration management. Fully customizable, the Other Settings component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompOtherSettings>;

export default meta;
type Story = StoryObj<typeof RdsCompOtherSettings>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




