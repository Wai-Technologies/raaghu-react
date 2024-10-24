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
    argTypes: {
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
        },
        border:{
            options:["border","bottomline","borderhide"],
            control:{type:"radio"}
        }
    },
} satisfies Meta<typeof RdsAccordion>;

export default meta;
type Story = StoryObj<typeof RdsAccordion>;

export const Default: Story = {
    args: {
        accordionId: "1",
        accordionType: "single",
        size: "medium",
        border:"border",
        items: [
            {
                id: "1",
                title: "Accordion Title",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
            {
                id: "2",
                title: "Accordion Title",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
            {
                id: "3",
                title: "Accordion Title",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
        ],
    },
    parameters: { controls: { include: ['size', 'accordionId', 'items', 'border'] } }
} satisfies Story;

export const flush: Story = {
    args: {
        accordionId: "1",
        accordionType: "single",
        size: "medium",
        border:"border",
        items: [
            {
                id: "1",
                title: "Section 1 Title",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
            {
                id: "2",
                title: "Section 2 Title",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
            {
                id: "3",
                title: "Section 3 Title",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
        ],
    },
    parameters: { controls: { include: ['size', 'accordionId', 'items', 'border'] } }
} satisfies Story;

export const AlwaysOpen: Story = {
    args: {
        accordionId: "2",
        accordionType: "multiple",
        size: "medium",
        border:"border",
        items: [
            {
                id: "1",
                title: "Section 1 Title",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
            {
                id: "2",
                title: "Section 2 Title",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
            {
                id: "3",
                title: "Section 3 Title",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
        ],
    },
    parameters: { controls: { include: ['size', 'accordionId', 'items','border'] } }
} satisfies Story;

export const StackOpen: Story = {
    args: {
        accordionId: "2",
        accordionType: "single",
        size: "medium",
        border:"border",
        items: [
            {
                id: "1",
                title: "Section 1 Title",
                defaultOpen: true,
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
            {
                id: "2",
                title: "Section 2 Title",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
            {
                id: "3",
                title: "Section 3 Title",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
        ],
    },
    parameters: { controls: { include: ['size', 'accordionId', 'items','border'] } }
} satisfies Story;

export const With_icon: Story = {
    args: {
        icon: "plus",
        accordionType: "single",
        accordionId: "3",
        size: "medium",
        border:"border",
        iconFill: false,
        iconStroke: true,
        items: [
            {
                id: "1",
                title: "Section 1 Title with Icon",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
            {
                id: "2",
                title: "Section 2 Title with Icon",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
            {
                id: "3",
                title: "Section 3 Title with Icon",
                accordionContent: (
                    <div className='border p-4'>
                        <p>Replace with your content component </p>
                    </div>
                ),
            },
        ],
    }
};
With_icon.parameters = { controls: { include: ['size', 'icon', 'accordionId', 'items','border'] } };
