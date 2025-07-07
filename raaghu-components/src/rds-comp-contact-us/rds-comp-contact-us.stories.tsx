import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompContactUs from "./rds-comp-contact-us";

const meta: Meta = {
    title: "Components/Contact Us",
    component: RdsCompContactUs,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Contact Us** component is a simple and customizable UI element designed to facilitate user communication within your application. It provides a structured interface for users to submit inquiries, feedback, or support requests. While the current implementation does not include specific customization options, developers can extend its functionality by adding properties such as input fields, validation, or submission handlers. This component is ideal for contact pages, support sections, or any interface requiring user interaction for communication. Fully customizable, the Contact Us component can be tailored to align with your design system and functional requirements, ensuring a seamless user experience.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompContactUs>;

export default meta;
type Story = StoryObj<typeof RdsCompContactUs>;

export const Standard: Story = {
    args: {}
} satisfies Story;
//Standard.parameters = { controls: { include: [] } };




