import React from "react"
import  RdsCompMap  from "./rds-comp-map"
import figma from "@figma/code-connect"


figma.connect(
  RdsCompMap,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=10231-897",
  {
    props: {
    },
    example: (props) => <RdsCompMap   
  color="#A478E6"
  mapList={[
    {
      country: 'cn',
      value: 1389618778
    },
    {
      country: 'in',
      value: 1311559204
    },
    {
      country: 'us',
      value: 331883986
    },
    {
      country: 'id',
      value: 264935824
    },
    {
      country: 'pk',
      value: 210797836
    },
    {
      country: 'br',
      value: 210301591
    },
    {
      country: 'ng',
      value: 208679114
    },
    {
      country: 'bd',
      value: 161062905
    },
    {
      country: 'ru',
      value: 141944641
    },
    {
      country: 'mx',
      value: 127318112
    }
  ]}
  title="Map" />,
  },
)
