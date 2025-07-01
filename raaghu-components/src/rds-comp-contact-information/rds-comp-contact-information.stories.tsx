import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompContactInformation from "./rds-comp-contact-information";

const meta: Meta = { 
    title: "Components/Contact Information",
    component: RdsCompContactInformation,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Contact Information** component is a customizable UI element designed to capture and display contact details within your application. It provides a structured interface for users to input or view information such as phone numbers, email addresses, and physical addresses. This component is ideal for user profiles, account settings, or any interface requiring organized and user-friendly contact information management. Fully customizable, the Contact Information component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompContactInformation>;

export default meta;
type Story = StoryObj<typeof RdsCompContactInformation>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
//Default.parameters = { controls: { include: [] } };