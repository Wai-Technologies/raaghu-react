import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import { Meta, StoryObj } from "@storybook/react-vite";
import RdsCompToolbar, { ToolbarLayout, ToolbarType } from "./rds-comp-toolbar";

const meta: Meta<typeof RdsCompToolbar> = {
    title: "Components/Toolbar",
    component: RdsCompToolbar,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        docs: {
            source: {
                transform: (code: string) => {
                    code = code.replace(/layout="(primary|secondary)"/g, 'layout={ToolbarLayout.$1}');
                    code = code.replace(/layout:\s*"(primary|secondary)"/g, 'layout: ToolbarLayout.$1');
                    
                    code = code.replace(/type="(inline-editor|full-featured|more-text|more-paragraph|more-rich-content|misc)"/g, (match, p1) => {
                        const enumMap: Record<string, string> = {
                            'inline-editor': 'InlineEditor',
                            'full-featured': 'FullFeatured',
                            'more-text': 'MoreText',
                            'more-paragraph': 'MoreParagraph',
                            'more-rich-content': 'MoreRichContent',
                            'misc': 'Misc'
                        };
                        return `type={ToolbarType.${enumMap[p1]}}`;
                    });
                    code = code.replace(/type:\s*"(inline-editor|full-featured|more-text|more-paragraph|more-rich-content|misc)"/g, (match, p1) => {
                        const enumMap: Record<string, string> = {
                            'inline-editor': 'InlineEditor',
                            'full-featured': 'FullFeatured',
                            'more-text': 'MoreText',
                            'more-paragraph': 'MoreParagraph',
                            'more-rich-content': 'MoreRichContent',
                            'misc': 'Misc'
                        };
                        return `type: ToolbarType.${enumMap[p1]}`;
                    });
                    
                    return code;
                }
            }
        }
    },
    argTypes: {
        layout: {
            control: {
                type: 'select',
                labels: {
                    [ToolbarLayout.Primary]: 'Primary',
                    [ToolbarLayout.Secondary]: 'Secondary'
                }
            },
            options: Object.values(ToolbarLayout),
            description: 'Layout variant of the toolbar',
            table: {
                type: { summary: 'ToolbarLayout' },
                defaultValue: { summary: 'ToolbarLayout.Primary' },
            },
        },
        type: {
            control: {
                type: 'select',
                labels: {
                    [ToolbarType.InlineEditor]: 'Inline Editor',
                    [ToolbarType.FullFeatured]: 'Full Featured',
                    [ToolbarType.MoreText]: 'More Text',
                    [ToolbarType.MoreParagraph]: 'More Paragraph',
                    [ToolbarType.MoreRichContent]: 'More Rich Content',
                    [ToolbarType.Misc]: 'Miscellaneous'
                }
            },
            options: Object.values(ToolbarType),
            description: 'Type/variant of the toolbar (only available for secondary layout)',
            table: {
                type: { summary: 'ToolbarType' },
                defaultValue: { summary: 'ToolbarType.FullFeatured' },
            },
            if: { arg: 'layout', eq: 'secondary' },
        },
        disabled: {
            control: 'boolean',
            description: 'Disables every toolbar button',
        },
        sx: {
            control: 'object',
            description: 'MUI system styles applied to the toolbar root.',
        },
    },
    tags: ['autodocs', 'stable'],
} satisfies Meta<typeof RdsCompToolbar>;

export default meta;
type Story = StoryObj<typeof RdsCompToolbar>;

export const Default: Story = {
    args: {
        layout: ToolbarLayout.Primary,
        type: ToolbarType.FullFeatured,
        disabled: false,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const buttons = canvasElement.querySelectorAll('button');
        expect(buttons.length).toBeGreaterThan(0);
    },
};