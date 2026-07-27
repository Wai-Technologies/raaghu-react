import React from "react"
import  RdsSwitch  from "./rds-switch"
import figma from "@figma/code-connect"

figma.connect(
  RdsSwitch,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=720-54963",
  {
    props: {
      showLabel: figma.boolean("📝 - Label Text"),
      label: figma.string("✏️ Text / Title"),
      state: figma.enum("💡 State", {
        "On": "on",
        "Off": "off",
        "Disabled On": "disabled on",
        "Disabled Off": "disabled off",
      }),
      layout:figma.enum("📱 Layout", {
        "Switch + Label": "switch+label",
        "Label + Switch": "label+switch",
        "Top Label + Switch": "toplabel+switch",
        "Bottom Label + Switch": "bottomlabel+switch",
      }),
      style: figma.enum("✨ Style", {
        "Style 1": "style1",
        "Style 2": "style2",
        "Style 3": "style3",
        "Style 4": "style4",
        "Style 5": "style5",
      }),

    },
    example: (props) => <RdsSwitch {...props} />,
  },
)
