import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsGrid, { State, ActionColumnStyle } from "./rds-comp-grid";

const meta: Meta = {
	title: "Components/Grid",
	component: RdsGrid,
	parameters: {
		layout: "padded",
		controls: {
			exclude: ['fontWeight','enablecheckboxselection','enableRadioButtonselection','illustration','noDataTitle','classes','swapRows','options','isSwap','actions','isClickable','recordsPerPageSelectListOption','onActionSelection','onRowSelect','onRowClick','onPaginationHandler','totalRecords','actionColumnStyle','showAddNewColumn','actionPosition'],
		},
		docs: {
			description: {
				component:
					"A flexible, MUI-based grid component supporting sorting, filtering, resizable columns, selection, and actions."
			}
		}
	},
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof RdsGrid>;

export const Standard: Story = {
	 args: {
		 showHeader: true,
		 showSubHeader: true,
	resizableColumns: false,
		 state: State.Default,
		 tableHeaders: [
			 {
				 dataLength: 30,
				 datatype: 'text',
				 displayName: 'Edition',
				 filter: true,
				 key: 'edition',
				 required: true,
				 resizable: true,
				 sortable: true
			 },
			 {
				 dataLength: 30,
				 datatype: 'text',
				 displayName: 'Author',
				 filter: true,
				 key: 'author',
				 required: true,
				 resizable: true,
				 sortable: true
			 },
			 {
				 dataLength: 30,
				 datatype: 'text',
				 displayName: 'Year',
				 filter: true,
				 key: 'year',
				 required: true,
				 resizable: true,
				 sortable: true
			 },
			 {
				 dataLength: 30,
				 datatype: 'text',
				 displayName: 'Publisher',
				 filter: true,
				 key: 'publisher',
				 required: true,
				 resizable: true,
				 sortable: true
			 },
			 {
				 dataLength: 30,
				 datatype: 'text',
				 displayName: 'Status',
				 filter: true,
				 key: 'status',
				 required: true,
				 resizable: true,
				 sortable: true
			 },
			 {
				 dataLength: 30,
				 datatype: 'text',
				 displayName: 'Value',
				 filter: true,
				 key: 'value',
				 required: true,
				 resizable: true,
				 sortable: true
			 }
		 ],
		 tableData: [
			 { edition: 'First', author: 'John Doe', year: '2020', publisher: 'Acme', status: 'Active', value: '100' },
			 { edition: 'Second', author: 'Jane Smith', year: '2021', publisher: 'Beta', status: 'Inactive', value: '200' },
			 { edition: 'Third', author: 'Alice', year: '2022', publisher: 'Gamma', status: 'Active', value: '300' },
			 { edition: 'Fourth', author: 'Bob', year: '2023', publisher: 'Delta', status: 'Pending', value: '400' },
			 { edition: 'Fifth', author: 'Charlie', year: '2024', publisher: 'Epsilon', status: 'Active', value: '500' },
			 { edition: 'Sixth', author: 'Diana', year: '2025', publisher: 'Zeta', status: 'Inactive', value: '600' }
		 ]
	 }
};
