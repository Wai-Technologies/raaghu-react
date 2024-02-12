import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTeams from "./rds-comp-teams";


const meta: Meta = { 
    title: "Components/Teams",
    component: RdsCompTeams,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompTeams>;

export default meta;
type Story = StoryObj<typeof RdsCompTeams>;

export const Default: Story = {
    args: {
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
            }
    
} satisfies Story;




