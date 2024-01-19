import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsTeamMember from "./rds-team-member";

export default {
    title: "Elements/Team Member",
    component: RdsTeamMember,
    argTypes: {
    
    },
} as ComponentMeta<typeof RdsTeamMember>;

const Template: ComponentStory<typeof RdsTeamMember> = (args) => (
    <RdsTeamMember {...args} />
);

export const TeamMember = Template.bind({});
TeamMember.args = {
    teamItem :[
        {
            title: "Tina",
            subTitle: "Web Developer",
            imgLink:"https://t4.ftcdn.net/jpg/04/10/43/77/240_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
            twitterIcon: "star",
            linkdineIcon: "star",
            description: "Lorem ipsum dolor sit amet conr adipiscing elit"
        } 
    ]
};
