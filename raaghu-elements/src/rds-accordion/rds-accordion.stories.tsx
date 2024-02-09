
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsAccordion from './rds-accordion';
import RdsAccordionItem from "./rds-accordion-item";


const meta: Meta = {
    title: 'Elements/Accordion',
    component: RdsAccordion,
    parameters: { 
        layout: '',
    },
    tags:['autodocs'],
    argTypes: {},
} satisfies Meta<typeof RdsAccordion>;


export default meta;
type Story = StoryObj<typeof RdsAccordion>;

export const With_close_button: Story = {
    args: {
            accordionType: "Default",
            accordionId: "1",
            children: (
                <>
                    <RdsAccordionItem id={"1"} title={"Section 1 Title"}>
                        <h1>Hello</h1>
                    </RdsAccordionItem>
                    <RdsAccordionItem id={"2"} title={"Section 2 Title"}>
                        <h1>Hello2</h1>
                    </RdsAccordionItem>
                    <RdsAccordionItem id={"3"} title={"Section 3 Title"}>
                        <h1>Hello3</h1>
                    </RdsAccordionItem>
                </>
            ),
        }
} satisfies Story;

export const flush: Story = {
    args: {
                accordionType: "flush",
                accordionId: "1",
                children: (
                    <>
                        {" "}
                        <RdsAccordionItem id={"1"} title={"Section 1 Title"}>
                            <h1>Hello</h1>
                        </RdsAccordionItem>
                        <RdsAccordionItem id={"2"} title={"Section 2 Title"}>
                            <h1>Hello2</h1>
                        </RdsAccordionItem>
                        <RdsAccordionItem id={"3"} title={"Section 3 Title"}>
                            <h1>Hello3</h1>
                        </RdsAccordionItem>
                    </>
                ),
            }
        
} satisfies Story;

export const AlwaysOpen: Story = {
    args: {
        accordionType: "",
    accordionId: "1",
    children: (
        <>
            {" "}
            <RdsAccordionItem id={"1"} AlwaysOpen={true} title={"Section 1 Title"}>
                <h1>Hello</h1>
            </RdsAccordionItem>
            <RdsAccordionItem id={"2"} AlwaysOpen={true} title={"Section 2 Title"}>
                <h1>Hello2</h1>
            </RdsAccordionItem>
            <RdsAccordionItem id={"3"} AlwaysOpen={true} title={"Section 3 Title"}>
                <h1>Hello3</h1>
            </RdsAccordionItem>
        </>
    ),
            }
} satisfies Story;

export const StackOpen: Story = {
    args: {
        accordionType: "",
        accordionId: "1",
        children: (
            <>
                {" "}
                <RdsAccordionItem id={"1"} defaultOpen={true} title={"Section 1 Title"}>
                    <h1>Hello</h1>
                </RdsAccordionItem>
                <RdsAccordionItem id={"2"} title={"Section 2 Title"}>
                    <h1>Hello2</h1>
                </RdsAccordionItem>
                <RdsAccordionItem id={"3"} title={"Section 3 Title"}>
                    <h1>Hello3</h1>
                </RdsAccordionItem>
            </>
        ),
    }
} satisfies Story;