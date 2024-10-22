import React from 'react';
import { Story, Meta } from '@storybook/react';
import TruncatedText, { RdsTruncateTextProps } from './rds-truncate-text';

export default {
        title: 'Elements/TruncatedText',
        component: TruncatedText,
        parameters: {
                docs: {
                        description: {
                                component: 'The `RdsTruncateText` component truncates text based on a defined maximum length. It supports two states: "default" (displays full text) and "hover" (shows more text on hover).',
                        },
                },
        },
        argTypes: {
                text: {
                        control: 'text',
                        description: 'The content of the text that will be truncated or displayed fully based on the component state.',
                },
                maxLength: {
                        control: 'number',
                        description: 'The maximum number of characters to display before truncating the text.',
                },
                state: {
                        control: {
                                type: 'radio',
                                options: ['default', 'hover'],
                        },
                        description: 'Choose between "default" (full text) or "hover" (truncated text with hover to expand).',
                },
        },
        tags: ['autodocs'],  // This enables automatic documentation generation
} as Meta<RdsTruncateTextProps>;

const Template: Story<RdsTruncateTextProps> = (args) => <TruncatedText {...args} />;

export const Default = Template.bind({});
Default.args = {
        text: 'This is a sample text.',
        maxLength: 16,
        state: 'hover',  // The state can be 'default' or 'hover'
};

// Removed description from the Default story
