import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompNewLanguage from "./rds-comp-new-language";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
  title: "Components/New Language",
  component: RdsCompNewLanguage,
  decorators: [
    (StoryComponent) => (
      <I18nextProvider i18n={i18n}>
        <StoryComponent />
      </I18nextProvider>
    ),
  ],
} as ComponentMeta<typeof RdsCompNewLanguage>;

const Template: ComponentStory<typeof RdsCompNewLanguage> = (args) => (
  <RdsCompNewLanguage {...args} />
);

export const NewLanguage = Template.bind({});

NewLanguage.args = {
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
};
