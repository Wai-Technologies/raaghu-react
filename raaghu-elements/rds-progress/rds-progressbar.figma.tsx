import React from "react"
import  RdsProgress  from "./rds-progress"
import figma from "@figma/code-connect"

figma.connect(
  RdsProgress,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=591-8917",
  {
    props: {
      style: figma.enum("✨ Style", {
        "Circular": "circular",
        "Line": "line",
        "Stepper": "stepper",
        "Dash": "dash",
        "Block": "block"
      }),
  },
    example: (props) => <RdsProgress {...props} 
      color="primary"
      showLabel
      stepperType="circle"
      steps={4}
      variant="determinate"
    />,
  },
)
