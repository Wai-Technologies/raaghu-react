import React from "react"
import  RdsAutocomplete  from "./rds-autocomplete"
import figma from "@figma/code-connect"
import PersonIcon from '@mui/icons-material/Person';

figma.connect(
  RdsAutocomplete,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=450-4389",
  {
    props: {
      showTitle: figma.boolean("🆕 Show Title"),
      isMandatory: figma.boolean("❗ Is Mandatory"),
      showHintText: figma.boolean("🔤 Show Hint Text"),
      state: figma.enum("💡 State",{
        Default: "default",
        Expanded: "expanded",
        Selected: "selected",
        Disabled: "disabled"
      }),
      selectSize: figma.enum("📏 Size",  {
        "Small": "small",
        "Medium": "medium",
        "Large": "large"
      }),
      controlStyle: figma.enum("✨ Style", {
        "Default": "default",
        "Bottom Line": "bottom line",
      })
    },
      example: (props) => <RdsAutocomplete
        placeholder="Search here..."
        label="Label"
        helperText="Select one of the available options"
        isShowRadio
        isShowUser
        isShowCheckbox
        userIcon={<PersonIcon />}
        options={[
        {
          label: 'Option 1',
          value: 1
        },
        {
          label: 'Option 2',
          value: 2
        },
        {
          label: 'Option 3',
          value: 3
        },
        {
          label: 'Option 4',
          value: 4
        },
        {
          label: 'Option 5',
          value: 5
        }
      ]}
  {...props} />,
  },
)
