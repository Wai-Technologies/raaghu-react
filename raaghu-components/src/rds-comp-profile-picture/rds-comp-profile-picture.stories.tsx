import type { Meta, StoryObj } from '@storybook/react';
import RdsCompProfilePicture from './rds-comp-profile-picture';


const meta: Meta = { 
    title: "Components/Profile Picture",
    component: RdsCompProfilePicture,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompProfilePicture>;

export default meta;
type Story = StoryObj<typeof RdsCompProfilePicture>;

export const Default: Story = {
    args: {
      profilePictureData: "https://abpstagereact12.raaghu.io/assets/profile-picture-circle.svg",
    }
} satisfies Story;




