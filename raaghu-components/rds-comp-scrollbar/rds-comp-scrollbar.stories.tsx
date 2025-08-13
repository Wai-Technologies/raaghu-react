import React from "react";
import { Meta, StoryFn } from "@storybook/react-vite";
import RdsScrollBar, { ScrollBarType, ScrollPosition } from "./rds-comp-scrollbar";
 import { ArrowDropDown, ArrowDropUp} from "@mui/icons-material";

 
export default {
    title: "Components/Scrollbar",
    component: RdsScrollBar,
    parameters: {
      layout: 'padded',
  },
  tags: ['autodocs'],
    argTypes: {
        type: {
          control: "select",
          options: ["Mac", "Simple"],
          description: "Type of scrollbar",
        },
        position: {
          control: "select",
          options: ["Start", "Middle", "End"],
          description: "Initial scroll position",
        },
        showButtons: {
          control: "boolean",
          description: "Show scroll buttons",
        },
      },
    } as Meta<typeof RdsScrollBar>;
 
    const Template: StoryFn<typeof RdsScrollBar> = (args) => <RdsScrollBar {...args} />;

    export const Standard = Template.bind({});
    Standard.args = {
      type: ScrollBarType.Mac, 
      position: ScrollPosition.Start, 
      showButtons: true,
      startIcon: <ArrowDropUp />,
      endIcon: <ArrowDropDown />  
    };
   Standard.parameters = { controls: { include: ['type', 'position', 'showButtons'] } };
    