import React from "react"
import  RdsDivider  from "./rds-divider"
import figma from "@figma/code-connect"
import { text } from "stream/consumers"

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
    dividerMessage="Default Divider"
    iconShow
    {...props} />,
  },
)
