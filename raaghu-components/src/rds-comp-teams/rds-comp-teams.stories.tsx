import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompTeams from "./rds-comp-teams";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Teams",
    component: RdsCompTeams,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],

} as ComponentMeta<typeof RdsCompTeams>;


const Template: ComponentStory<typeof RdsCompTeams> = (args) =>
    <RdsCompTeams {...args} />;


export const Teams = Template.bind({});
Teams.args = {
    teamItem: [
        [{
            title: "Tina",
            subTitle: "Web Developer",
            imgLink: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png?W=100",
            twitterIcon: "twitter",
            linkdineIcon: "linkedin",
            description: "Lorem ipsum dolor sit amet conr adipiscing elit"
        },],
        [{
            title: "Wily",
            subTitle: "Web Developer",
            imgLink: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png?W=100",
            twitterIcon: "twitter",
            linkdineIcon: "linkedin",
            description: "Lorem ipsum dolor sit amet conr adipiscing elit"
        },],
        [{
            title: "Vivek",
            subTitle: "Web Developer",
            imgLink: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png?W=100",
            twitterIcon: "twitter",
            linkdineIcon: "linkedin",
            description: "Lorem ipsum dolor sit amet conr adipiscing elit"
        },],
        [{
            title: "Riya",
            subTitle: "Web Developer",
            imgLink: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png?W=100",
            twitterIcon: "twitter",
            linkdineIcon: "linkedin",
            description: "Lorem ipsum dolor sit amet conr adipiscing elit"
        }]
    ]
};