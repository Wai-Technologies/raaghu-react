import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTopNavigation from "./rds-comp-top-navigation";
import { id } from 'date-fns/locale';


const meta: Meta = { 
    title: "Elements/Top Navigation",
    component: RdsCompTopNavigation,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        top_nav_logo: {
            options: ["custom logo", "raaghu logo"],
            control: { type: "select" },
        },
        
    },
} satisfies Meta<typeof RdsCompTopNavigation>;

export default meta;
type Story = StoryObj<typeof RdsCompTopNavigation>;

export const Default: Story = {
    args: {
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
        ],
        showLogo: true,
        top_nav_logo: "raaghu logo",
        role: "Admin",
        style:"Default"
    }
} satisfies Story;

Default.parameters = { controls: { include: ['navbarTitle','top_nav_logo', 'navbarSubTitle', 'brandName', 'brandLogo', 'profileTitle', 'profileName', 'logo', 'notifications', 'languageItems', 'themeItems','showLogo','role', 'style'] } };
export const ABP: Story = {
    args: {
        navbarTitle: "Home",
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
        ],
        showLogo: false,
        role: "Admin",
        style: "ABP",
    }
} satisfies Story;

ABP.parameters = { controls: { include: ['navbarTitle', 'navbarSubTitle', 'brandName', 'brandLogo', 'profileTitle', 'profileName', 'logo', 'notifications', 'languageItems', 'themeItems','showLogo','role', 'style'] } };

export const RaaghuPortal: Story = {
    args: {
        navbarTitle: "Dashboard",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
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
        ],
        navtabItems: [
            {
                label: "Storybook",
                val: "storybook",
                icon: "storybook",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Documentation",
                val: "documentation",
                icon: "documentation",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Storybook",
                val: "storybook",
                icon: "storybook",
                iconWidth: "20px",
                iconHeight: "20px",
            },
            {
                label: "Download Project",
                val: "download_project",
                icon: "project",
                iconWidth: "20px",
                iconHeight: "20px",
            },
        ],
        showLogo: true,
        raaghuPortal: true,
        top_nav_logo: "raaghu logo",
        role: "Admin",
        style: "RaaghuPortal"

    }
} satisfies Story;

RaaghuPortal.parameters = { controls: { include: ['brandName', 'brandLogo','top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo','role', 'style'] } };
export const Ecommerce_1: Story = {
    args: {
        navbarTitle: "Dashboard",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
        breadcrumItem : [
            {
                label: "Home",
                id: 1,
                route: "#",
                disabled: false,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "About",
                id: 2,
                route: "#",
                disabled: false,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Shop",
                id: 3,
                active: false,
                disabled: true,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "Track Your Order",
                id: 4,
                active: false,
                disabled: true,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary"
            }
        ],
        showLogo: true,
        breadcrumbBorderPlacement: "bottom",
        breadcrumbBorderColor: "#6610f2",
        ecommerce1: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        top_nav_logo: "raaghu logo",
        style: "Ecommerce_1"

    }
} satisfies Story;

Ecommerce_1.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic','top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };

export const Ecommerce_2: Story = {
    args: {
        navbarTitle: "Dashboard",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        breadcrumItem : [
            {
                label: "Home",
                id: 1,
                route: "#",
                disabled: false,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "About",
                id: 2,
                route: "#",
                disabled: false,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Shop",
                id: 3,
                active: false,
                disabled: true,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "Track Your Order",
                id: 4,
                active: false,
                disabled: true,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary"
            }
        ],
        listItems : [
            {
              label: "USD",
              val: "USD",
              icon: "usd-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/path/to/usd-icon.png"
            },
            {
              label: "EUR",
              val: "EUR",
              icon: "eur-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/eur-icon.png"
            },
            {
              label: "GBP",
              val: "GBP",
              icon: "gbp-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/gbp-icon.png"
            },
            {
              label: "JPY",
              val: "JPY",
              icon: "jpy-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/jpy-icon.png"
            },
            {
              label: "CAD",
              val: "CAD",
              icon: "cad-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/cad-icon.png"
            },
            {
              label: "AUD",
              val: "AUD",
              icon: "aud-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/icon"
            }
          ],
          
        showLogo: true,
        showSearch: true,
        breadcrumbBorderPlacement: "bottom",
        breadcrumbBorderColor: "#6610f2",
        ecommerce2: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        top_nav_logo: "raaghu logo",
        style: "Ecommerce_2"

    }
} satisfies Story;

Ecommerce_2.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic','top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo','showSearch', 'style'] } };

export const Ecommerce_3: Story = {
    args: {
        navbarTitle: "Dashboard",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        breadcrumItem : [
            {
                label: "Home",
                id: 1,
                route: "#",
                disabled: false,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "About",
                id: 2,
                route: "#",
                disabled: false,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Shop",
                id: 3,
                active: false,
                disabled: true,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "Track Your Order",
                id: 4,
                active: false,
                disabled: true,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary"
            }
        ],
        listItems : [
            {
              label: "USD",
              val: "USD",
              icon: "usd-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/path/to/usd-icon.png"
            },
            {
              label: "EUR",
              val: "EUR",
              icon: "eur-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/eur-icon.png"
            },
            {
              label: "GBP",
              val: "GBP",
              icon: "gbp-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/gbp-icon.png"
            },
            {
              label: "JPY",
              val: "JPY",
              icon: "jpy-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/jpy-icon.png"
            },
            {
              label: "CAD",
              val: "CAD",
              icon: "cad-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/cad-icon.png"
            },
            {
              label: "AUD",
              val: "AUD",
              icon: "aud-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/icon"
            }
          ],
          
        showLogo: true,
        showSearch: true,
        breadcrumbBorderPlacement: "bottom",
        breadcrumbBorderColor: "#6610f2",
        ecommerce3: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        socialMediaIcons : [
            { id: "google", src: "./assets/google.svg", alt: "social-media-icon-google" },
            { id: "whatsapp", src: "./assets/whatsapp.svg", alt: "social-media-icon-whatsapp" },
            { id: "vimeo", src: "./assets/Vimeo.svg", alt: "social-media-icon-vimeo" },
          ],
        top_nav_logo: "raaghu logo",
        style: "Ecommerce_3"

      
    }
} satisfies Story;

Ecommerce_3.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic','top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo','showSearch', 'style'] } };

export const Ecommerce_4: Story = {
    args: {
        navbarTitle: "Dashboard",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        breadcrumItem : [
            {
                label: "Home",
                id: 1,
                route: "#",
                disabled: false,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "About",
                id: 2,
                route: "#",
                disabled: false,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Shop",
                id: 3,
                active: false,
                disabled: true,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "Track Your Order",
                id: 4,
                active: false,
                disabled: true,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary"
            }
        ],
        listItems : [
            {
              label: "USD",
              val: "USD",
              icon: "usd-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/path/to/usd-icon.png"
            },
            {
              label: "EUR",
              val: "EUR",
              icon: "eur-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/eur-icon.png"
            },
            {
              label: "GBP",
              val: "GBP",
              icon: "gbp-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/gbp-icon.png"
            },
            {
              label: "JPY",
              val: "JPY",
              icon: "jpy-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/jpy-icon.png"
            },
            {
              label: "CAD",
              val: "CAD",
              icon: "cad-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/cad-icon.png"
            },
            {
              label: "AUD",
              val: "AUD",
              icon: "aud-icon.png",
              iconWidth: "20px",
              iconHeight: "20px",
              iconPath: "/icon"
            }
          ],
          
        showLogo: true,
        showSearch: true,
        breadcrumbBorderPlacement: "bottom",
        breadcrumbBorderColor: "#6610f2",
        ecommerce4: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "shopping_cart", name:"shopping_cart",  },
            { id: "fevorite", name:"fevorite",  },
          ],
        top_nav_logo: "raaghu logo",
        style: "Ecommerce_4"

      
    }
} satisfies Story;

Ecommerce_4.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic','top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo','showSearch', 'style'] } };

export const Product_1: Story = {
    args: {
        navbarTitle: "Dashboard",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        breadcrumItem : [
            {
                label: "Dashboard",
                id: 1,
                route: "#",
                disabled: false,
                icon: "dashboard_new",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "Orgnizational Members",
                id: 2,
                route: "#",
                disabled: false,
                icon: "organization",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Details",
                id: 3,
                active: false,
                disabled: true,
                icon: "user_identity",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
        ],
        product1: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "settings", name:"settings",  },
            { id: "help_question_circle", name:"help_question_circle",  },
            { id: "import", name:"import",  },
            { id: "notification", name:"notification_new",  },
          ],
        top_nav_logo: "raaghu logo",
        style: "Product_1"

      
    }
} satisfies Story;

Product_1.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic','top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems', 'style'] } };

export const Product_2: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        breadcrumItem : [
            {
                label: "Tab 1",
                id: 1,
                route: "#",
                disabled: false,
                icon: "user",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "Tab 1",
                id: 2,
                route: "#",
                disabled: false,
                icon: "user",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Tab 1",
                id: 3,
                active: false,
                disabled: true,
                icon: "user",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "Export",
                id: 4,
                active: false,
                disabled: true,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
        ],
        breadcrumbBorderPlacement: "bottom",
        breadcrumbBorderColor: "#6610f2",
        product2: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "settings", name:"settings",  },
            { id: "help_question_circle", name:"help_question_circle",  },
            { id: "import", name:"import",  },
            { id: "notification", name:"notification_new",  },
          ],
          listItems : [
            {
                label: "v4.10",
                val: "v4.10",
                icon: "v4.10-icon.png",
                iconWidth: "20px",
                iconHeight: "20px",
                iconPath: "/path/to/v4.10-icon.png"
              },
              {
                label: "v4.9",
                val: "v4.9",
                icon: "v4.9-icon.png",
                iconWidth: "20px",
                iconHeight: "20px",
                iconPath: "/path/to/v4.9-icon.png"
              },
              {
                label: "v4.8",
                val: "v4.8",
                icon: "v4.8-icon.png",
                iconWidth: "20px",
                iconHeight: "20px",
                iconPath: "/path/to/v4.8-icon.png"
              },
              {
                label: "v4.7",
                val: "v4.7",
                icon: "v4.7-icon.png",
                iconWidth: "20px",
                iconHeight: "20px",
                iconPath: "/path/to/v4.7-icon.png"
              },
              {
                label: "v4.6",
                val: "v4.6",
                icon: "v4.6-icon.png",
                iconWidth: "20px",
                iconHeight: "20px",
                iconPath: "/path/to/v4.6-icon.png"
              }
          ],
        showLogo: true,
        showSearch: true,
        socialMediaIcons : [
            { id: "google", src: "./assets/google.svg", alt: "social-media-icon-google" },
            { id: "whatsapp", src: "./assets/whatsapp.svg", alt: "social-media-icon-whatsapp" },
            { id: "github", src: "./assets/github.svg", alt: "social-media-icon-github" },
          ],
        top_nav_logo: "raaghu logo",
        style: "Product_2"
    }
} satisfies Story;

Product_2.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic','top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };

export const Product_3: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        breadcrumItem : [
            {
                label: "Tab 1",
                id: 1,
                route: "#",
                disabled: false,
                icon: "user",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "Tab 1",
                id: 2,
                route: "#",
                disabled: false,
                icon: "user",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Tab 1",
                id: 3,
                active: false,
                disabled: true,
                icon: "user",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "Export",
                id: 4,
                active: false,
                disabled: true,
                icon: "",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
        ],
        breadcrumbBorderPlacement: "bottom",
        breadcrumbBorderColor: "#6610f2",
        product3: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "settings", name:"settings",  },
            { id: "help_question_circle", name:"help_question_circle",  },
            { id: "import", name:"import",  },
            { id: "notification", name:"notification_new",  },
          ],
          listItems : [
            {
                label: "v4.10",
                val: "v4.10",
                icon: "v4.10-icon.png",
                iconWidth: "20px",
                iconHeight: "20px",
                iconPath: "/path/to/v4.10-icon.png"
              },
              {
                label: "v4.9",
                val: "v4.9",
                icon: "v4.9-icon.png",
                iconWidth: "20px",
                iconHeight: "20px",
                iconPath: "/path/to/v4.9-icon.png"
              },
              {
                label: "v4.8",
                val: "v4.8",
                icon: "v4.8-icon.png",
                iconWidth: "20px",
                iconHeight: "20px",
                iconPath: "/path/to/v4.8-icon.png"
              },
              {
                label: "v4.7",
                val: "v4.7",
                icon: "v4.7-icon.png",
                iconWidth: "20px",
                iconHeight: "20px",
                iconPath: "/path/to/v4.7-icon.png"
              },
              {
                label: "v4.6",
                val: "v4.6",
                icon: "v4.6-icon.png",
                iconWidth: "20px",
                iconHeight: "20px",
                iconPath: "/path/to/v4.6-icon.png"
              }
          ],
        showLogo: true,
        showSearch: true,
        socialMediaIcons : [
            { id: "google", src: "./assets/google.svg", alt: "social-media-icon-google" },
            { id: "whatsapp", src: "./assets/whatsapp.svg", alt: "social-media-icon-whatsapp" },
            { id: "github", src: "./assets/github.svg", alt: "social-media-icon-github" },
          ],
        top_nav_logo: "raaghu logo",
        style: "Product_3"
      
    }
} satisfies Story;

Product_3.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic', 'top_nav_logo','profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };

export const Product_4: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        breadcrumItem : [
            {
                label: "Dashboard",
                id: 1,
                route: "#",
                disabled: false,
                icon: "dashboard_new",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "Activities",
                id: 2,
                route: "#",
                disabled: false,
                icon: "activities",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Directory",
                id: 3,
                active: false,
                disabled: true,
                icon: "directory",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "Projects",
                id: 4,
                active: false,
                disabled: true,
                icon: "project",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "Calendar",
                id: 5,
                active: false,
                disabled: true,
                icon: "calendar",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
        ],
        breadcrumbBorderPlacement: "top",
        breadcrumbBorderColor: "#6610f2",
        product4: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "notification", name:"notification_new",  },
            { id: "chat_left_corner", name:"chat_left_corner",  },
            { id: "administration", name:"administration",  },
            
          ],
        showLogo: true,
        showSearch: true,
        top_nav_logo: "raaghu logo",
        style: "Product_4"

      
    }
} satisfies Story;

Product_4.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic', 'top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };

export const Entertainment_1: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        breadcrumItem : [
            {
                label: "Dashboard",
                id: 1,
                route: "#",
                disabled: false,
                icon: "dashboard_new",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "Activities",
                id: 2,
                route: "#",
                disabled: false,
                icon: "activities",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Directory",
                id: 3,
                active: false,
                disabled: true,
                icon: "directory",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "Projects",
                id: 4,
                active: false,
                disabled: true,
                icon: "project",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "Calendar",
                id: 5,
                active: false,
                disabled: true,
                icon: "calendar",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
        ],
        entertainment1: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "video_icon", name:"video_icon",  },
            { id: "multiple_circle", name:"multiple_circle",  },
            { id: "notification_new", name:"notification_new",  },
            
          ],
        showLogo: true, 
        showSearch: true,
        top_nav_logo: "raaghu logo",
        style: "Entertainment_1"
      
    }
} satisfies Story;

Entertainment_1.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic', 'top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };

export const Entertainment_2: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        entertainment2: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "home_interface", name:"home_interface",  },
            { id: "travel_map", name:"travel_map",  },
            { id: "entertainment_playlist", name:"entertainment_playlist",  },
            { id: "fevorite", name:"fevorite",  },
            { id: "notification_new", name:"notification_new",  },

            
          ],
        showLogo: true, 
        showSearch: true,
        top_nav_logo: "raaghu logo",
        style: "Entertainment_2"
      
    }
} satisfies Story;

Entertainment_2.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic','top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };

export const Entertainment_3: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        entertainment3: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "home_interface", name:"home_interface",  },
            { id: "travel_map", name:"travel_map",  },
            { id: "entertainment_playlist", name:"entertainment_playlist",  },
            { id: "fevorite", name:"fevorite",  },
            { id: "notification_new", name:"notification_new",  },

            
          ],
        showLogo: true, 
        showSearch: true,
        top_nav_logo: "raaghu logo",
        style: "Entertainment_3"
      
    }
} satisfies Story;

Entertainment_3.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic', 'top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };
export const Entertainment_4: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        entertainment4: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "home_interface", name:"home_interface",  },
            { id: "travel_map", name:"travel_map",  },
            { id: "entertainment_playlist", name:"entertainment_playlist",  },
            { id: "fevorite", name:"fevorite",  },
            { id: "notification_new", name:"notification_new",  },

            
          ],
        showLogo: true, 
        showSearch: true,
        top_nav_logo: "raaghu logo",
        style: "Entertainment_4"
      
    }
} satisfies Story;

Entertainment_4.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic', 'top_nav_logo','profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };

export const Professional_1: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        professional1: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "home", name:"home",  },
            { id: "hierarchy", name:"hierarchy",  },
            { id: "countries", name:"countries",  },
            { id: "notification_new", name:"notification_new",  },

            
          ],
        showLogo: true, 
        showSearch: true,
        top_nav_logo: "raaghu logo",
        style: "Professional_1"
      
    }
} satisfies Story;

Professional_1.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic', 'top_nav_logo','profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };
export const Professional_2: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        professional2: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "home", name:"home",  },
            { id: "hierarchy", name:"hierarchy",  },
            { id: "countries", name:"countries",  },
            { id: "notification_new", name:"notification_new",  },  
          ],
        showLogo: true, 
        showSearch: true,
        navtabItems : [
            {
                label: "Home",
                id: 1,
                route: "#",
                disabled: false,
                icon: "home",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "News",
                id: 2,
                route: "#",
                disabled: false,
                icon: "news",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Marketplace",
                id: 3,
                active: false,
                disabled: true,
                icon: "marketplace",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "Jobs",
                id: 4,
                active: false,
                disabled: true,
                icon: "jobs",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
        ],
        top_nav_logo: "raaghu logo",
        style: "Professional_2"
    }
} satisfies Story;

Professional_2.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic', 'top_nav_logo','profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };
export const Professional_3: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
        breadcrumbBorderPlacement: "bottom",
        breadcrumbBorderColor: "#6610f2",
        professional3: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        icons : [
            { id: "home", name:"home",  },
            { id: "hierarchy", name:"hierarchy",  },
            { id: "countries", name:"countries",  },
            { id: "notification_new", name:"notification_new",  },

            
          ],
        showLogo: true, 
        showSearch: true,
        breadcrumItem : [
            {
                label: "Tab 1",
                id: 1,
                route: "#",
                disabled: false,
                icon: "user",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "Tab 2",
                id: 2,
                route: "#",
                disabled: false,
                icon: "user",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
        ],
        top_nav_logo: "raaghu logo",
        style: "Professional_3"
      
    }
} satisfies Story;

Professional_3.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic', 'top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };
export const Professional_4: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
        breadcrumbBorderPlacement: "bottom",
        breadcrumbBorderColor: "#6610f2",
        professional4: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        showLogo: true, 
        showSearch: true,
        breadcrumItem : [
            {
                label: "Coummunity",
                id: 1,
                route: "#",
                disabled: false,
                icon: "coummunity",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "Jobs",
                id: 2,
                route: "#",
                disabled: false,
                icon: "job",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Resources",
                id: 3,
                route: "#",
                disabled: false,
                icon: "resources",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
        ],
        navButtons : [
            {
                name: "Find Jobs",
                id: 1,
                disabled: false,
                btnBackground: "primary",
                textColor: "white",
            },
            {
                name: "Login",
                id: 2,
                disabled: false,
                btnBackground: "none",
                textColor: "primary",

            },
            {
                name: "Employeers",
                id: 3,
                disabled: false,
                btnBackground: "none",
                textColor: "primary",

            },
        ],
        top_nav_logo: "raaghu logo",
        style: "Professional_4"
      
    }
} satisfies Story;

Professional_4.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic', 'top_nav_logo','profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };

export const Professional_5: Story = {
    args: {
        navbarTitle: "Home",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
       
        professional5: true,
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        showLogo: true, 
        showSearch: true,
        icons : [
            { id: "star", name:"star",  },
            { id: "notification_new", name:"notification_new",  },
            { id: "help_question_circle", name:"help_question_circle",  },
          ],
       top_nav_logo: "raaghu logo",
       style: "Professional_5"

      
    }
} satisfies Story;

Professional_5.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic','top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems','showLogo', 'style'] } };
export const App_Shell_3: Story = {
    args: {
        navbarTitle: "Dashboard",
        navbarSubTitle: "Statistics and reports",
        brandName: "Raaghu",
        brandLogo: "assets/Raaghu-logo-mfe-black.png",
        profileTitle: "John Doe",
        profileEmail: "john.doe@raaghu.io",
        profileName: "John Doe",
        logo: "https://anzstageui.raaghu.io/assets/raaghu_icon.png",
        firstName: "John",
        lastName: "Doe",
        role: "Admin",  
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
        ],
        listItems: [
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
       
        breadcrumItem : [
            {
                label: "Home",
                id: 0,
                route: "#",
                disabled: false,
                icon: "home",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "Dashboard",
                id: 1,
                route: "#",
                disabled: false,
                icon: "dashboard_new",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: true,
            },
            {
                label: "Saas",
                id: 2,
                route: "#",
                disabled: false,
                icon: "saas",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
                active: false,
            },
            {
                label: "Administration",
                id: 3,
                active: false,
                disabled: true,
                icon: "administration",
                iconFill: false,
                iconstroke: true,
                iconWidth: "15px",
                iconHeight: "15px",
                iconColor: "primary",
            },
            {
                label: "File Management",
                id: 4,
                active: false,
                disabled: true,
                icon: "file_management",
                iconFill: false,
                iconstroke: true,
                iconWidth: "14px",
                iconHeight: "14px",
                iconColor: "primary",
            },
            {
                label: "Forms",
                id: 5,
                active: false,
                disabled: true,
                icon: "forms",
                iconFill: false,
                iconstroke: true,
                iconWidth: "14px",
                iconHeight: "14px",
                iconColor: "primary",
            },
            {
                label: "Payment",
                id: 6,
                active: false,
                disabled: true,
                icon: "payment",
                iconFill: false,
                iconstroke: true,
                iconWidth: "14px",
                iconHeight: "14px",
                iconColor: "primary",
            },
            {
                label: "CMS",
                id: 7,
                active: false,
                disabled: true,
                icon: "cms",
                iconFill: false,
                iconstroke: true,
                iconWidth: "14px",
                iconHeight: "14px",
                iconColor: "primary",
            },
        ],
        breadcrumbBorderPlacement: "top",
        breadcrumbBorderColor: "#6610f2",
        appshell3: true,
        showLogo: true, 
        profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
        top_nav_logo: "raaghu logo",
        style: "App_Shell_3"

      
    }
} satisfies Story;

App_Shell_3.parameters = { controls: { include: ['brandName', 'brandLogo','profilePic','top_nav_logo', 'profileTitle', 'profileName', 'logo', 'themeItems', 'style'] } };
