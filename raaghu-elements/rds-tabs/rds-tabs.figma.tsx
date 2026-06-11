import React from "react"
import  RdsTabs  from "./rds-tabs"
import figma from "@figma/code-connect"


figma.connect(
  RdsTabs,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=380-3338",
  {
    props: {
      type:figma.enum("⚠️ Type", {
        Horizontal: "horizontal",
        Vertical: "vertical"
      }),
      layout: figma.enum("📱 Layout", {
        "Filled": "filled",
        "Flap": "flap",
        "Line - Bottom": "line-bottom",
        "Line - Bottom Solid": "line-bottom-solid",
        "Line - Left": "line-left",
        "Line - Left Solid": "line-left-solid",
        "Line - Right": "line-right",
        "Line - Right Solid": "line-right-solid",
        "Line - Top": "line-top",
        "Line - Top Solid": "line-top-solid",
        "Pill": "pill"
      }),
      state: figma.enum("💡 State", {
        "Default": "default",
        "Hover": "hover",
        "Selected": "selected",
        "Disabled": "disabled"
      }),
    },
    example: (props) => <RdsTabs 
    tabs={[
      {
        disabled: false,
        id: 0,
        label: 'Overview'
      }
    ]} 
    activeTab={0}
    {...props} />,
  },
)
