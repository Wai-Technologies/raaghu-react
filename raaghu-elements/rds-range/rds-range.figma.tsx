import React from "react"
import  RdsRange  from "./rds-range"
import figma from "@figma/code-connect"

figma.connect(
  RdsRange,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=867-10909",
  {
    variant: { "⚠️ Type": "One Way" },
    props: {
      showMinMax: figma.boolean("📝 Show label"),
    },
    example: ({ showMinMax }) => <RdsRange showMinMax={showMinMax} type="one-way" />,
  }
)

figma.connect(
  RdsRange,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=867-10909",
  {
    variant: { "⚠️ Type": "Two Way" },
    props: {
      showMinMax: figma.boolean("📝 Show label"),
    },
    example: ({ showMinMax }) => <RdsRange valueLabelDisplay="off" showMinMax={showMinMax} type="two-way" value={[0, 20]} />,
  }
)

