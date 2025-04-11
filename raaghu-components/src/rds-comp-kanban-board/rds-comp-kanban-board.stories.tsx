import type { Meta, StoryObj } from '@storybook/react';
import RdsCompKanbanBoard, { boardInfo } from "./rds-comp-kanban-board";

const meta: Meta = { 
    title: "Components/Kanban Board",
    component: RdsCompKanbanBoard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        boardData: {
            control: 'object',
            description: 'Data for the kanban board'
        },
        allowAddingNewCard: {
            control: 'boolean',
            description: 'Allow adding new boards'
        },
        allowAddingNewSubCard: {
            control: 'boolean',
            description: 'Allow adding new cards within boards'
        }
    },
} satisfies Meta<typeof RdsCompKanbanBoard>;

const moreOptions : any[] = [
    {
        key: "Assign",
        value: "assign"
    },
    {
        key: "View",
        value: "view"
    },
    {
        key: "Delete",
        value: "delete"
    }
];

const moreCardOptions : any[] = [
    {
        key: "Edit",
        value: "edit"
    },
    {
        key: "Delete",
        value: "delete"
    }
];

const sampleItems: boardInfo[] = [
    {
        cardId: 1,
        status: "unassigned",
        name: "Board 1",
        subCardIndex: 0,
        colorType: "primary",
        actions: moreCardOptions,
        subCards: [
            {
                ticketId: "TICKET-001",
                ticketPriority: "High",
                ticketQuestion: "Implement new feature",
                ticketDate: "2024-04-11",
                SubcardId: 0,
                assignedToName: "John Doe",
                assignedTo: "https://raaghustorageaccount.blob.core.windows.net/raaghu-portal-users/Dev/Users/Tenant_314c2f46-43e0-8c8f-e46a-3a1442cdcb69/profPic_48ed5ab7-43fc-d3e3-1c5d-3a14e8ab24c093d03ca9-575e-44ae-acd2-7c71edc3ff09.png",
                actions: moreOptions
            },
            {
                ticketId: "TICKET-002",
                ticketPriority: "Low",
                ticketQuestion: "Fix UI bug in dashboard",
                ticketDate: "2024-04-11",
                SubcardId: 1,
                actions: moreOptions
            }
        ],
        key: 'board-1'
    },
    {
        cardId: 2,
        name: "Board 2",
        subCardIndex: 1,
        colorType: "success",
        actions: moreCardOptions,
        subCards: [
            {
                ticketId: "TICKET-013",
                ticketPriority: "Moderate",
                ticketQuestion: "Update documentation",
                ticketDate: "2024-04-11",
                SubcardId: 2,
                actions: moreOptions
            },
            {
                ticketId: "TICKET-014",
                ticketPriority: "High",
                ticketQuestion: "Performance optimization",
                ticketDate: "2024-04-11",
                SubcardId: 3,
                actions: moreOptions
            }
        ],
        key: 'board-2'
    }
];

export default meta;
type Story = StoryObj<typeof RdsCompKanbanBoard>;

export const Default: Story = {
    args: {
        boardData: sampleItems,
        allowAddingNewCard: true,
        allowAddingNewSubCard: true
    }
} satisfies Story;
