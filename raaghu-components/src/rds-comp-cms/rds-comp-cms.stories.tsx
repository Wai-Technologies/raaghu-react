import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompCMS from "./rds-comp-cms";


const meta: Meta = { 
    title: "Components/CMS",
    component: RdsCompCMS,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **CMS** component is a versatile and customizable UI element designed to manage and display content within your application. It provides a structured interface for creating, editing, and organizing content, making it ideal for websites, blogs, or any application requiring dynamic content management. The component is fully customizable, allowing developers to tailor its functionality and appearance to align with specific design systems and functional requirements. Whether used for managing articles, pages, or other content types, the CMS component ensures a seamless and user-friendly experience while maintaining consistency with your application’s design and branding.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCMS>;

export default meta;
type Story = StoryObj<typeof RdsCompCMS>;

export const Standard: Story = {
    args: {
        
    }
} satisfies Story;