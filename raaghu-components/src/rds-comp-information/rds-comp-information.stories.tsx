import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompInformation from "./rds-comp-information";


const meta: Meta = { 
    title: "Components/Information",
    component: RdsCompInformation,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Information** component is a customizable UI element designed to display and manage informational data within your application. It supports an `inputTypeList` array to define input types and an `informationItemInitial` object to initialize property details such as `propertyName`, `displayName`, and `inputValue`. This component is ideal for use cases such as data entry forms, configuration panels, or any interface requiring structured information management. Fully customizable, the Information component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompInformation>;

export default meta;
type Story = StoryObj<typeof RdsCompInformation>;

export const Standard: Story = {
    args: {
        inputTypeList: [
            {
                label: "Input Type 1",
            },
            {
                label: "Input Type 2",
            },
            {
                label: "Input Type 3",
            },
            {
                label: "Input Type 4",
            },
        ],
        informationItemInitial: {
            propertyName: "demo",
            displayName: "demo",
            inputValue: "demo",
        },    
        reset: false,
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['inputTypeList', 'informationItemInitial', 'reset'] } };




