import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsAccordion from './rds-accordion';


const meta: Meta = {
    title: 'Elements/Accordion',
    component: RdsAccordion,
    parameters: {
        layout: 'padded',
        disableZoom: false
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof RdsAccordion>;


export default meta;
type Story = StoryObj<typeof RdsAccordion>;

export const Default: Story = {
    args: {
        accordionId: "1",
        accordionType: "single",
        items: [
            {
                id: "1",
                title: "Section 1 Title",
                accordionContent: (
                    <div>
                        <h1>Hello</h1>                  
                    </div>
                ),
            },
            {
                id: "2",
                title: "Section 2 Title",
                accordionContent: (
                    <div>
                        <h1>Hello2</h1>
                    </div>
                ),
            },
            {
                id: "3",
                title: "Section 3 Title",
                accordionContent: (
                    <div>
                        <h1>Hello3</h1>
                    </div>
                ),
            },
        ],
    }
} satisfies Story;
Default.parameters = { controls: { include: ['accordionId', 'items'] } };
export const flush: Story = {
    args: {
        accordionId: "1",
        accordionType: "single",
        items: [
            {
                id: "1",
                title: "Section 1 Title",
                accordionContent: (
                    <div>
                        <h1>Hello</h1>
                    </div>
                ),
            },
            {
                id: "2",
                title: "Section 2 Title",
                accordionContent: (
                    <div>
                        <h1>Hello2</h1>
                    </div>
                ),
            },
            {
                id: "3",
                title: "Section 3 Title",
                accordionContent: (
                    <div>
                        <h1>Hello3</h1>
                    </div>
                ),
            },
        ],
    }
} satisfies Story;

flush.parameters = { controls: { include: ['accordionId', 'items'] } };

export const AlwaysOpen: Story = {
    args: {
        accordionId: "2",
        accordionType: "multiple",
        items: [
            {
                id: "1",
                title: "Section 1 Title",
                accordionContent: (
                    <div>
                        <h1>Hello</h1>
                    </div>
                ),
            },
            {
                id: "2",
                title: "Section 2 Title",
                accordionContent: (
                    <div>
                        <h1>Hello2</h1>
                    </div>
                ),
            },
            {
                id: "3",
                title: "Section 3 Title",
                accordionContent: (
                    <div>
                        <h1>Hello3</h1>
                    </div>
                ),
            },
        ],
    }
} satisfies Story;

AlwaysOpen.parameters = { controls: { include: ['accordionId', 'items'] } };

export const StackOpen: Story = {
    args: {
        accordionId: "2",
        accordionType: "single",
        items: [
            {
                id: "1",
                title: "Section 1 Title",
                defaultOpen: true,
                accordionContent: (
                    <div>
                        <h1>Hello</h1>
                    </div>
                ),
            },
            {
                id: "2",
                title: "Section 2 Title",
                accordionContent: (
                    <div>
                        <h1>Hello2</h1>
                    </div>
                ),
            },
            {
                id: "3",
                title: "Section 3 Title",
                accordionContent: (
                    <div>
                        <h1>Hello3</h1>
                    </div>
                ),
            },
        ],
    }
} satisfies Story;

StackOpen.parameters = { controls: { include: ['accordionId', 'items'] } };

