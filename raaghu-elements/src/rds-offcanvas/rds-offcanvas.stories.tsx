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
  },
} satisfies Meta<typeof RdsOffcanvas>;

export default meta;
type Story = StoryObj<typeof RdsOffcanvas>;

export const CustomSlideOutOffcanvas: Story = {
  args: {
    offId: "canvasExample",
    canvasTitle: "Offcanvas Title",
    scrolling: false,
    placement: RdsOffcanvasPlacement.End, // Use enum value
    backDrop: RdsOffcanvasBackDrop.Static, // Use enum value
    offcanvaswidth: 650,
    children: (
      <>
        <div className="d-flex flex-column h-100">
            <h5 className="p-3">
              Hello Offcanvas Lorem ipsum dolor sit amet consectetur adipisicing
              elit.
            </h5>
            <div className="d-flex justify-content-start mt-auto p-3 offcanvas-margin">
              <div className="me-2">
                <RdsButton
                  label="RESTORE TO DEFAULT"
                  isOutline={true}
                  colorVariant="primary"
                  block={false}
                  tooltipTitle={""}
                  type="button"
                  size="medium"
                />
              </div>
              <div className="me-2">
                <RdsButton
                  label="CANCEL"
                  colorVariant="primary"
                  isOutline={true}
                  block={false}
                  tooltipTitle={""}
                  type="button"
                  size="medium"
                />
              </div>
              <div className="me-2">
                <RdsButton
                  label="SAVE"
                  colorVariant="primary"
                  block={false}
                  tooltipTitle={""}
                  type="submit"
                  size="medium"
                  data-bs-dismiss="offcanvas"
                  databstoggle="offcanvas"
                  databstarget="#canvasExample"
                  ariacontrols="canvasExample"
                />
              </div>
            </div>
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
CustomSlideOutOffcanvas.parameters = { controls: { include: ['offId', 'canvasTitle', 'scrolling', 'placement', 'backDrop', 'offcanvaswidth', 'children', 'offcanvasbutton'] } };


