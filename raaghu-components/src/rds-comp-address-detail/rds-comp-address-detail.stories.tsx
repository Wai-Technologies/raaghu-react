import React from "react";
import RdsCompAddressDetail from "./rds-comp-address-detail";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta = {
  title: 'Components/Address Detail',
  component: RdsCompAddressDetail,
  parameters: {
    layout: 'padded',
    docs:{
      description: {
  component: `The **Address Detail** component provides a clean and structured way to display detailed address information in a card-like format. It accepts a \`withIcon\` boolean prop to optionally display an icon for visual enhancement. The \`header\` string prop allows setting a customizable title for the address section, improving clarity and context. It supports up to three address lines through the \`addressLine1\`, \`addressLine2\`, and \`addressLine3\` string props, enabling flexible and complete address representation. The \`cardborder\` boolean prop toggles the border styling around the component, allowing it to seamlessly fit into different UI styles either as a bordered card or a borderless layout. This component is ideal for applications that require clear, accessible, and visually distinct presentation of address details in user profiles, forms, or summary cards.`
}



     
    }
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompAddressDetail>;

export default meta;
type Story = StoryObj<typeof RdsCompAddressDetail>;



//👇 Each story then reuses that template
export const DetailedAddressCard: Story = {
  args: {
    withIcon: true,
    header: "Address Header",
    addressLine1: "Address Line 1",
    addressLine2: "Address Line 2",
    addressLine3: "Address Line 3",
    cardborder: true
  }
} satisfies Story;
DetailedAddressCard.parameters = { controls: { include: ['withIcon', 'header', 'addressLine1', 'addressLine2', 'addressLine3', 'cardborder'] } };
