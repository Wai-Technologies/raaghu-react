import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsAccordion from "./rds-accordion";
import RdsAccordionItem from "./rds-accordion-item";

export default {
    title: "Elements/Accordion",
    component: RdsAccordion,
    argTypes: {},
} as ComponentMeta<typeof RdsAccordion>;

const Template: ComponentStory<typeof RdsAccordion> = (args) => (
    <RdsAccordion {...args} />
);

export const Default = Template.bind({});
Default.args = {
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
};

// outline.args = {
//   accordiontype: "Outline",
//   colorVariant: "primary",
//   outline: true,
//   buttonGroupItems: [
//     {
//       id: "accordionOne",
//       bId: "collapseOne",
//       hId: "headingOne",
//       title: "Section 1 title",
//       state: false,
//       content: "content1",
//       select: null,
//     },
//     {
//       id: "accordiontwo",
//       bId: "collapseTwo",
//       hId: "headingTwo",
//       title: "Section 2 title",
//       state: false,
//       content: "content2",
//       select: null,
//     },
//     {
//       id: "accordionThree",
//       bId: "collapseThree",
//       hId: "headingThree",
//       title: "Section 3 title", 
//       state: false,
//       content: "content3",
//       select: null,
//     },
//   ],
// };

export const Flush = Template.bind({});
Flush.args = {
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
};

export const AlwaysOpen = Template.bind({});
AlwaysOpen.args = {
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
};

export const StackOpen = Template.bind({});
StackOpen.args = {
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
};
