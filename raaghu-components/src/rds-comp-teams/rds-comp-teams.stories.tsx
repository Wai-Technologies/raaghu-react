import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTeams from "./rds-comp-teams";


const meta: Meta = { 
    title: "Components/Teams",
    component: RdsCompTeams,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Teams** component is a flexible and visually appealing UI element designed to showcase team member profiles. It allows you to display individual team members with attributes such as name, role, profile image, social media links (e.g., Twitter, LinkedIn), and a brief description. This component supports grouping team members into categories or sections, making it ideal for team introductions, organizational charts, or project showcases. Fully customizable, the Teams component ensures consistency with your design system while providing an intuitive interface for presenting team information effectively. It is perfect for corporate websites, portfolios, or any application requiring professional team presentations.'
    },
},
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompTeams>;

export default meta;
type Story = StoryObj<typeof RdsCompTeams>;

export const Standard: Story = {
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
Standard.parameters = { controls: { include: ['teamItem'] } };
