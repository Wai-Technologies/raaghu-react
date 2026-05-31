import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from '@storybook/test';
import RdsCompDetailsPane from "./rds-comp-details-pane";


const figmaIconSrc = "assets/figma.png"

const storybookIconSrc = "assets/storybook.png"

const meta: Meta = { 
    title: "Components/Details Pane",
    component: RdsCompDetailsPane,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        style: {
            options: ["Favourites", "Favourites - New Folder", "Prompt History", "Real Estate","Selection","Toolbar","Thumbnail View"],
            control: { type: "select" },
        },
          figmaIconSrc: {
            control: { type: "text" },
        },
        storybookIconSrc: {
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof RdsCompDetailsPane>;

export default meta;
type Story = StoryObj<typeof RdsCompDetailsPane>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const el = canvasElement.firstElementChild;
        expect(el).toBeTruthy();
    },
    args: {
        headerText: "My Activity",
        historyTabLabel: "History",
        favouritesTabLabel: "Favourites",
        addtoscreen: "Add to Screen",
        addtofolder: "Add to Folder",
        style: "Favourites",        
        estateTitle: "Serene Studio Housing",
        estateDescription: "This studio room is located in Major city. The famous Amazon and Amazonia beaches are approximately 10 minutes walk from here. The room has a kitchenette with basic utensils for cooking. There is a private attached bathroom. We have a smart tv for your entertainment. We provide complimentary Wi-Fi to our guests who also want to work.",
        carouselImages: [
            { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", alt: "Night Sky" },
            { src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80", alt: "Night Sky" }
        ],
         figmaIconSrc: figmaIconSrc,
        storybookIconSrc: storybookIconSrc,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['headerText','historyTabLabel','favouritesTabLabel','addtoscreen','addtofolder','style'] } };