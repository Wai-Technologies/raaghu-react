/* eslint-disable */

import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTenantRegister from "./rds-comp-tenant-register";


const meta: Meta = {
  title: "Components/Tenant Register",
  component: RdsCompTenantRegister,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompTenantRegister>;

export default meta;
type Story = StoryObj<typeof RdsCompTenantRegister>;

export const Default: Story = {
  args: {
    countryFlagList: [
      {
        "label": "EN(US)",
        "val": "en",
        "icon": "us",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "English(IND)",
        "val": "en",
        "icon": "in",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "Français",
        "val": "fr",
        "icon": "fr",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "Deutsch",
        "val": "de",
        "icon": "de",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "Português (Brasil)",
        "val": "pt-BR",
        "icon": "br",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "Türkçe",
        "val": "tr",
        "icon": "tr",
        "iconWidth": "20px",
        "iconHeight": "20px"
      },
      {
        "label": "Italiano",
        "val": "it",
        "icon": "it",
        "iconWidth": "20px",
        "iconHeight": "20px"
      }
    ]
  }
} satisfies Story;


