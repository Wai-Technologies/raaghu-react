import React from "react";
import figma from "@figma/code-connect";
import RdsDropdown, { Layout, Shape, State, Style } from "./rds-dropdown";

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
        "Text Only": Layout.TextOnly,
        "Icon Before": Layout.IconBefore,
        "Icon Only": Layout.OnlyIcon,
      }),
      state: figma.enum("💡 State", {
        Default: State.Default,
        Hover: State.Hover,
        Disabled: State.Disabled,
        Selected: State.Selected,
      }),
      style: figma.enum("✨ Style", {
        Primary: Style.Primary,
        Secondary: Style.Secondary,
        Outline: Style.Outline,
        Transparent: Style.Transparent,
      }),
      shape: figma.enum("💠 Shape", {
        Rectangle: Shape.Rectangle,
        Pill: Shape.Pill,
      }),
    },

    example: (props) => (
      <RdsDropdown
        {...props}  
        colorVariant="primary" 
        darkDropdown={false}   
        label="Dropdown"       
        listItems={[]}        
        id="dropdown1"         
      />
    ),
  },
);
