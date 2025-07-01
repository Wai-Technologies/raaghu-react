import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompEditLanguageText from "./rds-comp-edit-language-text";


const meta: Meta = { 
    title: "Components/Edit Language Text",
    component: RdsCompEditLanguageText,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Edit Language Text** component is a customizable UI element designed to manage and edit language-specific text within your application. It provides a structured interface for modifying text entries, making it ideal for multilingual applications, localization workflows, or any interface requiring dynamic text management. Fully customizable, the Edit Language Text component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEditLanguageText>;

export default meta;
type Story = StoryObj<typeof RdsCompEditLanguageText>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;