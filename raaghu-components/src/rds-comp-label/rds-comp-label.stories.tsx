import RdsCompLabel from "./rds-comp-label";
import { Meta, StoryObj } from "@storybook/react-vite";



const meta: Meta = {
    title: 'Components/Label',
    component: RdsCompLabel,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Label** component is used to display descriptive text for form elements or UI sections within your application. It supports multiple \`fontWeight\` options such as "bold", "normal", and "light" to provide flexible typographic emphasis that aligns with your design system. Additionally, the component offers toggles for \`italic\` styling and a \`required\` flag to visually indicate mandatory fields. This ensures clear, accessible, and consistent labeling throughout your UI, improving usability and maintaining design uniformity.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
        fontWeight: {
            options: [
                "black",
                "bold",
                "bolder",
                "extrabold",
                "light",
                "lighter",
                "medium",
                "normal",
                "semibold",
            ],
            control: { type: "select" },
        }
    },
} satisfies Meta<typeof RdsCompLabel>;

export default meta;
type Story = StoryObj<typeof RdsCompLabel>;

export const CustomLabel: Story = {
    args: {
        label: "Label",
        fontWeight: "bold",
        italic: false,
        required: false
    }
} satisfies Story;
CustomLabel.parameters = { controls: { include: ['label', 'fontWeight', 'italic', 'required'] } };

