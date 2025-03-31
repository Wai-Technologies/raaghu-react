import React from "react";
import RdsOffcanvas, { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "./rds-offcanvas";
import RdsButton from "../rds-button/rds-button";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: 'Elements/Offcanvas',
  component: RdsOffcanvas,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      options: ["top", "bottom", "end", "start"],
      control: { type: "select" },
    },
    showPrimaryButton: { control: 'boolean' },
    showSecondaryButton: { control: 'boolean' },
    showTertiaryButton: { control: 'boolean' },
  },
} satisfies Meta<typeof RdsOffcanvas>;

export default meta;
type Story = StoryObj<typeof RdsOffcanvas>;

export const CustomSlideOutOffcanvas: Story = {
  args: {
    offId: "canvasExample",
    canvasTitle: "NEW TENENT",
    scrolling: false,
    placement: RdsOffcanvasPlacement.End, // Use enum value
    backDrop: RdsOffcanvasBackDrop.Static, // Use enum value
    offcanvaswidth: 650,
    showPrimaryButton: true,
    showSecondaryButton: true,
    showTertiaryButton: true,
    children: (
      <>
        <div className="d-flex flex-column h-100">
            <h5 className="p-3">
              Hello Offcanvas Lorem ipsum dolor sit amet consectetur adipisicing
              elit.
            </h5>
          </div>
      </>
    ),
    offcanvasbutton: (
      <RdsButton
        label="Button"
        colorVariant="primary"
        block={false}
        type="button"
        size="medium"
        data-bs-toggle="offcanvas"
        data-bs-target="#canvasExample"
        aria-controls="canvasExample"
      ></RdsButton>
    ),
  },
} satisfies Story;
CustomSlideOutOffcanvas.parameters = { controls: { include: ['showPrimaryButton', 'showSecondaryButton', 'showTertiaryButton'] } };