import type { Meta, StoryObj } from '@storybook/react';
import RdsCompUserBasics from "./rds-comp-user-basics";


const meta: Meta = { 
    title: "Components/User Basics",
    component: RdsCompUserBasics,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **User Basics** component is a foundational UI element designed to display and manage basic user information. It provides a structured interface for presenting user details such as name, email, and other essential attributes. This component is ideal for applications requiring user profile management or user-related data display. Fully customizable, the User Basics component ensures seamless integration with your design system while offering a clean and intuitive interface for managing user information effectively.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompUserBasics>;

export default meta;
type Story = StoryObj<typeof RdsCompUserBasics>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




