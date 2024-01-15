import React from "react";
import { RdsCompDatatable } from "../../index";

export const code_actual = () => {
    return (
        <RdsCompDatatable
            tableHeaders={[
                {
                    displayName: "Edition Name",
                    key: "editionName",
                    datatype: "text",
                    dataLength: 30,
                    required: true,
                    sortable: true,
                },
                {
                    displayName: "Price ($)",
                    key: "price",
                    datatype: "number",
                    dataLength: 5,
                    required: false,
                    sortable: true,
                },
                {
                    displayName: "Trial Period(Day(s))",
                    key: "trialPeriod",
                    datatype: "number",
                    dataLength: 5,
                    required: true,
                },
                {
                    displayName: "Status",
                    key: "status",
                    datatype: "badge",
                    dataLength: 5,
                    required: true,
                },
            ]}
            tableData={[
                {
                    id: 1,
                    editionName: "Standard",
                    price: 60,
                    trialPeriod: 5,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 2,
                    editionName: "Basic",
                    price: 120,
                    trialPeriod: 10,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 3,
                    editionName: "Premium",
                    price: 250,
                    trialPeriod: 5,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 4,
                    editionName: "Standard",
                    price: 60,
                    trialPeriod: 7,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 5,
                    editionName: "Basic",
                    price: 100,
                    trialPeriod: 15,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 6,
                    editionName: "Standard",
                    price: 60,
                    trialPeriod: 5,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 7,
                    editionName: "Premium",
                    price: 100,
                    trialPeriod: 47,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 8,
                    editionName: "Standard",
                    price: 100,
                    trialPeriod: 53,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 9,
                    editionName: "Standard",
                    price: 100,
                    trialPeriod: 35,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 10,
                    editionName: "Basic",
                    price: 100,
                    trialPeriod: 35,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 11,
                    editionName: "Premium",
                    price: 100,
                    trialPeriod: 95,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 12,
                    editionName: "Standard",
                    price: 100,
                    trialPeriod: 75,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 13,
                    editionName: "Premium",
                    price: 100,
                    trialPeriod: 15,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 14,
                    editionName: "Basic",
                    price: 100,
                    trialPeriod: 45,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 15,
                    editionName: "Standard",
                    price: 100,
                    trialPeriod: 3,
                    status: { badgeColorVariant: "success", content: "active" },
                },
                {
                    id: 16,
                    editionName: "Basic",
                    price: 100,
                    trialPeriod: 1,
                    status: { badgeColorVariant: "success", content: "active" },
                },
            ]}
            actions={[
                { id: "delete", displayName: "Delete" },
                { id: "edit", displayName: "Edit" },
            ]}
            pagination={false}
        />
    );
};

export default code_actual;
