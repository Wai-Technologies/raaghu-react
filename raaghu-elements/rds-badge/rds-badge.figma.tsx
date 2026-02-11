import React from "react"
import  RdsBadge  from "./rds-badge"
import figma from "@figma/code-connect"


figma.connect(
  RdsBadge,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=386-3365",
  {
    props: {
      size:figma.enum("📏 Size", { "Small": "small", "Medium": "medium", "Large": "large" }),
      shape:figma.enum("⚠️ Shape", { "Rectangle": "rectangle","Pill":"pill" }),
      layout:figma.enum("📱 Layout", { 
        "Text only": "text", 
        "Icon only": "icon",
        "Left Icon+Text": "icon-text", 
        "Right Icon+Text": "text-icon" }),
      state:figma.enum("💡 State", {
          Default: "default",
          Disabled: "disabled",
        }),
      colorVariant: figma.enum("⚠️ Type", {
        "Primary": "primary",
        "Secondary": "secondary",
        "Tertiary": "tertiary",
        "Danger": "danger",
        "Warning": "warning",
        "Light": "light",
        "Success": "success",
      }),
      styleType: figma.enum("✨ Style", {
        "Primary": "primary",
        "Outline": "outline",
        "Transparent": "transparent",
      }),
    },
      example: (props) => <RdsBadge badgeContent="Badge" {...props} />,
  },
)
