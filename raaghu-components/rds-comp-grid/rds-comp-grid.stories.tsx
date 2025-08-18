import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsGrid, { State, ActionColumnStyle } from "./rds-comp-grid";

const meta: Meta = {
	title: "Components/Grid",
	component: RdsGrid,
	parameters: {
		layout: "padded",
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
		tableHeaders: [
			{
				displayName: "Name",
				key: "name",
				datatype: "text",
				sortable: true,
				filter: true,
				resizable: true,
				isBold: true,
			},
			{
				displayName: "Age",
				key: "age",
				datatype: "number",
				sortable: true,
				filter: true,
				resizable: true,
			},
			{
				displayName: "Email",
				key: "email",
				datatype: "text",
				sortable: true,
				filter: true,
				resizable: true,
			},
		],
		tableData: [
			{ id: 1, name: "John Doe", age: 25, email: "john@example.com" },
			{ id: 2, name: "Jane Smith", age: 30, email: "jane@example.com" },
			{ id: 3, name: "Alice Brown", age: 28, email: "alice@example.com" },
		],
		resizableColumns: true,
		enablecheckboxselection: true,
		actions: [
			{ displayName: "Edit", id: "edit" },
			{ displayName: "Delete", id: "delete" },
		],
		actionColumnStyle: ActionColumnStyle.ShowDots,
		showHeader: true,
    showSubHeader:true,
		state: State.Default,
	},
};
