import React from "react"
import  RdsDatepicker from "./rds-comp-datepicker"
import { DatePickerLayout, DatePickerState } from "./rds-comp-datepicker.types"
import figma from "@figma/code-connect"


figma.connect(
  RdsDatepicker,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=443-15972",
  {
    props: {
      required: figma.boolean("❗ - Is Mandatory"),
      showTitle: figma.boolean("🆕 - Show Title"),
      placeholder: figma.string("✏️ Placeholder Text"),
      state: figma.enum("💡 State", {
        Default: DatePickerState.Default,
        Expanded: DatePickerState.Expanded,
        Selected: DatePickerState.Selected,
      }),
      variant: figma.enum("⚠️ Type", {
        Default: "dropdown",
        Selector: "selector",
      }),

      type: figma.enum("⚠️ Type", {
        Default: "Default",
        Custom: "Custom",
      })
    },
    example: (props) =>  <RdsDatepicker 
    label="Select Date"
    isDropdownOpen={false} 
    layout={DatePickerLayout.Default}
    {...props} 
    />,
  },
)
