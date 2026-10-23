import React from "react"
import  RdsCounter  from "./rds-counter"
import figma from "@figma/code-connect"

figma.connect(
  RdsCounter  ,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=702-19519",
  {
    props: {
      showTitle: figma.boolean("🆕 - Show Title"),
      label: figma.string("✏️ Change Title"),
      required: figma.boolean("❗ - Is Mandatory"),
      disabled: figma.boolean("Disabled"),
      selected: figma.boolean("Selected"),
    },
  example: (props) => <RdsCounter 
  min={0} 
  max={50} 
  {...props} 
  placeholder={'0'} 
  onChange={() => {}} />, 
  },
)
