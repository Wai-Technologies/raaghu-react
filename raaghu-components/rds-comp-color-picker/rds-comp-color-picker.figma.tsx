import React from "react"
import  RdsCompColorPicker from "./rds-comp-color-picker"
import { ColorMode, ColorPickerType, PickerType } from "./rds-comp-color-picker.types"
import figma from "@figma/code-connect"

figma.connect(
  RdsCompColorPicker,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=4080-409",
  {
    props: {
      type: figma.enum("⚠️ Type", {
        Default: ColorPickerType.Default,
        Button: ColorPickerType.Button,
        "Button - Expanded": ColorPickerType.ButtonExpanded,
      }),

    },
    example: (props) => <RdsCompColorPicker
      label="Color-Picker"
      value="#9751F2"
      colorMode={ColorMode.HEX}
      pickerType={PickerType.Grid}
      showSwatches
      showTabs
      {...props} />,
  },
)
