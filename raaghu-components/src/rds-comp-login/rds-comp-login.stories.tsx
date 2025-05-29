import type { Meta, StoryObj } from '@storybook/react';
import RdsCompLogin from "./rds-comp-login";

const meta: Meta = { 
    title: "Components/Login",
    component: RdsCompLogin,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Login** component is a customizable UI element designed to handle user authentication workflows within your application. It supports multilingual functionality through a `languageData` array, allowing users to select their preferred language. This component is ideal for login pages, authentication systems, or any interface requiring a user-friendly and localized login experience. Fully customizable, the Login component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompLogin>;

export default meta;
type Story = StoryObj<typeof RdsCompLogin>;

export const Default: Story = {
    args: {
        languageData: [
            {
                label: "EN(US)",
                val: "en",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "English(IND)",
                val: "en",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Français",
                val: "fr",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Deutsch",
                val: "de",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Português (Brasil)",
                val: "pt-BR",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Türkçe",
                val: "tr",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Italiano",
                val: "it",
                iconWidth: "20px",
                iconHeight: "20px",
            },
        ],
    }
} satisfies Story;