import React from "react";
import RdsTeamMember from "./rds-team-member";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Team Member',
    component: RdsTeamMember,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Team Member** component is a versatile and customizable UI element designed to showcase individual team members or profiles in your application. It supports displaying key details such as the member’s **name**, **designation**, **profile image**, and **description**. The component also allows integration of social media icons (e.g., Twitter, LinkedIn) for enhanced interactivity. You can dynamically populate the component using the **teamItem** array, where each object represents a team member with properties like `title`, `subTitle`, `imgLink`, `twitterIcon`, `linkdineIcon`, and `description`. This component is ideal for creating team sections on websites, organizational directories, or any interface requiring structured and visually appealing member profiles. Fully customizable, the Team Member component can be tailored to fit your design system and branding requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsTeamMember>;

export default meta;
type Story = StoryObj<typeof RdsTeamMember>;

export const MemberProfileCard: Story = {
    args: {
        teamItem: [
            {
                title: "Tina",
                subTitle: "Web Developer",
                imgLink: "https://t4.ftcdn.net/jpg/04/10/43/77/240_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
                twitterIcon: "star",
                linkdineIcon: "star",
                description: "Lorem ipsum dolor sit amet conr adipiscing elit"
            }
        ]
    }
} satisfies Story;
MemberProfileCard.parameters = { controls: { include: ['teamItem'] } };
