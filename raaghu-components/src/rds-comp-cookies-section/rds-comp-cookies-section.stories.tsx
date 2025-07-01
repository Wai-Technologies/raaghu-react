import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompCookiesSection from "./rds-comp-cookies-section";

const meta: Meta = {
    title: "Components/Cookies Section",
    component: RdsCompCookiesSection,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Cookies Section** component is a simple and customizable UI element designed to display a cookies consent banner within your application. It provides an option to include a "Decline" button using the `showDeclineButton` property, allowing users to either accept or decline cookies. This component is ideal for compliance with privacy regulations, such as GDPR, by providing users with clear choices regarding cookie usage. Fully customizable, the Cookies Section component can be tailored to align with your design system and functional requirements, ensuring a seamless and user-friendly experience.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCookiesSection>;

export default meta;
type Story = StoryObj<typeof RdsCompCookiesSection>;

export const Default: Story = {
    args: {
        showDeclineButton: true,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['showDeclineButton'] } };




