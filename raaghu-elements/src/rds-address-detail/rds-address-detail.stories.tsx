import React from "react";
import RdsAddressDetail from "./rds-address-detail";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";


const meta: Meta = {
  title: 'Components/Address Detail',
  component: RdsAddressDetail,
  parameters: {
    layout: 'padded',
    docs:{
      description: {
  component: `The **Address Detail** component provides a clean and structured way to display detailed address information in a card-like format. It accepts a \`withIcon\` boolean prop to optionally display an icon for visual enhancement. The \`header\` string prop allows setting a customizable title for the address section, improving clarity and context. It supports up to three address lines through the \`addressLine1\`, \`addressLine2\`, and \`addressLine3\` string props, enabling flexible and complete address representation. The \`cardborder\` boolean prop toggles the border styling around the component, allowing it to seamlessly fit into different UI styles either as a bordered card or a borderless layout. This component is ideal for applications that require clear, accessible, and visually distinct presentation of address details in user profiles, forms, or summary cards.`
}



     
    }  },
  tags: ['autodocs'],
  argTypes: {
    onSaveHandler: { action: 'save-handler-triggered' },
  },
} satisfies Meta<typeof RdsAddressDetail>;

export default meta;
type Story = StoryObj<typeof RdsAddressDetail>;


export const AddressInput: Story = {
    args: {
        countriesList: [
            { label: "United States", val: "United States" },
            { label: "United Kingdom", val: "United Kingdom" },
            { label: "Japan", val: "Japan" },
            { label: "France", val: "France" },
            { label: "Australia", val: "Australia" }
        ],
        citiesList: [
            { label: "New York", val: "New York" },
            { label: "London", val: "London" },
            { label: "Tokyo", val: "Tokyo" },
            { label: "Paris", val: "Paris" },
            { label: "Sydney", val: "Sydney" }
        ],
        statesList: [
            { label: "California", val: "California" },
            { label: "Texas", val: "Texas" },
            { label: "New South Wales", val: "New South Wales" },
            { label: "Tokyo", val: "Tokyo" },
            { label: "Île-de-France", val: "Île-de-France" }
        ],
        addressType: "input",
        onSaveHandler: action("address-input-saved")
    }
} satisfies Story;
AddressInput.parameters = { controls: { include: ['countriesList', 'citiesList', 'statesList', 'address', 'address2', 'city', 'zip', 'AddressData', 'reset', 'label','onSaveHandler'] } };

export const BillingAddress: Story = {
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
           
    ],
        addressType: "billing",
    }
} satisfies Story;
BillingAddress.parameters = { controls: { include: ['countryList', 'IndianStateList', 'onSaveHandler', 'billingAddressDetails'] } };

export const DetailedAddressCard: Story = {
  args: {
    withIcon: true,
    header: "Address Header",
    addressLine1: "Address Line 1",
    addressLine2: "Address Line 2",
    addressLine3: "Address Line 3",
    cardborder: true,
    addressType: "address",
  }
} satisfies Story;
DetailedAddressCard.parameters = { controls: { include: ['withIcon', 'header', 'addressLine1', 'addressLine2', 'addressLine3', 'cardborder'] } };

export const ShippingAddress: Story = {
    args: {
        countryList: [
                    {
                        "value": "1",
                        "option": "India",
                        // "isSelected": false
                    },
                    {
                        "value": "2",
                        "option": "China",
                        // "isSelected": false
                    },
                    {
                        "value": "3",
                        "option": "Canada",
                        // "isSelected": false
                    },
                    {
                        "value": "4",
                        "option": "Japan",
                        // "isSelected": false
                    },
                    {
                        "value": "5",
                        "option": "Australia",
                        // "isSelected": false
                    },
                    {
                        "value": "6",
                        "option": "USA",
                        // "isSelected": false
                    },
                    {
                        "value": "7",
                        "option": "UK",
                        // "isSelected": false
                    }
    ],
      addressType: "shipping",
    }
} satisfies Story;
ShippingAddress.parameters = { controls: { include: ['countryList', 'shippingAddressData', 'onSaveHandler','reset'] } };
