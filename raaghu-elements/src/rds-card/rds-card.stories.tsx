import React from "react";
import RdsCard from "./rds-card";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Card',
    component: RdsCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        colorVariant: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
        borderColor: {
            options: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "dark",
                "light",
            ],
            control: { type: "select" },
        },
        style: {
            options: [
                "Default"   ,
                "Outlined"  ,
                "Filled"    
            ],
            control: { type: "select" },
        },
        state: {
            options: [
                "Default"   ,
                "Hovered"  ,
                "Selected",
                "Disabled"    
            ],
            control: { type: "select" },
        },
        titlePosition: {
            options: [
                "left"   ,
                "right"  ,
                "bottom",
            ],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCard>;

export default meta;
type Story = StoryObj<typeof RdsCard>;


export const Default: Story = {
    args: {
        colorVariant: "primary",
        borderColor: "",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",
        titlePosition: "bottom",
        cardText:
            `In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo`,
        buttonLabel1: "Link Button",
        buttonLabel2: "Link Button",
        showFooter: true,  
        showLinkButton: true,
        showTitle: true,
        showSubTitle: true,  
        iconName  : "users"  ,
        isDisabled : false,
        iconShow : true,
        // isBordered :false,
        // isFilled :false  
        style:"Default",
        state:"Default"
    }
} satisfies Story;
Default.parameters = { controls: { include: ['colorVariant', 'borderColor', 'cardTitle','titlePosition', 'cardText', 'buttonLabel1','buttonLabel2', 'showFooter','showLinkButton','showTitle','showSubTitle','iconName',"isDisabled","iconShow" ,"style","state"] } };

export const CardWithImage: Story = {
    args: { 
        colorVariant: "primary",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",
        titlePosition: "bottom",
        cardText:
        `In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo`,
        buttonLabel1: "Link Button",
        buttonLabel2: "Link Button",
        showFooter: true,
        showLinkButton: true,
        showTitle: true,
        showSubTitle: true,
        isImage: true,
        imageUrl: "https://picsum.photos/seed/picsum/1200/600",
        borderColor: "",
        iconName  : "users" ,
        isDisabled : false,
       
        // isBordered :false,
        // isFilled :false    
        style:"Default",
         state:"Default"
    }
} satisfies Story;
CardWithImage.parameters = { controls: { include: ['colorVariant', 'cardTitle','titlePosition', 'cardText', 'buttonLabel1','buttonLabel2', 'showFooter','showLinkButton','showTitle','showSubTitle', 'isImage', 'imageUrl', 'borderColor','iconName',"isDisabled" ,"style","state"] } };

export const Avatar: Story = {
    args: {
        colorVariant: "primary",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",        
        titlePosition: "bottom",
        cardText:
            `In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo`,
            buttonLabel1: "Link Button",
            buttonLabel2: "Link Button",
        showFooter: true,
        showLinkButton: true,
        showTitle: true,
        showSubTitle: true,
        isImage: true,
        imageUrl: "https://picsum.photos/seed/picsum/1200/600",
        src: "./assets/raaghu_icon.png",
        isAvatar: true,
        centerAlign: false,
        borderColor: "",
        iconName  : "users" ,
        isDisabled : false,
        
        // isBordered :false,
        // isFilled :false  
        style:"Default",
        state:"Default"  
    }
} satisfies Story;
Avatar.parameters = { controls: { include: ['colorVariant', 'cardTitle','titlePosition', 'cardText', 'buttonLabel1','buttonLabel2', 'showFooter','showLinkButton','showTitle','showSubTitle', 'isImage', 'imageUrl', 'src', 'isAvatar', 'centerAlign', 'borderColor','iconName',"isDisabled" ,"style","state"] } };

export const WithCenteredAvatar: Story = {
    args: {
        colorVariant: "primary",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",
        titlePosition: "bottom",
        cardText:
        `In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo`,
        buttonLabel1: "Link Button",
        buttonLabel2: "Link Button",
        showFooter: true,
        showLinkButton: true,
        showTitle: true,
        showSubTitle: true,
        isImage: true,
        imageUrl: "https://picsum.photos/seed/picsum/1200/600",
        src: "./assets/raaghu_icon.png",
        isAvatar: true,
        centerAlign: true,
        borderColor: "",
        iconName  : "users"  ,
        isDisabled : false,
        
        // isBordered :false,
        // isFilled :false
        style:"Default"  ,
 state:"Default"
    }
} satisfies Story;
WithCenteredAvatar.parameters = { controls: { include: ['colorVariant', 'cardTitle','titlePosition', 'cardText', 'buttonLabel1','buttonLabel2', 'showFooter','showLinkButton','showTitle','showSubTitle', 'isImage', 'imageUrl', 'src', 'isAvatar', 'centerAlign', 'borderColor', 'iconName',"isDisabled","style","state"] } };

// export const Disabled: Story = {
//     args: {
//         colorVariant: "primary",
//         borderColor: "",
//         cardTitle: "Card title",
//         cardSubTitle: "Card Sub title",
//         cardText:
//             `In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo
//              In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo.`,
//         buttonLabel: "Link Button",
//         showFooter: true,    
//         isDisabled : true,   
//         iconName  : "users"            
//     }
// } satisfies Story;
// Disabled.parameters = { controls: { include: ['colorVariant', 'borderColor', 'cardTitle','titlePosition', 'cardText', 'buttonLabel1','buttonLabel2', 'showFooter','showLinkButton','showTitle','showSubTitle', 'iconName'] } };

export const Bordered: Story = {
    args: {
        colorVariant: "primary",
        borderColor: "",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",
        titlePosition: "bottom",
        cardText:
            `In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo`,
        buttonLabel1: "Link Button",
        buttonLabel2: "Link Button",
        showFooter: true, 
        showLinkButton: true,   
        showTitle: true,
        showSubTitle: true,
        iconName  : "users"  ,
         isBordered :true ,
        isDisabled : false,
        iconShow : true,
        // isFilled :false  
        style:"Outlined",
         state:"Default"
    }
} satisfies Story;
Bordered.parameters = { controls: { include: ['colorVariant', 'borderColor', 'cardTitle','titlePosition', 'cardText', 'buttonLabel1','buttonLabel2', 'showFooter','showLinkButton','showTitle','showSubTitle','iconName',"isDisabled" ,"iconShow" ,"style","state"] } };

export const Filled: Story = {
    args: {
        colorVariant: "primary",
        borderColor: "",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",
        titlePosition: "bottom",
        cardText:
            `In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo`,
        buttonLabel1: "Link Button",
        buttonLabel2: "Link Button",
        showFooter: true,
        showLinkButton: true,
        showTitle: true,
        showSubTitle: true,    
        iconName  : "users",   
         isFilled :true ,
        isDisabled : false,
        iconShow : true,
        // isBordered :false,
       style:"Filled",
        state:"Default"
        
    }
} satisfies Story;
Filled.parameters = { controls: { include: ['colorVariant', 'borderColor', 'cardTitle','titlePosition', 'cardText', 'buttonLabel1','buttonLabel2', 'showFooter','showLinkButton','showTitle','showSubTitle','iconName',"isDisabled" ,"iconShow","style","state"] } };

export const WithIconLabel: Story = {
    args: {
        title: "Start Date",
        subTitle: "13 Jul 2024",
        colorVariant: "primary",
        borderColor: "dark",
        buttonLabel1: "Link Button",
        buttonLabel2: "Link Button",
        footerLabelText:"Value Saved:$220",       
        iconName: "calendar",
        iconShow: true,
        showFooter: true,  
        showLinkButton: false,
        showTitle: false,
        showSubTitle: false,
        showCalender: true,
        isDisabled : false,
        showFooterButton: true,
        showFooterLabel:true,
        style:"Default",
        state:"Default",
    }
} satisfies Story;
WithIconLabel.parameters = {
    controls: {
      include: [
        'title',
        'subTitle',
        'iconName',
        'colorVariant',
        'borderColor',
        'buttonLabel1',
       'buttonLabel2',
        'footerLabelText',
        'showCalender',
        'showFooter',
        'showLinkButton',
        'showFooterButton',
        'showFooterLabel',
        'iconShow',
        'isDisabled',
        'style',
        'state',
      ],
    },
  };
 