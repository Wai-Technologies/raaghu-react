import React from "react"
import  RdsTooltip  from "./rds-tooltip"
import figma from "@figma/code-connect"

figma.connect(
  RdsTooltip,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=591-9150",
  {
    props: {
      title: figma.string("✏️ Label"),
      style: figma.enum("✨ Style", {
        "Middle Bottom Arrow":"top",
        "Middle Top Arrow":"bottom",
        "Right Arrow":"left",
        "Right Bottom Arrow":"top",
        "Right Top Arrow":"bottom",
        "Left Arrow":"right",
        "Left Bottom Arrow":"top",
        "Left Top Arrow":"bottom"
      }),
    },
    example: (props) =>   
     <RdsTooltip {...props} arrow={true}>
          <span>Hover Me</span>
      </RdsTooltip>
  },
)
