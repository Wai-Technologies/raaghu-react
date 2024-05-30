import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDirectoryList from './rds-comp-directory-list';


const meta: Meta = { 
    title: "Components/DirectoryList",
    component: RdsCompDirectoryList,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;

const Template = (args:any) => <RdsCompDirectoryList {...args} />;

export const Default = Template.bind({});

Default.args = {
    items: [
        { id: '1', name: 'Directory 1' },
        { id: '2', name: 'Directory 2' },
        { id: '3', name: 'Directory 3' },
       
    ],
};