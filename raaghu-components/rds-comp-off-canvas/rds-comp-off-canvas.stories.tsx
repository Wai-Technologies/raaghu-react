import React from "react";
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import RdsCompOffcanvas, { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "./rds-comp-off-canvas";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: 'Components/Off Canvas',
  component: RdsCompOffcanvas,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    docs: {
      description: {
        component:
            'The **Off Canvas** component is a customizable slide-out panel built with MUI Drawer. It displays additional content, navigation, or actions without leaving the current page. It supports multiple placements (`top`, `bottom`, `end`, `start`), backdrop options (`true`, `false`, `static`), and adjustable width. The off-canvas can include a title, scrolling content, and up to three configurable action buttons (primary, secondary, tertiary). This MUI-based implementation provides better accessibility and modern design patterns while maintaining the original functionality.'
    },
      source:{
        transform:(code:string) => {
          code = code.replace(/placement="([^"]+)"/g, (match, p1) => `placement={RdsOffcanvasPlacement.${p1.replace(/\s+/g, '')}}`);
          code = code.replace(/placement:\s*"([^"]+)"/g, (match, p1) => `placement: RdsOffcanvasPlacement.${p1.replace(/\s+/g, '')}`);
          code = code.replace(/backDrop="([^"]+)"/g, (match, p1) => `backDrop={RdsOffcanvasBackDrop.${p1.replace(/\s+/g, '')}}`);
          code = code.replace(/backDrop:\s*"([^"]+)"/g, (match, p1) => `backDrop: RdsOffcanvasBackDrop.${p1.replace(/\s+/g, '')}`);
          return code;
        }
      }
    }
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    placement: {
      options: ["top", "bottom", "end", "start"],
      control: { type: "select" },
    },
    backDrop: {
      options: ["true", "false", "static"],
      control: { type: "select" },
    },
    showPrimaryButton: { control: 'boolean' },
    showSecondaryButton: { control: 'boolean' },
    showTertiaryButton: { control: 'boolean' },
  },
} satisfies Meta<typeof RdsCompOffcanvas>;

export default meta;
type Story = StoryObj<typeof RdsCompOffcanvas>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvasElement.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  },
  args: {
    offId: "canvasExample",
    canvasTitle: "NEW TENANT",
    scrolling: false,
    placement: RdsOffcanvasPlacement.End, 
    backDrop: RdsOffcanvasBackDrop.Static,
    offcanvaswidth: 650,
    showPrimaryButton: true,
    showSecondaryButton: true,
    showTertiaryButton: true,
  },
} satisfies Story;
Default.parameters = { controls: { include: ['showPrimaryButton', 'showSecondaryButton', 'showTertiaryButton'] } };