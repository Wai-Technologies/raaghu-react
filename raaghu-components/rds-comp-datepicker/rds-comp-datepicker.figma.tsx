import React from "react"
import  RdsDatepicker, { DatePickerLayout, DatePickerState, DatePickerStyleType }  from "./rds-comp-datepicker"
import figma from "@figma/code-connect"


figma.connect(
  RdsDatepicker,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=443-15972",
  {
    props: {
      isMandatory: figma.boolean("❗ - Is Mandatory"),
      showTitle: figma.boolean("🆕 - Show Title"),
      placeholderText: figma.string("✏️ Placeholder Text"),
      state: figma.enum("💡 State", {
        Default: DatePickerState.Default,
        Expanded: DatePickerState.Expanded,
        Selected: DatePickerState.Selected,
      }),
      datePickerStyleType: figma.enum("⚠️ Type", {
        Default: DatePickerStyleType.Dropdown,
        Selector: DatePickerStyleType.Selector,
      }),

      type: figma.enum("⚠️ Type", {
        Default: "Default",
        Custom: "Custom",
      })
    },
    example: (props) =>  <RdsDatepicker 
    titleText="Select Date"
    isDropdownOpen={false} 
    layout={DatePickerLayout.Default}
    {...props} 
    changeIcon="calendar" 
    />,
  },
)
