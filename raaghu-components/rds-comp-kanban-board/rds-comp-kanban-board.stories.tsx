import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import RdsCompKanbanBoard from "./rds-comp-kanban-board";
import { boardInfo } from "./kanban-board-helpers";
import type { KanbanAction } from "./kanban-board-helpers";





const meta: Meta = { 
    title: "Components/Kanban Board",
    component: RdsCompKanbanBoard,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
    controls: {
    exclude: ['onCardAction', 'onColumnAction', 'onCardAdd', 'onColumnsChange', 'onSubCardOption', 'onCardOption', 'onAddQuestionSaveHandler', 'onBoardDataChange', 'onSelectedTagsListChange', 'isIlliustrationSmall', 'illustration'],
    },

        docs: {
    description: {
        component: 
            'The **Kanban Board** component is a customizable UI element designed to display and manage tasks or items in a Kanban-style board format. It supports features such as dynamic card creation, sub-card management, and customizable actions for cards and sub-cards. The component uses a `columns` (or `defaultColumns`) array to define board items, with properties like `cardId`, `status`, `name`, `subCards`, and `actions`. This component is ideal for project management tools, task tracking systems, or any application requiring a visual workflow management interface. Fully customizable, the Kanban Board component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        className: { control: 'text', description: 'CSS class applied to the Kanban board root.' },
        sx: { control: 'object', description: 'MUI system styles applied to the Kanban board root.' },
        ref: { control: false, description: 'React ref to the Kanban board root; assign it in code.' },
        noDataTitle: {
            table: { disable: true },
        },
        noDataHeaderTitle: {
            table: { disable: true },
        },
        onClick: {
            table: { disable: true },
        },
        addQuestionData: {
            table: { disable: true },
        },
    },
} satisfies Meta<typeof RdsCompKanbanBoard>;

const kanbanAvatarData = [
    { title: 'Jane Doe', subText: 'Developer', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { title: 'John Smith', subText: 'Designer', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },

];

const moreOptions: KanbanAction[] = [
  { key: "Assign", value: "assign" },
  { key: "View", value: "view" },
  { key: "Delete", value: "delete" },
];

const moreCardOptions: KanbanAction[] = [
  { key: "Edit", value: "edit" },
  { key: "Delete", value: "delete" },

];
const sampleItems: boardInfo[] = [
    {
        cardId: 1,
        status: "unassigned",
        name: "Board 2",
        subCardIndex: 0,
        color: "primary",
        actions: moreCardOptions,
        key: "board-2",
        subCards: [
            {
                ticketId: "1",
                ticketPriority: "High",
                ticketQuestion: "",
                ticketDate: "12th Jun 2023",
                SubcardId: 0,
                displayId: "RDS110110",
                badge: "Badge",
                description: "This is a sample text\nThis is a sample text\nThis is a sample text",
                actions: moreOptions,
            },
            {
                ticketId: "2",
                ticketPriority: "Low",
                ticketQuestion: "",
                ticketDate: "12th Jun 2023",
                SubcardId: 1,
                displayId: "RDS110110",
                badge: "Badge",
                description: "This is a sample text\nThis is a sample text\nThis is a sample text",
                actions: moreOptions,
            },
        ],
    },
];

export default meta;
type Story = StoryObj<typeof RdsCompKanbanBoard>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const el = canvasElement.firstElementChild;
        expect(el).toBeTruthy();
    },
    args: {
        allowAddColumn: true,
        defaultColumns: sampleItems,
        allowAddCard: true,
        avatarData: kanbanAvatarData,

        categoryOptions: [
            { label: "Category 1", val: "category1" },
            { label: "Category 2", val: "category2" },
            { label: "Category 3", val: "category3" },
            { label: "Category 4", val: "category4" },
            { label: "Category 5", val: "category5" },
            { label: "Category 6", val: "category6" },
        ],
        tagOptions: [
            { label: "Tag 1", val: "tag1" },
            { label: "Tag 2", val: "tag2" },
            { label: "Tag 3", val: "tag3" },
            { label: "Tag 4", val: "tag4" },
            { label: "Tag 5", val: "tag5" },
            { label: "Tag 6", val: "tag6" },
        ],

    }
} satisfies Story;
