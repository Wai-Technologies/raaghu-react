import React from "react";
import { Meta, StoryFn } from "@storybook/react-vite";
import RdsScrollBar, { ScrollBarType, ScrollPosition } from "./rds-scroll-bar";
 
 
export default {
    title: "Elements/Scrollbar",
    component: RdsScrollBar,
    parameters: {
      layout: 'padded',
      docs: {
        description: {
        component:
            'The **Scrollbar** element is a customizable scroll bar component for enhancing the scrolling experience in your application. It supports different types (`Mac`, `Simple`) and positions (`Start`, `Middle`, `End`), allowing you to control the appearance and placement of the scrollbar. You can also enable or disable navigation buttons for easier scrolling. This element is part of our design system and can be tailored to fit various layouts, making it ideal for content areas, panels, or any interface where improved scroll control is needed.'
    },
        source :{
          transform: (code: string) => {
            // Transform type enum
            code = code.replace(/type="([^"]+)"/g, (match, p1) => `type={ScrollBarType.${p1}}`);
            code = code.replace(/type:\s*"([^"]+)"/g, (match, p1) => `type: ScrollBarType.${p1}`);
            // Transform position enum
            code = code.replace(/position="([^"]+)"/g, (match, p1) => `position={ScrollPosition.${p1}}`);
            code = code.replace(/position:\s*"([^"]+)"/g, (match, p1) => `position: ScrollPosition.${p1}`);
            return code;
          }
        }
      }
  },
  tags: ['autodocs'],
    argTypes: {
        type: {
          control: "select",
          options: ["Mac", "Simple"],
        },
        position: {
          control: "select",
          options: ["Start", "Middle", "End"],
        },
        showButtons: {
          control: "boolean",
        },
      },
    } as Meta<typeof RdsScrollBar>;
 
    const Template: StoryFn<typeof RdsScrollBar> = (args) => <RdsScrollBar {...args} />;

    export const Standard = Template.bind({});
    Standard.args = {
      type: ScrollBarType.Mac, 
      position: ScrollPosition.Start, 
      showButtons: true,
    };
   Standard.parameters = { controls: { include: ['type', 'position', 'showButtons'] } };
    