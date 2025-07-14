import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompIdentityManagement from "./rds-comp-identity-management-new";


const meta: Meta = { 
  title: "Components/Identity Management",
    component: RdsCompIdentityManagement,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Identity Management** component is a customizable UI element designed to manage identity-related settings and configurations within your application. It provides a structured interface for handling user authentication, password policies, and account management workflows. This component is ideal for administrative dashboards, user management systems, or any application requiring robust identity management capabilities. Fully customizable, the Identity Management component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIdentityManagement>;

export default meta;
type Story = StoryObj<typeof RdsCompIdentityManagement>;

export const Standard: Story = {
    args: {
    //   identityData: {
    //     requiredLength: "",
    //     defaultAddress: "",
    //     nonAlpha: false,
    //     uppercaserequired: false,
    //     numbers: false,
    //     lowercaserequired: false,
    //     lockoutDuration: "",
    //     MaxAttmpts: "",
    //     uppercase: false,
    //     lowercase: false,
    //     newusers: ""
    // }
  }
} satisfies Story;




