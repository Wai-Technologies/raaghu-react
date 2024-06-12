import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTopNavigation from "./rds-comp-top-navigation";


const meta: Meta = { 
    title: "Components/Top Navigation",
    component: RdsCompTopNavigation,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        displayType: {
            options: [
                "basic",
                "advanced"
            ],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompTopNavigation>;

export default meta;
type Story = StoryObj<typeof RdsCompTopNavigation>;

export const Default: Story = {
    args: {
        displayType: "basic",
        navbarTitle: "Dashboard",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        notifications: [
            {
                status: "success",
                title: "Tenant added",
                urlTitle: "hello",
                time: "a month ago",
                state: 1,
                userNotificationId: 0,
                selected: false,
            },
    
            {
                status: "error",
                title: "Tenant deleted",
                urlTitle: "hello",
                time: "a month ago",
                state: 1,
                userNotificationId: 1,
                selected: false,
            },
    
            {
                status: "warn",
                title: "Tenant added  warn",
                urlTitle: "hello",
                time: "a month ago",
                state: 1,
                userNotificationId: 2,
                selected: false,
            },
    
            {
                status: "info",
                title: "Tenant deleted info",
                urlTitle: "hello",
                time: "a month ago",
                state: 1,
                userNotificationId: 3,
                selected: false,
            },
        ],    
        languageItems: [
            {
                label: "EN(US)",
                val: "en",
                icon: "us",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "English(IND)",
                val: "en",
                icon: "in",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "French",
                val: "fr",
                icon: "us",
                iconWidth: "20px",
                iconHeight: "20px",
            },
        ],
        themeItems: [
            {
                label: "Light",
                val: "light",
                icon: "sun",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Dark",
                val: "dark",
                icon: "moon",
                iconWidth: "20px",
                iconHeight: "20px",
            }
        ]
    }
} satisfies Story;

export const Advanced: Story = {
    args: {
        displayType: "advanced",
        navbarTitle: "Dashboard",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://raaghustorageaccount.blob.core.windows.net/raaghu-portal/raaghu-enterprise-logo-lightmode.png",
    }
} satisfies Story;
