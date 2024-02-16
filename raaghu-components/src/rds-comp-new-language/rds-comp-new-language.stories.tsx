import type { Meta, StoryObj } from '@storybook/react';
import RdsCompNewLanguage from "./rds-comp-new-language";


const meta: Meta = {
  title: "Components/New Language",
  component: RdsCompNewLanguage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof RdsCompNewLanguage>;

export default meta;
type Story = StoryObj<typeof RdsCompNewLanguage>;

export const Default: Story = {
  args: {
    placeholder: "Select Country",
    languageItems: [
      { option: "Invariant Language ()" },
      { option: "Afar (aa)" },
      { option: "Afar (Djibouti) (aa-DJ)" },
      { option: "Afar (Eritrea) (aa-ER)" },
      { option: "Afar (Ethiopia) (aa-ET)" },
      { option: "Afrikaans (af)" },
      { option: "Afrikaans (Namibia) (af-NA)" },
      { option: "Afrikaans (South Africa) (af-ZA)" },
      { option: "Aghem (agq)" },
      { option: "Aghem (Cameroon) (agq-CM)" },
      { option: "Akan (ak)" },
    ],
    languageNames: [
      { option: "Invariant Language ()" },
      { option: "Afar (aa)" },
      { option: "Afar (Djibouti) (aa-DJ)" },
      { option: "Afar (Eritrea) (aa-ER)" },
      { option: "Afar (Ethiopia) (aa-ET)" },
      { option: "Afrikaans (af)" },
      { option: "Afrikaans (Namibia) (af-NA)" },
      { option: "Afrikaans (South Africa) (af-ZA)" },
      { option: "Aghem (agq)" },
      { option: "Aghem (Cameroon) (agq-CM)" },
      { option: "Akan (ak)" },
    ],
  }
} satisfies Story;