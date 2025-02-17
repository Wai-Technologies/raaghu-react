import React from "react";
import figma from "@figma/code-connect";
import RdsIllustration from "./rds-illustration";

figma.connect(
  RdsIllustration,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-Kit?node-id=2155-3061",
  {
    props: {
      mode: figma.enum("🌙 Mode", {
        "Dark NRA": "dark-nra",
        "Light NRA": "light-nra",
        "Dark NCS": "dark-ncs",
        "Light NCS": "light-ncs",
      }),
    },
    example: (props) => <RdsIllustration {...props} />, // Spread props to avoid type mismatch
  }
);
