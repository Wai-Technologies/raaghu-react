import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDirectoryList from './rds-comp-directory-list';


const meta: Meta = { 
    title: "Components/DirectoryList",
    component: RdsCompDirectoryList,
    parameters: {
        layout: "",
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompDirectoryList>;

export default meta;
type Story = StoryObj<typeof RdsCompDirectoryList>;

export const Default: Story = {
    args: {
        directoryList: [
            { id: 1, name: 'Directory 1' },
            { id: 2, name: 'Directory 2' },
            // Add more directories as needed
          ],
    }
} satisfies Story;

