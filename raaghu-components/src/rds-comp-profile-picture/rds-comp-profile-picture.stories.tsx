import type { Meta, StoryObj } from '@storybook/react';
import RdsCompProfilePicture from './rds-comp-profile-picture';


const meta: Meta = { 
    title: "Components/Profile Picture",
    component: RdsCompProfilePicture,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Profile Picture** component is a customizable UI element designed to display and manage user profile pictures within your application. It supports features such as displaying a default or user-uploaded profile image, making it ideal for user account management, profile customization, or any application requiring a user-friendly interface for profile picture handling. Fully customizable, the Profile Picture component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
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




