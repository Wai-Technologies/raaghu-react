import React from "react"
import  RdsDivider  from "./rds-divider"
import figma from "@figma/code-connect"

figma.connect(
  RdsDivider,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=817-19911",
  {
    props: {
      layout: figma.enum("📱 Layout", {
        "Horizontal": "horizontal",
        "Vertical": "vertical",
      }),
    },
    example: (props) => <RdsDivider
    textAlign="center"
    iconShow
    {...props}>Default Divider</RdsDivider>,
  },
)
