import type { Meta, StoryObj } from "@storybook/react";
import RdsCompLanguage from "./rds-comp-language";


const meta: Meta = {
    title: "Components/Language",
    component: RdsCompLanguage,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompLanguage>;

export default meta;
type Story = StoryObj<typeof RdsCompLanguage>;

export const Default: Story = {
    args: {
        cultureList: [
            { option: "Invariant Language", value: "" },
            { option: "Afar", value: "aa" },
            { option: "Afar (Djibouti)", value: "aa-DJ" },
            { option: "Afar (Eritrea)", value: "aa-ER" },
            { option: "Afar (Ethiopia)", value: "aa-ET" },
            { option: "Afrikaans", value: "af" },
            { option: "Afrikaans (Namibia)", value: "af-NA" },
            { option: "Afrikaans (South Africa)", value: "af-ZA" },
            { option: "Aghem", value: "agq" },
            { option: "Aghem (Cameroon)", value: "agq-CM" },
            { option: "Akan", value: "ak" },
        ],
        flagIconList: [
            { option: "Afghanistan", value: "af" },
            { option: "Åland Islands", value: "ax" },
            { option: "Albania", value: "al" },
            { option: "Algeria", value: "dz" },
            { option: "American Samoa", value: "as" },
            { option: "Andorra", value: "ad" },
            { option: "Angola", value: "ao" },
            { option: "Anguilla", value: "ai" },
            { option: "Antigua and Barbuda", value: "ag" },
            { option: "Argentina", value: "ar" },
            { option: "Armenia", value: "am" },
            { option: "Aruba", value: "aw" },
            { option: "Australia", value: "au" },
            { option: "Austria", value: "at" },
            { option: "Azerbaijan", value: "az" },
            // Add more countries as needed
        ],
    }
} satisfies Story;