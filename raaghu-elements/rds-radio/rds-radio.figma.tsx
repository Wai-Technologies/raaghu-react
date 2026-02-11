import React from "react"
import  RdsRadio  from "./rds-radio"
import figma from "@figma/code-connect"
import { Dir } from "fs"

figma.connect(
  RdsRadio,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=346-3467",
  {
    props: {
      layout: figma.enum("📱 Layout", {
        "Icon": "icon",
        "Icon with Label": "icon with label",
        "Icon with bottom Label": "icon with bottom label"
      }),
      state: figma.enum("💡 State", {
        "Default": "default",
        "Hover": "hover",
        "Disabled": "disabled"
      }),
    },
    example: (props) => <RdsRadio
      options={[
        {
          text: 'Option 1',
          value: 'option1'
        }
      ]}
      {...props} />,
  },
)
