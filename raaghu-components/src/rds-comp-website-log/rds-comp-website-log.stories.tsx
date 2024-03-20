import type { Meta, StoryObj } from '@storybook/react';
import RdsCompWebsiteLog from "./rds-comp-website-log";


const meta: Meta = { 
    title: "Components/Website Log",
    component: RdsCompWebsiteLog,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        alignmentType: {
            options: [
                "start",
                "center",
                "end"
            ],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsCompWebsiteLog>;

export default meta;
type Story = StoryObj<typeof RdsCompWebsiteLog>;

export const Default: Story = {
    args: {
        pagination: true,
        recordsPerPage: 5,
        alignmentType: "end",
        websiteLogData: [
            {
                status: "INFO",
                content:
                    "2021-12-28 15:43:39,431 [1 ] oft.EntityFrameworkCore.Model.Validation - Entity &#39;Edition&#39; has a global query filter defined and is the required end of a relationship with the entity &#39;EditionFeatureSetting&#39;. This may lead to unexpected results when the required entity is filtered out. Either configure the navigation as optional, or define matching query filters for both entities in the navigation. See https://go.microsoft.com/fwlink/?linkid=2131316 for more information.",
            },
            {
                status: "WARN",
                content:
                    "2021-12-28 15:43:39,624 [1 ] oft.EntityFrameworkCore.Model.Validation - No type was specified for the decimal property &#39;DailyPrice&#39; on entity type &#39;SubscribableEdition&#39;. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values in &#39;OnModelCreating&#39; using &#39;HasColumnType()&#39;, specify precision and scale using &#39;HasPrecision()&#39; or configure a value converter using &#39;HasConversion()&#39;.",
            },
            {
                status: "INFO",
                content:
                    "2021-12-28 15:43:39,431 [1 ] oft.EntityFrameworkCore.Model.Validation - Entity &#39;Edition&#39; has a global query filter defined and is the required end of a relationship with the entity &#39;EditionFeatureSetting&#39;. This may lead to unexpected results when the required entity is filtered out. Either configure the navigation as optional, or define matching query filters for both entities in the navigation. See https://go.microsoft.com/fwlink/?linkid=2131316 for more information.",
            },
            {
                status: "ERROR",
                content:
                    "2021-12-28 15:43:39,624 [1 ] oft.EntityFrameworkCore.Model.Validation - No type was specified for the decimal property &#39;DailyPrice&#39; on entity type &#39;SubscribableEdition&#39;. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values in &#39;OnModelCreating&#39; using &#39;HasColumnType()&#39;, specify precision and scale using &#39;HasPrecision()&#39; or configure a value converter using &#39;HasConversion()&#39;.",
            },
            {
                status: "WARN",
                content:
                    "2021-12-28 15:43:39,431 [1 ] oft.EntityFrameworkCore.Model.Validation - Entity &#39;Edition&#39; has a global query filter defined and is the required end of a relationship with the entity &#39;EditionFeatureSetting&#39;. This may lead to unexpected results when the required entity is filtered out. Either configure the navigation as optional, or define matching query filters for both entities in the navigation. See https://go.microsoft.com/fwlink/?linkid=2131316 for more information.",
            },
            {
                status: "INFO",
                content:
                    "2021-12-28 15:43:39,624 [1 ] oft.EntityFrameworkCore.Model.Validation - No type was specified for the decimal property &#39;DailyPrice&#39; on entity type &#39;SubscribableEdition&#39;. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values in &#39;OnModelCreating&#39; using &#39;HasColumnType()&#39;, specify precision and scale using &#39;HasPrecision()&#39; or configure a value converter using &#39;HasConversion()&#39;.",
            },
            {
                status: "ERROR",
                content:
                    "2022-06-20 20:56:34,313 [4 ] Microsoft.AspNetCore.Hosting.Diagnostics - Request starting HTTP/2 GET https://localhost:44301/AbpUserConfiguration/GetAll?d=1655738793955 application/json -;. This will cause values to be silently truncated if they do not fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values in &#39;OnModelCreating&#39; using &#39;HasColumnType()&#39;, specify precision and scale using &#39;HasPrecision()&#39; or configure a value converter using &#39;HasConversion()&#39;.",
            },
        ]       
    }
} satisfies Story;
Default.parameters = { controls: {include : ['pagination', 'recordsPerPage', 'alignmentType', 'websiteLogData']}}



