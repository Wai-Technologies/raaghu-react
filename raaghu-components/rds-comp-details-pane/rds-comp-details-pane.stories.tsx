import type { Meta, StoryObj } from '@storybook/react';
import RdsCompDetailsPane from "./rds-comp-details-pane";


const meta: Meta = { 
    title: "Components/Details Pane",
    component: RdsCompDetailsPane,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        style: {
            options: ["Favourites", "Favourites - New Folder", "Prompt History", "Real Estate","Selection","Toolbar","Thumbnail View"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompDetailsPane>;

export default meta;
type Story = StoryObj<typeof RdsCompDetailsPane>;

export const Default: Story = {
    args: {
        headerText: "My Activity",
        historyTabLabel: "History",
        favouritesTabLabel: "Favourites",
        addtoscreen: "Add to Screen",
        addtofolder: "Add to Folder",
        style: "Favourites"
    }
} satisfies Story;
Default.parameters = { controls: { include: ['headerText','historyTabLabel','favouritesTabLabel','addtoscreen','addtofolder','style'] } };


