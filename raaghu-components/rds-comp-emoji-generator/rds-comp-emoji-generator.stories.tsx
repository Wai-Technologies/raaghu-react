import { StoryObj, Meta } from "@storybook/react-vite";
import RdsCompEmojiGenerator, { EmojiCategory, EmojiGeneratorType } from "./rds-comp-emoji-generator";

const meta: Meta = {
    title: 'Components/Emoji Generator',
    component: RdsCompEmojiGenerator,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        docs: {
            description: {
                component: 'A comprehensive emoji generator component with category tabs, search functionality, skin tone selector, and emoji grid. Perfect for chat applications, forms, and any interface requiring emoji selection.'
            }
        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        Type: {
            options: Object.values(EmojiGeneratorType),
            control: { type: "select" },
            description: "Type of emoji generator - Default shows full interface, Quick Reactions shows simplified version",
        },
        Category: {
            options: Object.values(EmojiCategory),
            control: { type: "select" },
            description: "Category of emojis to display",
        },
        expanded: {
            control: { type: "boolean" },
            description: "Keeps the skin tone palette open below the skin tone button",
            table: { defaultValue: { summary: "false" } },
        },
        State: { table: { disable: true } },
        "Show Skin Tone": {
            control: { type: "boolean" },
            description: "Show skin tone selector toggle",
        },
        "Show Footer": {
            control: { type: "boolean" },
            description: "Show 'What's your mood?' footer section",
        },
        maxEmojis: {
            control: { type: "number", min: 10, max: 200, step: 10 },
            description: "Maximum number of emojis to display in grid",
        },
        onEmojiSelect: {
            action: 'emoji-selected',
            description: "Callback when emoji is clicked",
        },
    },
} satisfies Meta<typeof RdsCompEmojiGenerator>;

export default meta;
type Story = StoryObj<typeof RdsCompEmojiGenerator>;

export const Default: Story = {
    args: {
        Type: EmojiGeneratorType.Default,
        Category: EmojiCategory.SmileysAndPeople,
        "Show Skin Tone": true,
        "Show Footer": true,
        expanded: false,
        maxEmojis: 80,
    },
    parameters: {
        docs: {
            description: {
                story: 'The default emoji generator with clean interface including search functionality, category tabs, emoji grid, and footer text. The footer mood input filters emojis across all categories.',
            },
        },
    },
};

export const QuickReactions: Story = {
    args: {
        Type: EmojiGeneratorType.QuickReactions,
        Category: EmojiCategory.SmileysAndPeople,
        "Show Skin Tone": false,
        "Show Footer": false,
        expanded: false,
        maxEmojis: 32,
    },
    parameters: {
        docs: {
            description: {
                story: 'A simplified emoji generator for quick reactions. Shows only the category tabs and emoji grid without search or footer text. Perfect for chat applications or quick emoji picking scenarios.',
            },
        },
    },
};
