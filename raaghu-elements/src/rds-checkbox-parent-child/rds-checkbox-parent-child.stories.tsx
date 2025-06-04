import RdsCheckboxParentChild from "./rds-checkbox-parent-child";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Checkbox Parent Child',
    component: RdsCheckboxParentChild,
    parameters: {
        layout: 'padded',
        docs:{
            description: {
  component: `The **Checkbox Parent Child** component offers a structured and interactive way to manage hierarchical checkbox selections. It allows grouping of related child checkboxes under a parent checkbox, enabling users to select or deselect an entire group with a single action. 
Each parent item includes properties like \`label\`, \`isSelected\`, \`isIntermediate\`, and \`disabled\`, while each child item supports \`label\`, \`isSelected\`, \`disabled\`, and parent association through \`parent_id\`. The component also supports an \`isClosed\` state to optionally collapse or expand child checkbox lists for improved UI organization.
The parent checkbox dynamically reflects its children’s selection status—fully checked when all children are selected, indeterminate when only some are selected, and unchecked when none are selected—providing a clear and intuitive interaction pattern.
Ideal for permission settings, category filters, or any grouped selection scenarios, this component ensures consistent behavior and a user-friendly experience when working with nested checkbox relationships.`
}

        }
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCheckboxParentChild>;

export default meta;
type Story = StoryObj<typeof RdsCheckboxParentChild>;


export const CheckboxParent: Story = {
    args: {
        userData: [
            {
                id: 1,
                label: "Parent Checkbox 1",
                isSelected: false,
                isIntermediate: false,
                disabled: false,
                childList: [
                    {
                        id: 1,
                        parent_id: 1,
                        label: "Child Checkbox 1",
                        isSelected: false,
                        disabled: false,
                    },
                    {
                        id: 2,
                        parent_id: 1,
                        label: "Child Checkbox 2",
                        isSelected: false,
                        disabled: false,
                    },
                    {
                        id: 3,
                        parent_id: 1,
                        label: "Child Checkbox 3",
                        isSelected: false,
                        disabled: false,
                    },
                    {
                        id: 4,
                        parent_id: 1,
                        label: "Child Checkbox 4",
                        isSelected: false,
                        disabled: false,
                    },
                ],
            },
            {
                id: 2,
                label: "Parent Checkbox 2",
                isSelected: false,
                isIntermediate: false,
                isClosed: false,
                disabled: false,
                childList: [
                    {
                        id: 1,
                        parent_id: 2,
                        label: "Child Checkbox 1",
                        isSelected: true,
                        disabled: false,
                    },
                    {
                        id: 2,
                        parent_id: 2,
                        label: "Child Checkbox 2",
                        isSelected: true,
                        disabled: false,
                    },
                ],
            },
        ],
    }
} satisfies Story;
CheckboxParent.parameters = { controls : { include: ['userData'] } };

