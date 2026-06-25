import { expect} from 'storybook/test';
import { StoryObj, Meta } from "@storybook/react-vite";
import RdsCompMap from "./rds-comp-map";

const meta: Meta = {
    title: 'Components/Map',
    component: RdsCompMap,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
        docs: {
            description: {
                component: 'The **Map** component is a visual element for displaying geographic data on a world map using Material-UI theming. It supports customizable titles, color schemes, and country-value pairs to represent data such as population, statistics, or metrics for each country. The component integrates seamlessly with MUI themes and provides responsive design, making it ideal for dashboards, analytics, and any interface where visualizing data by country or region is required. Flexible props allow you to tailor its appearance and behavior for a wide range of use cases in your design system.'
            }
        }
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        title: {
            control: { type: 'text' },
            description: 'Title text displayed above the map',
        },
        mapType: {
            control: { type: 'select' },
            options: ['default', 'heatmap'],
            description: 'Select the type of map visualization',
            defaultValue: 'default'
        },
        color: {
            control: { type: 'color' },
            description: 'Primary color for the map visualization',
            if: { arg: 'mapType', neq: 'heatmap' },
        },
    },
} satisfies Meta<typeof RdsCompMap>;

export default meta;
type Story = StoryObj<typeof RdsCompMap>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const el = canvasElement.firstElementChild;
        expect(el).toBeTruthy();
    },
    args: {
        title: 'Map',
        color: '#A478E6',
        mapType: 'default',
        mapList: [
            { country: "cn", value: 1389618778 },
            { country: "in", value: 1311559204 },
            { country: "us", value: 331883986 },
            { country: "id", value: 264935824 },
            { country: "pk", value: 210797836 },
            { country: "br", value: 210301591 },
            { country: "ng", value: 208679114 },
            { country: "bd", value: 161062905 },
            { country: "ru", value: 141944641 },
            { country: "mx", value: 127318112 },
            { country: "jp", value: 126476461 },
            { country: "de", value: 83783942 },
            { country: "fr", value: 65273511 },
            { country: "gb", value: 67886011 },
            { country: "it", value: 60244639 },
            { country: "ca", value: 37742154 },
            { country: "es", value: 46754778 },
            { country: "au", value: 25499884 },
            { country: "br", value: 212559417 },
            { country: "za", value: 59308690 },
            { country: "eg", value: 102334404 },
            { country: "af", value: 1366417754 },
            { country: "sy", value: 17500658 },
            { country: "iq", value: 40222493 },
            { country: "ly", value: 6871292 },
            { country: "sd", value: 43849260 },
            { country: "ye", value: 29825964 },
        ]
    }
} satisfies Story;

