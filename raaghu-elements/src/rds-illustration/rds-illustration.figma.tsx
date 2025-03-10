import React from "react";
import figma from "@figma/code-connect";
import RdsIllustration from "./rds-illustration";

figma.connect(
  RdsIllustration,
  "https://www.figma.com/design/wGW5jiXyoAdO4DVLgCKXmw/Raaghu-Storybook-Elements?node-id=51-872",
  {
    props: {
      iconHeight: "250px",
      iconWidth: "250px",
      label: "Currently you don't have any data",
      subLabel: "Click on the button above to add data",
      iconPath: "/assets/lottie-files/outlined/dual-color/illustration-light.json",
    },
    example: (props) => <RdsIllustration {...props} />,
  }
);
