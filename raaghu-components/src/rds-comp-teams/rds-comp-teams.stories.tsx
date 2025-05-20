import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTeams from "./rds-comp-teams";


const meta: Meta = { 
    title: "Components/Teams",
    component: RdsCompTeams,
    parameters: {
        layout: 'padded',
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
                imgLink: "https://media.istockphoto.com/id/499728904/photo/unknown-person-silhouette.jpg?s=1024x1024&w=is&k=20&c=cvcV9WvqFt691KAQCXPzFexJ5VVSIYx4lBlhPXwydaE=",
                twitterIcon: "twitter",
                linkdineIcon: "linkedin",
                description: "Lorem ipsum dolor sit amet conr adipiscing elit"
            },],
            [{
                title: "Wily",
                subTitle: "Web Developer",
                imgLink: "https://media.istockphoto.com/id/499728904/photo/unknown-person-silhouette.jpg?s=1024x1024&w=is&k=20&c=cvcV9WvqFt691KAQCXPzFexJ5VVSIYx4lBlhPXwydaE=",
                twitterIcon: "twitter",
                linkdineIcon: "linkedin",
                description: "Lorem ipsum dolor sit amet conr adipiscing elit"
            },],
            [{
                title: "Vivek",
                subTitle: "Web Developer",
                imgLink: "https://media.istockphoto.com/id/499728904/photo/unknown-person-silhouette.jpg?s=1024x1024&w=is&k=20&c=cvcV9WvqFt691KAQCXPzFexJ5VVSIYx4lBlhPXwydaE=",
                twitterIcon: "twitter",
                linkdineIcon: "linkedin",
                description: "Lorem ipsum dolor sit amet conr adipiscing elit"
            },],
            [{
                title: "Riya",
                subTitle: "Web Developer",
                imgLink: "https://media.istockphoto.com/id/499728904/photo/unknown-person-silhouette.jpg?s=1024x1024&w=is&k=20&c=cvcV9WvqFt691KAQCXPzFexJ5VVSIYx4lBlhPXwydaE=",
                twitterIcon: "twitter",
                linkdineIcon: "linkedin",
                description: "Lorem ipsum dolor sit amet conr adipiscing elit"
            }]
        ]
    }
} satisfies Story;
Default.parameters = { controls: { include: ['teamItem'] } };
