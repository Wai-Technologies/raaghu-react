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
      disabled: figma.enum("💡 State", {
        "Default": false,
        "Hover": false,
        "Disabled": true,
      }),
    },
    example: (props) => <RdsRadio
      options={[
        {
          label: 'Option 1',
          value: 'option1'
        }
      ]}
      {...props} />,
  },
)
