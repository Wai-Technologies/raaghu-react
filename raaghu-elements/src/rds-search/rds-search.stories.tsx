import React from "react";
import RdsSearch, { IconPosition } from "./rds-search";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Search',
    component: RdsSearch,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
  component: `The **Search** component provides a customizable search input field with an optional icon and label. It accepts props such as \`label\` (text for the input label), \`labelPosition\` (position of the label relative to the input: top, bottom, left, or right), \`placeholder\` (input placeholder text), \`size\` (input size variants: small, medium, large), and \`iconPosition\` (placement of the search icon, either left or right). It also supports event handlers like \`onChange\`, \`onKeyPress\`, and \`onKeyUp\` for interactive behavior. This component is ideal for search bars in forms, headers, or anywhere a user input search functionality is required.`
}
,
            source: {
                transform: (code: string) => {
                    code = code.replace(/"(left|right)"/g, '{IconPosition.$1}');
                    return code;
                },
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        iconPosition: {
            options: ["left", "right"],
            control: { type: "select" },
        },
        labelPosition: {
            options: ["top", "bottom", "left", "right"],
            control: { type: "select" }
        },
        onChange: { action: 'onChange' },
        onKeyPress: { action: 'onKeyPress' },
        onKeyUp: { action: 'onKeyUp' },
    },
} satisfies Meta<typeof RdsSearch>;

export default meta;
type Story = StoryObj<typeof RdsSearch>;

export const Standard: Story = {
    args: {
        label: 'Search',
        labelPosition: 'top',
        placeholder: "Search",
        size: "small",
        iconPosition: IconPosition.Left,
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['label', 'labelPosition', 'placeholder', 'size', 'iconPosition'] } };


