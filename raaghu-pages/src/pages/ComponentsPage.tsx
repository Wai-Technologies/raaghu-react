import RdsTypography from '@raaghu/elements/rds-typography/rds-typography';
import RdsCompKanbanBoard from '@raaghu/components/rds-comp-kanban-board/rds-comp-kanban-board';
import RdsCompFilterButton from '@raaghu/components/rds-comp-filter-button/rds-comp-filter-button';
import RdsCompNotification from '@raaghu/components/rds-comp-notification/rds-comp-notification';
import type { boardInfo } from '@raaghu/components/rds-comp-kanban-board/kanban-board-helpers';
import '@raaghu/components/rds-comp-kanban-board/rds-comp-kanban-board.scss';
import '@raaghu/components/rds-comp-filter-button/rds-comp-filter-button.scss';
import '@raaghu/components/rds-comp-notification/rds-comp-notification.scss';
import '../App.css';

const moreOptions = [
  { key: 'View', value: 'view' },
  { key: 'Delete', value: 'delete' },
];

const sampleBoard: boardInfo[] = [
  {
    cardId: 1,
    status: 'unassigned',
    name: 'To do',
    subCardIndex: 0,
    colorType: 'primary',
    actions: moreOptions,
    subCards: [
      {
        ticketId: '1',
        ticketPriority: 'High',
        ticketQuestion: 'Review design tokens',
        ticketDate: 'Today',
        SubcardId: 0,
        actions: moreOptions,
      },
    ],
    key: 'board-1',
  },
  {
    cardId: 2,
    status: 'in-progress',
    name: 'In progress',
    subCardIndex: 0,
    colorType: 'success',
    actions: moreOptions,
    subCards: [],
    key: 'board-2',
  },
];

const demoFilters = [
  {
    id: 'status',
    name: 'Status',
    values: ['Open', 'Closed', 'Pending'],
    selectedValues: ['Open'],
  },
  {
    id: 'priority',
    name: 'Priority',
    values: ['High', 'Medium', 'Low'],
  },
];

export default function ComponentsPage() {
  return (
    <div>
      <RdsTypography variant="h4" className="rds-demo-section-title">
        Components
      </RdsTypography>

      <section className="rds-demo-section">
        <RdsTypography variant="h6" className="rds-demo-section-title">
          Toolbar
        </RdsTypography>
        <div className="rds-demo-grid">
          <RdsCompFilterButton text="Filter" filters={demoFilters} />
          <RdsCompNotification
            notifications={[
              {
                title: 'System update',
                description: 'Raaghu tokens were applied successfully.',
                time: '2m ago',
              },
            ]}
          />
        </div>
      </section>

      <section className="rds-demo-section">
        <RdsTypography variant="h6" className="rds-demo-section-title">
          Kanban board
        </RdsTypography>
        <RdsCompKanbanBoard
          allowAddingNewCard
          allowAddingNewSubCard
          boardData={sampleBoard}
        />
      </section>
    </div>
  );
}
