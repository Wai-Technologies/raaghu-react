import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompApplyForPosition from "./rds-comp-apply-for-position";


const meta: Meta = { 
    title: "Components/Apply For Position",
    component: RdsCompApplyForPosition,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Apply For Position** component is a customizable UI element designed to facilitate job applications or position requests within your system. It supports features such as `applyForPositionData` to capture applicant details, an `onSaveHandler` function to handle form submissions, and a `reset` toggle to clear the form or reset the application process. This component is ideal for career portals, recruitment systems, or any interface requiring structured and user-friendly job application workflows. Fully customizable, the Apply For Position component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof RdsCompApplyForPosition>;

export default meta;
type Story = StoryObj<typeof RdsCompApplyForPosition>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;
// Default.parameters = { controls: { include: [] } };
