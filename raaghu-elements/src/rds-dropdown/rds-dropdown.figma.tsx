import React from "react";
import figma from "@figma/code-connect";
import RdsDropdown from "./rds-dropdown";

figma.connect(
  RdsDropdown,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-Kit?node-id=497-5019",
  {
    props: {
      changeIcon: figma.instance("🔃 Change Icon"),
      showChevron: figma.boolean("👀 - Show Chevron"),
      text: figma.string("✏️ Text"),
      size: figma.enum("📏 Size", {
        Medium: "medium",
        Large: "large",
        Small: "small",
      }),
      layout: figma.enum("📱 Layout", {
        "Text Only": "Textonly",
        "Icon Before": "IconBefore",
        "Icon Only": "onlyIcon",
      }),
      state: figma.enum("💡 State", {
        Default: "default",
        Hover: "hover",
        Disabled: "disabled",
        Selected: "selected",
      }),
      style: figma.enum("✨ Style", {
        Primary: "primary",
        Secondary: "secondary",
        Outline: "outline",
        Transparent: "transparent",
      }),
      shape: figma.enum("💠 Shape", {
        Rectangle: "rectangle",
        Pill: "pill",
      }),
    },

    example: (props) => (
      <RdsDropdown
        colorVariant="primary" 
        darkDropdown={false}   
        label="Dropdown"       
        listItems={[]}        
        id="dropdown1"         
        {...props}            
      />
    ),
  },
);
