import { StoryObj, Meta } from "@storybook/react-vite";
import RdsCompMap from "./rds-comp-map";

const meta: Meta = {
    title: 'Components/Map',
    component: RdsCompMap,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'The **Map** component is a visual element for displaying geographic data on a world map using Material-UI theming. It supports customizable titles, color schemes, and country-value pairs to represent data such as population, statistics, or metrics for each country. The component integrates seamlessly with MUI themes and provides responsive design, making it ideal for dashboards, analytics, and any interface where visualizing data by country or region is required. Flexible props allow you to tailor its appearance and behavior for a wide range of use cases in your design system.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        mapType: {
            control: { type: 'select' },
            options: ['default', 'heatmap'],
            description: 'Select the type of map visualization',
            defaultValue: 'default'
        }
    },
} satisfies Meta<typeof RdsCompMap>;

export default meta;
type Story = StoryObj<typeof RdsCompMap>;

export const Default: Story = {
    args: {
        title: 'Map ',
        color: '#A478E6',
        mapType: 'default',
        mapList: [
            { country: "cn", value: 1389618778 }, // china
            { country: "in", value: 1311559204 }, // india
            { country: "us", value: 331883986 },  // united states
            { country: "id", value: 264935824 },  // indonesia
            { country: "pk", value: 210797836 },  // pakistan
            { country: "br", value: 210301591 },  // brazil
            { country: "ng", value: 208679114 },  // nigeria
            { country: "bd", value: 161062905 },  // bangladesh
            { country: "ru", value: 141944641 },  // russia
            { country: "mx", value: 127318112 }   // mexico
        ]
    }
} satisfies Story;

