import React from "react";
import figma from "@figma/code-connect";
import RdsRadioButton from "./rds-radio-button";

figma.connect(
  RdsRadioButton,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-Kit?node-id=346-3467",
  {
    props: {
      layout: figma.enum("📱 Layout", {
        Icon: "icon",
        "Icon with Label": "icon-with-label",
        "Icon with bottom Label": "icon-with-bottom-label",
      }),
      state: figma.enum("💡 State", {
        Radio: "radio",
        ErrorRadio: "errorRadio",
      }),
      selected: figma.boolean("⚠️ Selected"),
      itemList: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ],
    },
    example: (props) => <RdsRadioButton value={""} {...props} />,
  }
);
