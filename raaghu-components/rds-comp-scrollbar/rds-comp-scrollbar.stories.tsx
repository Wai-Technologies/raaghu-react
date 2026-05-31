import React from "react";
import { expect, userEvent, within, fn, waitFor } from '@storybook/test';
import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import RdsScrollBar, { ScrollBarType, ScrollPosition } from "./rds-comp-scrollbar";
 import { ArrowDropDown, ArrowDropUp} from "@mui/icons-material";

 
const meta: Meta = { 
    title: "Components/Scrollbar",
    component: RdsScrollBar,
    parameters: {
      layout: 'padded',
      docs:{
        source :{
          transform: (code: string) => {
            code = code.replace(/type="([^"]+)"/g, (match, p1) => `type={ScrollBarType.${p1}}`);
            code = code.replace(/type:\s*"([^"]+)"/g, (match, p1) => `type: ScrollBarType.${p1}`);
            code = code.replace(/position="([^"]+)"/g, (match, p1) => `position={ScrollPosition.${p1}}`);
            code = code.replace(/position:\s*"([^"]+)"/g, (match, p1) => `position: ScrollPosition.${p1}`);
            return code;
          }
        }
      }
  },
  tags: ['autodocs', 'stable'],
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
 
export default meta;
type Story = StoryObj<typeof RdsScrollBar>;

export const Default: Story = {
    args: {
      type: ScrollBarType.Mac,
      position: ScrollPosition.Start,
      showButtons: true,
      startIcon: <ArrowDropUp />,
      endIcon: <ArrowDropDown />,
    },
    play: async ({ canvasElement }) => {
      const el = canvasElement.firstElementChild;
      expect(el).toBeTruthy();
    },
} satisfies Story;
   Default.parameters = { controls: { include: ['type', 'position', 'showButtons'] } };
    