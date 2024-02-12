// /* eslint-disable */
// import React from 'react';
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import RdsCompBlogPostNew from './rds-comp-blog-post-new';
// import { I18nextProvider } from "react-i18next";
// import i18n from "../../../.storybook/i18n";

// export default {
//   title: "Components/Blog Post New",
//   component: RdsCompBlogPostNew,
//   decorators: [
//     (StoryComponent) => (
//       <I18nextProvider i18n={i18n}>
//         <StoryComponent />
//       </I18nextProvider>
//     ),
//   ],
// } as ComponentMeta<typeof RdsCompBlogPostNew>;

// const Template: ComponentStory<typeof RdsCompBlogPostNew> = (args) => (
//   <RdsCompBlogPostNew {...args} />
// );

// export const BlogPostNew = Template.bind({});

// BlogPostNew.story = {
//   name: 'default'
// };

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompBlogPostNew from './rds-comp-blog-post-new';


const meta: Meta = { 
    title: "Components/Blog Post New",
    component: RdsCompBlogPostNew,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompBlogPostNew>;

export default meta;
type Story = StoryObj<typeof RdsCompBlogPostNew>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;