import React from "react";
import RdsCompAdaptiveCards from "./rds-comp-adaptive-cards";
import figma from "@figma/code-connect";

figma.connect(
  RdsCompAdaptiveCards,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=18411-195150",
  {
    props: {
      showDismiss: figma.boolean("👀Show Dismiss"),
      showHeader: figma.boolean("👀Show Header"),
    },
    example: (props) => (
      <RdsCompAdaptiveCards
        {...props}
        btn1Label="Cancel"
        btn2Label="Done"
        cardTitle="Title"
        showBtn1
        showBtn2
        closeIcon
      />
    ),
  }
);
