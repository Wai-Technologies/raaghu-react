import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompBillingAddress from "./rds-comp-billing-address";


const meta: Meta = {
    title: "Components/Billing Address",
    component: RdsCompBillingAddress,
    parameters: {
        layout: 'padded',
        docs: {
    description: {
        component: 
            'The **Billing Address** component is a customizable UI element designed to capture and manage billing address details within your application. It supports features such as a `countryList` array to display a list of countries and an `IndianStateList` array to provide state options for India. Each list includes properties like `option` for the display name and `value` for the corresponding code, ensuring structured and accurate data handling. This component is ideal for e-commerce platforms, payment systems, or any interface requiring user-friendly and structured address input. Fully customizable, the Billing Address component ensures a seamless user experience while maintaining consistency with your design system and functional requirements.'
    },
}
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompBillingAddress>;

export default meta;
type Story = StoryObj<typeof RdsCompBillingAddress>;

export const Standard: Story = {
    args: {
        countryList: [
            { option: "Afghanistan" , value: "AF" },
            { option: "Albania" , value: "AL" },
            { option: "Algeria"     , value: "DZ" },
            { option: "American Samoa" , value: "AS" },
            { option: "Andorra" , value: "AD" },
            { option: "Angola" , value: "AO" },
            { option: "Anguilla" , value: "AI" },
            { option: "Antarctica" , value: "AQ" },
            { option: "Antigua and Barbuda" , value: "AG" },
            { option: "Argentina" , value: "AR" },
            { option: "Armenia" , value: "AM" },
            { option: "Aruba" , value: "AW" },
            { option: "Australia" , value: "AU" },
            { option: "Austria" , value: "AT" },
            { option: "Azerbaijan" , value: "AZ" },
            { option: "Bahamas (the)" , value: "BS" },
            { option: "Bahrain" , value: "BH" },
            { option: "Bangladesh" , value: "BD" },
            { option: "Barbados" , value: "BB" },
            { option: "Belarus" , value: "BY" },
            { option: "Belgium" , value: "BE" },
            { option: "Belize" , value: "BZ" },
            { option: "Benin" , value: "BJ" },
            { option: "Bermuda" , value: "BM" },
        ],

        IndianStateList: [
            { option: "Andhra Pradesh", value: "AP" },
            { option: "Arunachal Pradesh", value: "AR"},
            { option: "Assam", value: "AS"},
            { option: "Bihar", value: "BR"},
            { option: "Chhattisgarh", value: "CT"},
            { option: "Goa", value: "GA"},
            { option: "Gujarat" , value: "GJ"},
            { option: "Haryana", value: "HR"},
            { option: "Himachal Pradesh", value: "HP"},
            { option: "Jammu and Kashmir", value: "JK"},
            { option: "Jharkhand", value: "JH"},
            { option: "Karnataka", value: "KA"},
            { option: "Kerala", value: "KL"},
           
        ]
    }
} satisfies Story;
// Standard.parameters = { controls: { include: ['countryList', 'IndianStateList'] } };


