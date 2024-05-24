import type { Meta, StoryObj } from '@storybook/react';
import RdsCompKanbanBoard from "./rds-comp-kanban-board";


const meta: Meta = { 
    title: "Components/Kanban Board",
    component: RdsCompKanbanBoard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompKanbanBoard>;

export default meta;
type Story = StoryObj<typeof RdsCompKanbanBoard>;

export const Default: Story = {
    args: {
        
    }
} satisfies Story;




