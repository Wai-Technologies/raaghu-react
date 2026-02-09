import React from "react"
import  RdsRange  from "./rds-range"
import figma from "@figma/code-connect"

figma.connect(
  RdsRange,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=867-10909",
  {
    variant: { "⚠️ Type": "One Way" },
    props: {
      showLabel: figma.boolean("📝 Show label"),
    },
    example: ({ showLabel }) => <RdsRange showLabel={showLabel} type="one-way" />,
  }
)

figma.connect(
  RdsRange,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=867-10909",
  {
    variant: { "⚠️ Type": "Two Way" },
    props: {
      showLabel: figma.boolean("📝 Show label"),
    },
    example: ({ showLabel }) => <RdsRange showTooltip={false} showLabel={showLabel} type="two-way" value={[0, 20]} />,
  }
)

