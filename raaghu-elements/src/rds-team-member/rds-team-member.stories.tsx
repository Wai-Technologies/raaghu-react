import React from "react";
import RdsTeamMember from "./rds-team-member";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Components/Team Member',
    component: RdsTeamMember,
    parameters: {
        layout: 'padded',
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
