import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Standard: Story = {
    args: {
        headerText: "My Activity",
        historyTabLabel: "History",
        favouritesTabLabel: "Favourites",
        addtoscreen: "Add to Screen",
        addtofolder: "Add to Folder",
        style: "Favourites"
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['headerText','historyTabLabel','favouritesTabLabel','addtoscreen','addtofolder','style'] } };


export const Favourites: Story = {
    args: {
        headerText: "My Activity",
        historyTabLabel: "History",
        favouritesTabLabel: "Favourites",
        addtoscreen: "Add to Screen",
        addtofolder: "Add to Folder",
        style: "Favourites"
    }
} satisfies Story;

Favourites.parameters = { controls: { include: ['headerText','historyTabLabel','favouritesTabLabel','addtoscreen','addtofolder','style'] } };

export const FavouritesNewFolder: Story = {
    args: {
        headerText: "My Activity",
        historyTabLabel: "History",
        favouritesTabLabel: "Favourites",
        addtoscreen: "Add to Screen",
        addtofolder: "Add to Folder",
        style: "Favourites - New Folder"
    }
} satisfies Story;
FavouritesNewFolder.parameters = { controls: { include: ['headerText','historyTabLabel','favouritesTabLabel','addtoscreen','addtofolder','style'] } };

export const PromptHistory: Story = {
    args: {
        historyTabLabel: "History",
        favouritesTabLabel: "Favourites",
        style: "Prompt History"
    }
} satisfies Story;
PromptHistory.parameters = { controls: { include: ['historyTabLabel','favouritesTabLabel','style'] } };


export const RealEstate: Story = {
    args: {
        estateTitle:"Serene Studio Housing",
        estateDescription:"This studio room is located in Major city. The famous Amazon and Amazonia beaches are approximately 10 minutes walk from here. The room has a kitchenette with basic utensils for cooking. There is a private attached bathroom. We have a smart tv for your entertainment. We provide complimentary Wi-Fi to our guests who also want to work.",
        style: "Real Estate"
    }
} satisfies Story;
RealEstate.parameters = { controls: { include: ['estateTitle','estateDescription','style'] } };

export const Selection: Story = {
    args: {
      headerText: "Bayshore Transportation System",
      headerSubText: "Agent Information",
      style: "Selection"
    }
} satisfies Story;
Selection.parameters = { controls: { include: ['headerText','headerSubText','style'] } };

export const Toolbar: Story = {
    args: {
        style: "Toolbar"
    }
} satisfies Story;
Toolbar.parameters = { controls: { include: ['style'] } };


export const ThumbnailView: Story = {
    args: {
        thumbnailButtonName:"Download Project",
        style: "Thumbnail View"
    }
} satisfies Story;
ThumbnailView.parameters = { controls: { include: ['thumbnailButtonName','style'] } };
