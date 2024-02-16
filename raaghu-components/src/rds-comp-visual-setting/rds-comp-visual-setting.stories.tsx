import type { Meta, StoryObj } from '@storybook/react';
import RdsCompVisualSetting from "./rds-comp-visual-setting";

const meta: Meta = {
    title: "Components/Visual Setting",
    component: RdsCompVisualSetting,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompVisualSetting>;

export default meta;
type Story = StoryObj<typeof RdsCompVisualSetting>;

export const Default: Story = {
    args: {
        visualsettingsItem: [
            {
                footer: { fixedFooter: false },
                header: {
                    desktopFixedHeader: true,
                    mobileFixedHeader: true,
                    headerSkin: null,
                    minimizeDesktopHeaderType: null,
                },
                layout: { layoutType: "fluid" },
                menu: {
                    allowAsideMinimizing: false,
                    asideSkin: "dark",
                    defaultMinimizedAside: false,
                    enableSecondary: false,
                    fixedAside: false,
                    hoverableAside: false,
                    position: "tab",
                    searchActive: false,
                    submenuToggle: null,
                },
                subheader: {
                    containerStyle: "subheader py-2 py-lg-4  subheader-transparent",
                    fixedSubHeader: true,
                    subheaderSize: 5,
                    subheaderStyle: null,
                    titleStlye: "text-dark font-weight-bold my-2 mr-5",
                },
                themeId: "default",
            },
            {
                footer: { fixedFooter: false },
                header: {
                    desktopFixedHeader: true,
                    mobileFixedHeader: true,
                    headerSkin: null,
                    minimizeDesktopHeaderType: null,
                },
                layout: { layoutType: "fluid" },
                menu: {
                    allowAsideMinimizing: false,
                    asideSkin: "dark",
                    defaultMinimizedAside: false,
                    enableSecondary: false,
                    fixedAside: false,
                    hoverableAside: false,
                    position: "tab",
                    searchActive: false,
                    submenuToggle: null,
                },
                subheader: {
                    containerStyle: "subheader py-2 py-lg-4  subheader-transparent",
                    fixedSubHeader: false,
                    subheaderSize: 5,
                    subheaderStyle: null,
                    titleStlye: "text-dark font-weight-bold my-2 mr-5",
                },
                themeId: "dark",
            },
            {
                footer: { fixedFooter: true },
                header: {
                    desktopFixedHeader: true,
                    mobileFixedHeader: true,
                    headerSkin: null,
                    minimizeDesktopHeaderType: null,
                },
                layout: { layoutType: "fluid" },
                menu: {
                    allowAsideMinimizing: false,
                    asideSkin: "dark",
                    defaultMinimizedAside: false,
                    enableSecondary: false,
                    fixedAside: false,
                    hoverableAside: false,
                    position: "tab",
                    searchActive: false,
                    submenuToggle: null,
                },
                subheader: {
                    containerStyle: "subheader py-2 py-lg-4  subheader-transparent",
                    fixedSubHeader: false,
                    subheaderSize: 5,
                    subheaderStyle: null,
                    titleStlye: "text-dark font-weight-bold my-2 mr-5",
                },
                themeId: "accessible",
            },
        ],
        navtabItems: [
            {
                themeId: "default",
                navtabs: [
                    {
                        label: "Subheader",
                        tablink: "#nav-subheader",
                        ariacontrols: "nav-subheader",
                        id: "subheader",
                    },
                    {
                        label: "Menu",
                        tablink: "#nav-Menu",
                        ariacontrols: "nav-Menu",
                        id: "menu",
                    },
                    {
                        label: "Footer",
                        tablink: "#nav-footer",
                        ariacontrols: "nav-footer",
                        id: "footer",
                    },

                ],
            },
            {
                themeId: "dark",
                navtabs: [
                    {
                        label: "Header Bar",
                        tablink: "#nav-headerbar",
                        ariacontrols: "nav-headerbar",
                        id: "header",
                    },

                ],
            },
            {
                themeId: "accessible",
                navtabs: [
                    {
                        label: "Header Bar",
                        tablink: "#nav-headerbar",
                        ariacontrols: "nav-headerbar",
                        id: "header",
                    },

                ],
            },
        ],
        listskin: [
            { value: "dark", displayText: "Dark" },
            { value: "light", displayText: "Light" },
        ],
        listSubmenu: [
            { value: "false", displayText: "Accordian" },
            { value: "true", displayText: "Dropdown" },
        ],
        themeItem: [
            {
                imgsrc: "https://anzstageui.raaghu.io/assets/LightTheme.png",
                theme: "Light",
                themeId: "default",
            },
            {
                imgsrc: "https://anzstageui.raaghu.io/assets/Dashboard.png",
                theme: "Dark",
                themeId: "dark",
            },
            {
                imgsrc: "https://anzstageui.raaghu.io/assets/accessibleTheme.png",
                theme: "Accessible",
                themeId: "accessible",
            },
        ],
    }
} satisfies Story;
