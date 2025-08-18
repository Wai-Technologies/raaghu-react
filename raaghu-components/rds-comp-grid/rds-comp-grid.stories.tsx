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
		showHeader: true,
		showSubHeader: true,
		state: State.Default,
		tableHeaders: [
			{
				dataLength: 30,
				datatype: 'text',
				displayName: 'Title',
				filter: true,
				key: 'edition',
				required: true,
				resizable: true,
				sortable: true
			},
			{
				dataLength: 30,
				datatype: 'text',
				displayName: 'Title',
				filter: true,
				key: 'edition',
				required: true,
				sortable: true
			},
			{
				dataLength: 30,
				datatype: 'text',
				displayName: 'Title',
				filter: true,
				key: 'edition',
				required: true,
				sortable: true
			},
			{
				dataLength: 30,
				datatype: 'text',
				displayName: 'Title',
				filter: true,
				key: 'edition',
				required: true,
				sortable: true
			},
			{
				dataLength: 30,
				datatype: 'text',
				displayName: 'Title',
				filter: true,
				key: 'edition',
				required: true,
				sortable: true
			}
		],
		tableData: [
			{ edition: 'Text', id: 1 },
			{ edition: 'Text', id: 2 },
			{ edition: 'Text', id: 3 },
			{ edition: 'Text', id: 4 },
			{ edition: 'Text', id: 5 },
			{ edition: 'Text', id: 6 },
			{ edition: 'Text', id: 7 },
			{ edition: 'Text', id: 8 },
			{ edition: 'Text', id: 9 }
		]
	}
};
