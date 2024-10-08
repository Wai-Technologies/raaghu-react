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
        cardText:
            `Some quick example text to build on the card title and make up the bulk of the card's content
             Some quick example text to build on the card title and make up the bulk of the card's content.`,
        buttonLabel: "Link Button",
        showFooter: true,  
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
Default.parameters = { controls: { include: ['colorVariant', 'borderColor', 'cardTitle', 'cardText', 'buttonLabel', 'showFooter','showTitle','showSubTitle','iconName',"isDisabled","iconShow" ,"style","state"] } };

export const CardWithImage: Story = {
    args: { 
        colorVariant: "primary",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",
        cardText:
        `Some quick example text to build on the card title and make up the bulk of the card's content
         Some quick example text to build on the card title and make up the bulk of the card's content.`,
        buttonLabel: "Link Button",
        showFooter: true,
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
CardWithImage.parameters = { controls: { include: ['colorVariant', 'cardTitle', 'cardText', 'buttonLabel', 'showFooter','showTitle','showSubTitle', 'isImage', 'imageUrl', 'borderColor','iconName',"isDisabled" ,"style","state"] } };

export const Avatar: Story = {
    args: {
        colorVariant: "primary",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",
        cardText:
            `Some quick example text to build on the card title and make up the bulk of the card's content
             Some quick example text to build on the card title and make up the bulk of the card's content.`,
        buttonLabel: "Link Button",
        showFooter: true,
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
Avatar.parameters = { controls: { include: ['colorVariant', 'cardTitle', 'cardText', 'buttonLabel', 'showFooter','showTitle','showSubTitle', 'isImage', 'imageUrl', 'src', 'isAvatar', 'centerAlign', 'borderColor','iconName',"isDisabled" ,"style","state"] } };

export const WithCenteredAvatar: Story = {
    args: {
        colorVariant: "primary",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",
        cardText:
        `Some quick example text to build on the card title and make up the bulk of the card's content
         Some quick example text to build on the card title and make up the bulk of the card's content.`,
        buttonLabel: "Link Button",
        showFooter: true,
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
WithCenteredAvatar.parameters = { controls: { include: ['colorVariant', 'cardTitle', 'cardText', 'buttonLabel', 'showFooter','showTitle','showSubTitle', 'isImage', 'imageUrl', 'src', 'isAvatar', 'centerAlign', 'borderColor', 'iconName',"isDisabled","style","state"] } };

// export const Disabled: Story = {
//     args: {
//         colorVariant: "primary",
//         borderColor: "",
//         cardTitle: "Card title",
//         cardSubTitle: "Card Sub title",
//         cardText:
//             `Some quick example text to build on the card title and make up the bulk of the card's content
//              Some quick example text to build on the card title and make up the bulk of the card's content.`,
//         buttonLabel: "Link Button",
//         showFooter: true,    
//         isDisabled : true,   
//         iconName  : "users"            
//     }
// } satisfies Story;
// Disabled.parameters = { controls: { include: ['colorVariant', 'borderColor', 'cardTitle', 'cardText', 'buttonLabel', 'showFooter','showTitle','showSubTitle', 'iconName'] } };

export const Bordered: Story = {
    args: {
        colorVariant: "primary",
        borderColor: "",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",
        cardText:
            `Some quick example text to build on the card title and make up the bulk of the card's content
             Some quick example text to build on the card title and make up the bulk of the card's content.`,
        buttonLabel: "Link Button",
        showFooter: true,    
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
Bordered.parameters = { controls: { include: ['colorVariant', 'borderColor', 'cardTitle', 'cardText', 'buttonLabel', 'showFooter','showTitle','showSubTitle','iconName',"isDisabled" ,"iconShow" ,"style","state"] } };

export const Filled: Story = {
    args: {
        colorVariant: "primary",
        borderColor: "",
        cardTitle: "Card title",
        cardSubTitle: "Card Sub title",
        cardText:
            `Some quick example text to build on the card title and make up the bulk of the card's content
             Some quick example text to build on the card title and make up the bulk of the card's content.`,
        buttonLabel: "Link Button",
        showFooter: true,
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
Filled.parameters = { controls: { include: ['colorVariant', 'borderColor', 'cardTitle', 'cardText', 'buttonLabel', 'showFooter','showTitle','showSubTitle','iconName',"isDisabled" ,"iconShow","style","state"] } };

