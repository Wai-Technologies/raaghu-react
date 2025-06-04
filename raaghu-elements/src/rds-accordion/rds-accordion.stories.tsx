import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsAccordion, { AccordionBorder, AccordionLayout, AccordionSize, AccordionState, AccordionType } from './rds-accordion';

const meta: Meta = {
    title: 'Elements/Accordion',
    component: RdsAccordion,
    parameters: {
        layout: 'padded',
        disableZoom: false,
        docs: {
           description: {
  component: `The Accordion element is a core UI building block that enables content to be grouped in **collapsible sections** for better organization and user interaction. It supports **single** or **multiple** open states, adjustable size, and default expanded or collapsed behavior. This element provides a flexible and reusable solution for building structured, interactive interfaces.`,

      },
            
            source: {
                transform: (code: string) => {
                    code = code.replace(/"(single|multiple)"/g, '{AccordionType.$1}');
                    code = code.replace(/"(small|medium|large)"/g, '{AccordionSize.$1}');
                    code = code.replace(/"(default|hover|selected)"/g, '{AccordionState.$1}');
                    code = code.replace(/"(border|bottomline|borderhide)"/g, '{AccordionBorder.$1}');
                    code = code.replace(/"(default|expanded)"/g, '{AccordionLayout.$1}');
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
        style:{
            options:["border","bottomline","borderhide"],
            control:{type: "select"}
        },
        state: {
            options: ["default", "hover", "selected"],
            control: { type: "select" },
        },
        accordionType: {
            options: ["single", "multiple"],
            control: { type: "select" },
        },
        layout: {
            options: ["default", "expanded"],
            control: { type: "select" },
        },
        icon: {
            if: { arg: "withIcon"},
        },
        iconFill: {
            if: { arg: "withIcon"},
        },
        iconStroke: {
            if: { arg: "withIcon"},
        },
    },
} satisfies Meta<typeof RdsAccordion>;

export default meta;
type Story = StoryObj<typeof RdsAccordion>;

export const Default: Story = {
    args: {
        accordionId: "1",
        accordionType: AccordionType.multiple,
        size: AccordionSize.small,
        state: AccordionState.default,
        style: AccordionBorder.bottomline,
        layout: AccordionLayout.default,
        withIcon: true,
        icon: "plus",
        iconFill: false,
        iconStroke: true,
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
    parameters: { controls: { include: ['size', 'accordionId', 'accordionType' , 'state', 'layout', 'items', 'style', 'withIcon', 'icon', /*'iconFill', 'iconStroke'*/] } },
} satisfies Story;
/*
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
*/