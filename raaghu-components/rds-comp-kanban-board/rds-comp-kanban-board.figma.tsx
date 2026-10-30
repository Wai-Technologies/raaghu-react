
import React from "react";
import RdsCompKanbanBoard from "./rds-comp-kanban-board";
import figma from "@figma/code-connect";

figma.connect(
  RdsCompKanbanBoard,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=3840-2803",
  {
    props: {},
    example: (props) => (
      <RdsCompKanbanBoard
        addQuestionData={{}}
        categoryOptions={[
          { label: "Category 1", val: "category1" },
          { label: "Category 2", val: "category2" },
          { label: "Category 3", val: "category3" },
          { label: "Category 4", val: "category4" },
          { label: "Category 5", val: "category5" },
          { label: "Category 6", val: "category6" },
        ]}
        tagOptions={[
          { label: "Tag 1", val: "tag1" },
          { label: "Tag 2", val: "tag2" },
          { label: "Tag 3", val: "tag3" },
          { label: "Tag 4", val: "tag4" },
          { label: "Tag 5", val: "tag5" },
          { label: "Tag 6", val: "tag6" },
        ]}
        allowAddingDynamicData
        allowAddColumn
        allowAddCard
        defaultColumns={[
          {
            actions: [
              { key: "Edit", value: "edit" },
              { key: "Delete", value: "delete" },
            ],
            cardId: 1,
            color: "primary",
            key: "",
            name: "Board 1",
            status: "unassigned",
            subCardIndex: 0,
            subCards: [
              {
                SubcardId: 0,
                actions: [
                  { key: "Assign", value: "assign" },
                  { key: "View", value: "view" },
                  { key: "Delete", value: "delete" },
                ],
                ticketDate: "12th Jun 2023",
                ticketId: "1",
                ticketPriority: "High",
                ticketQuestion: "Question 1",
              },
              {
                SubcardId: 1,
                actions: [
                  { key: "Assign", value: "assign" },
                  { key: "View", value: "view" },
                  { key: "Delete", value: "delete" },
                ],
                ticketDate: "12th Jun 2023",
                ticketId: "2",
                ticketPriority: "Low",
                ticketQuestion: "Question 2",
              },
            ],
          },
        ]}
        noDataHeaderTitle="Demo 1"
        noDataTitle="Demo"
      />
    ),
  }
);
