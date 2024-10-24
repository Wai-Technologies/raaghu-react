import type { Meta, StoryObj } from '@storybook/react';
import RdsCompBlogPostNew from './rds-comp-blog-post-new';


const meta: Meta = { 
    title: "Components/Blog Post",
    component: RdsCompBlogPostNew,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompBlogPostNew>;

export default meta;
type Story = StoryObj<typeof RdsCompBlogPostNew>;

export const Default: Story = {
    args: {
        blogList: [
            { option: "Blog1" , value: "blog1"},
            { option: "Blog2" , value: "blog2"},
            { option: "Blog3" , value: "blog3"},
        ],
    }
} satisfies Story;
// Default.parameters = { controls: { include: [] } };