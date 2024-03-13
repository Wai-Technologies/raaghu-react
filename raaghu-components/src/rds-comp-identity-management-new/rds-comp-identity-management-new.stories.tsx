import type { Meta, StoryObj } from '@storybook/react';
import RdsCompIdentityManagement from "./rds-comp-identity-management-new";


const meta: Meta = { 
  title: "Components/Identity Management",
    component: RdsCompIdentityManagement,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompIdentityManagement>;

export default meta;
type Story = StoryObj<typeof RdsCompIdentityManagement>;

export const Default: Story = {
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




