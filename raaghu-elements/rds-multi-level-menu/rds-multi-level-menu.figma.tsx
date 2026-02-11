import React from "react"
import RdsMultiLevelMenu from "./rds-multi-level-menu"
import figma from "@figma/code-connect"

figma.connect(
  RdsMultiLevelMenu,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=959-2790",
  {
    props: {
      size: figma.enum("📏 Size", {
        Default: "default",
        Large: "large"
      })
    },
    example: (props) => <RdsMultiLevelMenu 
    {...props}
    options={[
    {
      label: 'Option',
      shortcut: 'Shortcut'
    },
    {
      label: 'Option',
      shortcut: 'Shortcut'
    },
    {
      children: [
        {
          label: 'Option',
          shortcut: 'Shortcut'
        },
        {
          label: 'Option',
          shortcut: 'Shortcut'
        },
        {
          label: 'Option',
          shortcut: 'Shortcut'
        }
      ],
      label: 'Option',
      shortcut: 'Shortcut'
    },
    {
      label: 'Option',
      shortcut: 'Shortcut'
    },
    {
      label: 'Option',
      shortcut: 'Shortcut'
    },
    {
      label: 'Option',
      shortcut: 'Shortcut'
    }
  ]}/>,
  },
)
