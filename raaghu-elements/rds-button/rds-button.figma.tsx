import React from "react"
import  RdsButton  from "./rds-button"
import figma from "@figma/code-connect"
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

figma.connect(
  RdsButton,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=219-1317",
  {
    props: {
      children: figma.string("✏️ Text"),
      showLeftIcon: figma.boolean("Show Left Icon"),
      showRightIcon: figma.boolean("Show Right Icon"),
      shape: figma.enum("💠 Shape", {
        "Rectangle": "rectangle",
        "Pill": "pill",
      }),
      variant: figma.enum("✨ Style", {
        "Filled": "filled",
        "Outlined": "outlined",
        "Transparent": "transparent",
      }),
      selected: figma.boolean("Selected"),
      disabled: figma.boolean("Disabled"),
      layout: figma.enum("📱 Layout", {
        "Icon+Text": "icon+text",
        "Icon Only": "icon-only",
        "Text Only": "text-only",
      }),
      size: figma.enum("📏 Size", {
        "Small": "small",
        "Medium": "medium",
        "Large": "large",
      }),
    },
      example: (props) => <RdsButton 
      changeRightIcon={<CircleOutlinedIcon />}
      changeLeftIcon={<CircleOutlinedIcon />}
      textCase="uppercase"
      {...props} />,
  },
)
