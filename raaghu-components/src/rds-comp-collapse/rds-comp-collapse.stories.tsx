import RdsCompCollapse from "./rds-comp-collapse";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Collapse',
    component: RdsCompCollapse,
    parameters: {
        layout: 'padded',
        docs:{
            description: {component: `The **Collapse** component provides a dynamic way to toggle the visibility of content sections in a user interface. It enables users to expand or collapse specific content areas using a trigger button, improving content organization and reducing visual clutter. This component is driven by the \`buttonList\` prop, an array of toggle button configurations where each item includes properties like \`label\`, \`id\`, and \`colorVariant\`. Each button acts as a trigger to show or hide a corresponding collapsible section based on the \`id\` value, allowing for multiple independently controlled collapsible areas. Commonly used in FAQs, settings panels, accordions, or to reveal additional details on demand, this component enhances user interaction by keeping interfaces clean and focused while still offering access to extended information as needed.`}

        }
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCollapse>;


export default meta;
type Story = StoryObj<typeof RdsCompCollapse>;


export const Standard: Story = {
    args: {
        buttonList: [
            {
                "colorVariant": "primary",
                "label": "Toggle Element",
                "id": "collapseExample"
            }
        ],
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['buttonList'] } };



