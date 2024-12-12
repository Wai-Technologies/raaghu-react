import React from 'react';
        import { Meta, StoryObj } from '@storybook/react';
        import RdsAiPromptBox from './rds-ai-prompt-box';

        const meta: Meta = {
        title: 'Elements/Ai Prompt Box',
        component: RdsAiPromptBox,
        parameters: {
                layout: 'padded',
            },
            tags: ['autodocs'],
            argTypes: {
                outputtype: {
                        options: ["Raaghu_reply_with_design", "Ai_reply_with_output"],
                        control: { type: "select" },
                    },
            },
        } satisfies Meta<typeof RdsAiPromptBox>;


        export default meta;

        type Story = StoryObj<typeof RdsAiPromptBox>;

        export const Default: Story = {
                args: {
                        prefilledprompt: [
                                { question: "Prefilled Prompt 1" },
                                { question: "Prefilled Prompt 2" },
                                { question: "Prefilled Prompt 3" },
                                { question: "Prefilled Prompt 4" },
                            ],
                        showVariations: true,
                        outputtype: "Raaghu_reply_with_design",

                }
            } satisfies Story;
            Default.parameters = { controls: { include: ['prefilledprompt','showVariations','outputtype'] } };
            