import React from "react";
import RdsPopover from "./rds-popover";
import RdsButton from "../rds-button/rds-button";
import RdsTypography from "../rds-typography/rds-typography";
import figma from "@figma/code-connect";

figma.connect(
  RdsPopover,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=1509-4672",
  {
    props: {
      position: figma.enum("💡 State", {
        "Top Left": "bottom-left",
        "Top Center": "top-center",
        "Top Right": "bottom-right",
        "Bottom Left": "top-left",
        "Bottom Center": "top-center",
        "Bottom Right": "top-right",
        "Left Top": "right-top",
        "Left Center": "right-center",
        "Left Bottom": "right-bottom",
        "Right Bottom": "left-bottom",
        "Right Center": "left-center",
        "Right Top": "left-top",
        "No Arrow": "no-arrow",
      }),
    },
    example: (props) => (
      <span>
        <RdsButton onClick={() => {}}>Open Popover</RdsButton>
        <RdsPopover
          {...props}
          isOpen={true}
          anchorEl={null}
          onClose={() => {}}
          title="Simple Popover"
        >
          <RdsTypography>This is a simple popover with some basic content.</RdsTypography>
        </RdsPopover>
      </span>
    ),
  }
);
