import React from "react"
import RdsButtonDropdown from "./rds-button-dropdown"
import figma from "@figma/code-connect"
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'

figma.connect(
  RdsButtonDropdown,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=484-11217",
  {
    props: {
      state: figma.enum("💡 State", {
        Default: "default",
        Selected: "selected"
      })
    },
    example: (props) => <RdsButtonDropdown 
    buttonText="Button"
    leftIcon={<CircleOutlinedIcon />}
    rightIcon={<ExpandMoreOutlinedIcon/>}
    showRadio
    showUserAvatar
    multiSelect
    showSearch
    {...props}
     options={[
    {
      avatarSrc: '',
      checked: false,
      id: 1,
      label: 'Option 1'
    },
    {
      avatarSrc: '',
      checked: false,
      id: 2,
      label: 'Option 2'
    },
    {
      avatarSrc: '',
      checked: false,
      id: 3,
      label: 'Option 3'
    },
    {
      avatarSrc: '',
      checked: false,
      id: 4,
      label: 'Option 4'
    },
    {
      avatarSrc: '',
      checked: false,
      id: 5,
      label: 'Option 5'
    },
  ]}
    />,
  },
)
