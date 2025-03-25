import type { Meta, StoryObj } from '@storybook/react';
import RdsCompGrid from "./rds-comp-grid";

const meta: Meta = { 
    title: "Elements/Grid",
    component: RdsCompGrid,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompGrid>;

export default meta;
type Story = StoryObj<typeof RdsCompGrid>;
export const Default: Story = {
    args: {
        tableHeaders: [
            
            {
                displayName: "Title",
                filter: true,
                key: "edition",
                datatype: "text",
                dataLength: 30,
                required: true,
                sortable: true,
            },
            {
                displayName: "Title",
                filter: true,
                key: "edition",
                datatype: "text",
                dataLength: 30,
                required: true,
                sortable: true,
            },
            {
                displayName: "Title",
                filter: true,
                key: "edition",
                datatype: "text",
                dataLength: 30,
                required: true,
                sortable: true,
            },
            {
                displayName: "Title",
                filter: true,
                key: "edition",
                datatype: "text",
                dataLength: 30,
                required: true,
                sortable: true,
            },
            {
                displayName: "Title",
                filter: true,
                key: "edition",
                datatype: "text",
                dataLength: 30,
                required: true,
                sortable: true,
            },
            
            
        ],
        tableData: [
            { id: 1, edition: "Text" },
            { id: 2, edition: "Text" },
            { id: 3, edition: "Text" },
            { id: 4, edition: "Text" },
            { id: 5, edition: "Text" },
            { id: 6, edition: "Text" },
            { id: 7, edition: "Text" },
            { id: 8, edition: "Text" },
            { id: 9, edition: "Text" },
        ],
        state: "Default",
        showHeader: true, 
        showAddNewColumn: true,
        showSubHeader: true,
    }
} satisfies Story;

Default.parameters = { controls: { include: ['state', 'showHeader', 'showSubHeader', ' showAddNewColumn'] } };


// export const Default: Story = {
//     args: {
     
//                  tableHeaders : [
//                     { key: 'name', label: 'Name', displayName: 'Name'},
//                     { key: 'age', label: 'Age', displayName: 'Age' },
//                     { key: 'email', label: 'Email', displayName: 'Email' },
//                   ],
//                    tableData : [
//                     { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com' },
//                     { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com' },
//                     { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com' },
//                   ],                      
//     }
// } satisfies Story;
// Default.parameters = { controls: { include: ['tableHeaders','tableData', 'allSearch', 'allFilter'] } };

// export const WithAllSearch: Story = {
//   args: {
   
//     tableHeaders : [
//       { key: 'name', label: 'Name', displayName: 'Name' },
//       { key: 'age', label: 'Age', displayName: 'Age' },
//       { key: 'email', label: 'Email', displayName: 'Email' },
//       { key: 'address', label: 'Address', displayName: 'Address'},
//       { key: 'role', label: 'Role', displayName: 'Role' },
//       { key: 'country', label: 'Country', displayName: 'Country' },
//       { key: 'status', label: 'Status', displayName: 'Status' },
//     ],
//      tableData : [
//       { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//       { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
//       { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//       { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//       { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
//       { id: 6, name: 'Jacub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street dhfsdk thdf dfjd dfjd dfkjd df', role: 'admin', country: 'India', status: 'active'},  
//     ], 
//     allSearch: true,
//   }
// } satisfies Story;
// WithAllSearch.parameters = { controls: { include: ['tableHeaders','tableData', 'allSearch', 'allFilter'] } };


// export const WithAllFilter: Story = {
//   args: {
   
//                tableHeaders : [
//                   { key: 'name', label: 'Name', displayName: 'Name' },
//                   { key: 'age', label: 'Age', displayName: 'Age' },
//                   { key: 'email', label: 'Email', displayName: 'Email' },
//                   { key: 'address', label: 'Address', displayName: 'Address' },
//                   { key: 'role', label: 'Role', displayName: 'Role' },
//                   { key: 'country', label: 'Country', displayName: 'Country' },
//                   { key: 'status', label: 'Status', displayName: 'Status' },
//                 ],
//                  tableData : [
//                   { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
//                   { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
//                   { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
//                   { id: 6, name: 'Jacub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  

//                 ],     
//                 allFilter: true,
//                 totalRecords: 6,            
//   }
// } satisfies Story;
// WithAllFilter.parameters = { controls: { include: ['tableHeaders','tableData', 'allSearch', 'allFilter','totalRecords'] } };

// export const WithSort: Story = {
//   args: {
   
//                tableHeaders : [
//                   { key: 'name', label: 'Name', displayName: 'Name', sortable: true},
//                   { key: 'age', label: 'Age', displayName: 'Age', sortable: true },
//                   { key: 'email', label: 'Email', displayName: 'Email', sortable: true },
//                   { key: 'address', label: 'Address', displayName: 'Address', sortable: true },
//                   { key: 'role', label: 'Role', displayName: 'Role', sortable: true },
//                   { key: 'country', label: 'Country', displayName: 'Country', sortable: true },
//                   { key: 'status', label: 'Status', displayName: 'Status', sortable: true },
//                 ],
//                  tableData : [
//                   { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
//                   { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
//                   { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
//                   { id: 6, name: 'Jacub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  

//                 ],                
//                 totalRecords: 6,       
//   }
// } satisfies Story;
// WithAllFilter.parameters = { controls: { include: ['tableHeaders','tableData', 'allSearch', 'allFilter','totalRecords'] } };

// export const WithCustomFilter: Story = {
//   args: {
   
//                tableHeaders : [
//                 { key: 'name', label: 'Name', displayName: 'Name', filter: true},
//                 { key: 'age', label: 'Age', displayName: 'Age', filter: true},
//                 { key: 'email', label: 'Email', displayName: 'Email', filter: true},
//                 { key: 'address', label: 'Address', displayName: 'Address' },
//                 { key: 'role', label: 'Role', displayName: 'Role'},
//                 { key: 'country', label: 'Country', displayName: 'Country', filter: true},
//                 { key: 'status', label: 'Status', displayName: 'Status', filter: true},                 
//                 ],
//                  tableData : [                 
//                   { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
//                   { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
//                   { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
//                   { id: 6, name: 'Jakub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  
//                   { id: 7, name: 'John Doe666', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 8, name: 'Jane Doe444', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
//                   { id: 9, name: 'Mary Smith7', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
//                   { id: 10, name: 'Marry Doer', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 11, name: 'Marry', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
//                   { id: 12, name: 'Jakub ', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  
//                 ]              
//   }
// } satisfies Story;
// WithCustomFilter.parameters = { controls: { include: ['tableHeaders','tableData','pagination', 'recordsPerPage','', 'allSearch', 'allFilter'] } };

// export const WithCustomSearch: Story = {
//   args: {
   
//                tableHeaders : [
//                   { key: 'name', label: 'Name', displayName: 'Name', hasSearch: true },
//                   { key: 'age', label: 'Age', displayName: 'Age' },
//                   { key: 'email', label: 'Email', displayName: 'Email', },
//                   { key: 'address', label: 'Address', displayName: 'Address' },
//                   { key: 'role', label: 'Role', displayName: 'Role', hasSearch: true},
//                   { key: 'country', label: 'Country', displayName: 'Country' },
//                   { key: 'status', label: 'Status', displayName: 'Status', hasSearch: true},
//                 ],
//                  tableData : [
//                   { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
//                   { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
//                   { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
//                   { id: 6, name: 'Jakub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  

//                 ] 
//   }
// } satisfies Story;
// WithCustomSearch.parameters = { controls: { include: ['tableHeaders','tableData', 'allSearch', 'allFilter'] } };

// export const WithPagination: Story = {
//   args: {
   
//                tableHeaders : [
//                 { key: 'name', label: 'Name', displayName: 'Name' },
//                 { key: 'age', label: 'Age', displayName: 'Age' },
//                 { key: 'email', label: 'Email', displayName: 'Email' },
//                 { key: 'address', label: 'Address', displayName: 'Address' },
//                 { key: 'role', label: 'Role', displayName: 'Role' },
//                 { key: 'country', label: 'Country', displayName: 'Country' },
//                 { key: 'status', label: 'Status', displayName: 'Status' }, 
//                 ],
//                  tableData : [                 
//                   { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
//                   { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
//                   { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
//                   { id: 6, name: 'Jakub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  
//                   { id: 7, name: 'John Doe666', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 8, name: 'Jane Doe444', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
//                   { id: 9, name: 'Mary Smith7', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
//                   { id: 10, name: 'Marry Doer', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 11, name: 'Marry', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
//                   { id: 12, name: 'Jakub ', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  
//                 ] ,
//                 recordsPerPageSelectListOption: true,
//                 pagination: true,
//                 recordsPerPage: 5,
//                 totalRecords: 12,          
              
//   }
// } satisfies Story;
// WithPagination.parameters = { controls: { include: ['tableHeaders','tableData','recordsPerPageSelectListOption','pagination', 'recordsPerPage','', 'allSearch', 'allFilter'] } };

// export const WithWrapText: Story = {
//   args: {
   
//                tableHeaders : [
//                 { key: 'name', label: 'Name', displayName: 'Name', wraptext: true },
//                 { key: 'age', label: 'Age', displayName: 'Age' },
//                 { key: 'email', label: 'Email', displayName: 'Email', wraptext: true },
//                 { key: 'address', label: 'Address', displayName: 'Address', wraptext: true },
//                 { key: 'role', label: 'Role', displayName: 'Role' },
//                 { key: 'country', label: 'Country', displayName: 'Country' },
//                 { key: 'status', label: 'Status', displayName: 'Status' },               
//                 ],
//                  tableData : [                 
//                   { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street, apt 456, cityname, statename, countryname, 123456, landmark near xyz, building name, block 7, floor 3, door 8, some additional text to make it 200 characters.', role: 'admin', country: 'India', status: 'active'},
//                   { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '456, def street, apt 789, cityname, statename, countryname, 654321, landmark near abc, building name, block 9, floor 2, door 12, some additional text to make it 200 characters.', role: 'admin', country: 'USA', status: 'deactive'},
//                   { id: 3, name: 'Mary Smith', age: 32, email: 'xyz@mm.com', address: '789, ghi street, apt 012, cityname, statename, countryname, 789012, landmark near lmn, building name, block 1, floor 5, door 15, some additional text to make it 200 characters.', role: 'admin', country: 'UK', status: 'active'},
//                   { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '012, jkl street, apt 345, cityname, statename, countryname, 210345, landmark near opq, building name, block 2, floor 4, door 18, some additional text to make it 200 characters.', role: 'admin', country: 'India', status: 'active'},
//                   { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '345, mno street, apt 678, cityname, statename, countryname, 543678, landmark near rst, building name, block 3, floor 1, door 21, some additional text to make it 200 characters.', role: 'admin', country: 'USA', status: 'deactive'},
//                   { id: 6, name: 'Jakub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street', role: 'admin', country: 'India', status: 'active'},  
//                   { id: 7, name: 'John Doe666', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 8, name: 'Jane Doe444', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
//                   { id: 9, name: 'Mary Smith7', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
//                   { id: 10, name: 'Marry Doer', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
//                   { id: 11, name: 'Marry', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
//                   { id: 12, name: 'Jakub ', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  
//                 ] ,
//                 pagination: true,
//                 recordsPerPage: 5,
//                 totalRecords: 12              
//   }
// } satisfies Story;
// WithWrapText.parameters = { controls: { include: ['tableHeaders','tableData','pagination', 'recordsPerPage','', 'allSearch', 'allFilter'] } };

// export const WithAction: Story = {
//   args: {
   
//                tableHeaders : [
//                 { key: 'name', label: 'Name', displayName: 'Name', wraptext: true },
//                 { key: 'age', label: 'Age', displayName: 'Age' },
//                 { key: 'email', label: 'Email', displayName: 'Email', wraptext: true },
//                 { key: 'address', label: 'Address', displayName: 'Address', wraptext: true },
//                 { key: 'role', label: 'Role', displayName: 'Role' },
//                 { key: 'country', label: 'Country', displayName: 'Country' },
//                 { key: 'status', label: 'Status', displayName: 'Status', datatype: 'badge' },               
//                 ],
//                  tableData : [                 
//                   { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street, apt 456, cityname, statename, countryname, 123456, landmark near xyz, building name, block 7, floor 3, door 8, some additional text to make it 200 characters.', role: 'admin', country: 'India',  status:{ "badgeColorVariant": "success", "content": "active" }},
//                   { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '456, def street, apt 789, cityname, statename, countryname, 654321, landmark near abc, building name, block 9, floor 2, door 12, some additional text to make it 200 characters.', role: 'admin', country: 'USA', status:  { "badgeColorVariant": "primary", "content": "deactive" }},
//                   { id: 3, name: 'Mary Smith', age: 32, email: 'xyz@mm.com', address: '789, ghi street, apt 012, cityname, statename, countryname, 789012, landmark near lmn, building name, block 1, floor 5, door 15, some additional text to make it 200 characters.', role: 'admin', country: 'UK', status:{ "badgeColorVariant": "success", "content": "active" }},
//                   { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '012, jkl street, apt 345, cityname, statename, countryname, 210345, landmark near opq, building name, block 2, floor 4, door 18, some additional text to make it 200 characters.', role: 'admin', country: 'India', status:{ "badgeColorVariant": "success", "content": "active" }},
//                   { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '345, mno street, apt 678, cityname, statename, countryname, 543678, landmark near rst, building name, block 3, floor 1, door 21, some additional text to make it 200 characters.', role: 'admin', country: 'USA', status: { "badgeColorVariant": "primary", "content": "deactive" }},
//                   { id: 6, name: 'Jakub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street', role: 'admin', country: 'India', status:{ "badgeColorVariant": "success", "content": "active" }},  
//                   { id: 7, name: 'John Doe666', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status:{ "badgeColorVariant": "success", "content": "active" }},
//                   { id: 8, name: 'Jane Doe444', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status:  { "badgeColorVariant": "primary", "content": "deactive" }},
//                   { id: 9, name: 'Mary Smith7', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status:{ "badgeColorVariant": "success", "content": "active" }},
//                   { id: 10, name: 'Marry Doer', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status:{ "badgeColorVariant": "success", "content": "active" }},
//                   { id: 11, name: 'Marry', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status:  { "badgeColorVariant": "primary", "content": "deactive" }}, 
//                   { id: 12, name: 'Jakub ', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status:{ "badgeColorVariant": "success", "content": "active" }},  
//                 ] ,
//                 pagination: true,
//                 recordsPerPage: 5,
//                 totalRecords: 12,
//                 actions: [
//                   { id: "delete", displayName: "Delete" },
//                   { id: "edit", displayName: "Edit" },
//               ],             
//               actionPosition: "right",      
//               enablecheckboxselection: true,     
//   }
// } satisfies Story;
// WithAction.parameters = { controls: { include: ['tableHeaders','tableData','pagination', 'recordsPerPage','', 'allSearch', 'allFilter','actions','actionPosition','enablecheckboxselection'] } };

// export const Advance: Story = {
//   args: {
//     tableHeaders: [
//       { key: 'name', label: 'Name', displayName: 'Name', wraptext: true, hidden: false, fixed: false, frozen: false },
//       { key: 'age', label: 'Age', displayName: 'Age', hidden: false, fixed: false, frozen: false },
//       { key: 'email', label: 'Email', displayName: 'Email', wraptext: true, hidden: false, fixed: true, frozen: false },
//       { key: 'address', label: 'Address', displayName: 'Address', wraptext: true, hidden: false, fixed: false, frozen: false },
//       { key: 'role', label: 'Role', displayName: 'Role', hidden: false, fixed: false, frozen: false },
//       { key: 'country', label: 'Country', displayName: 'Country', hidden: false, fixed: false, frozen: false },
//       { key: 'status', label: 'Status', displayName: 'Status', hidden: false, fixed: false, frozen: true },
//     ],
//     tableData: [
//       { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street, apt 456, cityname, statename, countryname, 123456, landmark near xyz, building name, block 7, floor 3, door 8, some additional text to make it 200 characters.', role: 'admin', country: 'India', status:  'active' },
//       { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '456, def street, apt 789, cityname, statename, countryname, 654321, landmark near abc, building name, block 9, floor 2, door 12, some additional text to make it 200 characters.', role: 'admin', country: 'USA',status:  'active' },
//       { id: 3, name: 'Mary Smith', age: 32, email: 'xyz@mm.com', address: '789, ghi street, apt 012, cityname, statename, countryname, 789012, landmark near lmn, building name, block 1, floor 5, door 15, some additional text to make it 200 characters.', role: 'admin', country: 'UK', status:  'active' },
//       { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '012, jkl street, apt 345, cityname, statename, countryname, 210345, landmark near opq, building name, block 2, floor 4, door 18, some additional text to make it 200 characters.', role: 'admin', country: 'India', status:  'active' },
//       { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '345, mno street, apt 678, cityname, statename, countryname, 543678, landmark near rst, building name, block 3, floor 1, door 21, some additional text to make it 200 characters.', role: 'admin', country: 'USA',status:  'active' },
//       { id: 6, name: 'Jakub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street', role: 'admin', country: 'India', status:  'active'},
//       { id: 7, name: 'John Doe666', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active' },
//       { id: 8, name: 'Jane Doe444', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'inactive'  },
//       { id: 9, name: 'Mary Smith7', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'  },
//       { id: 10, name: 'Marry Doer', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status:  'active'  },
//       { id: 11, name: 'Marry', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status:  'inactive'  },
//       { id: 12, name: 'Jakub ', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status:  'active'  },
//     ],
//     pagination: true,
//     recordsPerPage: 5,
//     totalRecords: 12,
//     actions: [
//       { id: "delete", displayName: "Delete" },
//       { id: "edit", displayName: "Edit" },
//     ],
//     actionPosition: "right",
//     enablecheckboxselection: true,
//     gridType: "advance",
//   }
// } satisfies Story;
// Advance.parameters = { controls: { include: ['tableHeaders', 'tableData', 'pagination', 'recordsPerPage', '', 'allSearch', 'allFilter', 'actions', 'actionPosition', 'enablecheckboxselection'] } };




