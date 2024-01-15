import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsStepper from "./rds-stepper";

export default {
    title: "Elements/Stepper",
    component: RdsStepper,
    argTypes: {
    
    },
} as ComponentMeta<typeof RdsStepper>;

const Template: ComponentStory<typeof RdsStepper> = (args) => (
    <RdsStepper {...args} />
);

export const Simple = Template.bind({});
Simple.decorators= [
    (Story) => (
        <div style={{ padding:"5% 5%" ,
        }}>
            <Story/>
        </div>
    ),
],
Simple.args = {
    stepperType: "simple",
};

