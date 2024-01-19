import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsOffcanvas from "./rds-offcanvas";
import RdsButton from "../rds-button/rds-button";

export default {
    title: "Elements/Offcanvas",
    component: RdsOffcanvas,
    argTypes: {
        placement: {
            options: ["top", "bottom", "end", "start"],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof RdsOffcanvas>;
const Template: ComponentStory<typeof RdsOffcanvas> = (args) => (
    <>
        {/*we can use button anywhere as we want, like below */}
        {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#canvasExample"
  aria-controls="canvasExample">
   Button
  </button> */}
        <RdsOffcanvas {...args} />
    </>
);

export const Offcanvas = Template.bind({});
Offcanvas.args = {
    offId: "canvasExample",
    canvasTitle: "Offcanvas Title",
    scrolling: false,
    placement: "end",
    backDrop: "static",
    offcanvaswidth: 650,
    children: (
        <>
            <h2 className="p-3">
        Hello Offcanvas Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h2>
            <div className="col-4 m-4">
                <RdsButton
                    label="Close "
                    colorVariant="primary"
                    block={false}
                    tooltipTitle={""}
                    type="submit"
                    size="small"
                    data-bs-dismiss="offcanvas"
                    databstoggle="offcanvas"
                    databstarget="#canvasExample"
                    ariacontrols="canvasExample"
                />
            </div>
        </>
    ),
    offcanvasbutton: (
        <a
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#canvasExample"
            aria-controls="canvasExample"
        >
      Button
        </a>
    ),
};

