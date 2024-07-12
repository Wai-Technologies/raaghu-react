import type { Meta, StoryObj } from '@storybook/react';
import RdsCompGrid from "./rds-comp-grid";
import { tr } from 'date-fns/locale';

const meta: Meta = { 
    title: "Components/Grid",
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
     
                 tableHeaders : [
                    { key: 'name', label: 'Name', displayName: 'Name'},
                    { key: 'age', label: 'Age', displayName: 'Age' },
                    { key: 'email', label: 'Email', displayName: 'Email' },
                  ],
                   tableData : [
                    { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com' },
                    { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com' },
                    { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com' },
                  ],                      
    }
} satisfies Story;
Default.parameters = { controls: { include: ['tableHeaders','tableData', 'allSearch', 'allFilter'] } };

export const WithAllSearch: Story = {
  args: {
   
    tableHeaders : [
      { key: 'name', label: 'Name', displayName: 'Name' },
      { key: 'age', label: 'Age', displayName: 'Age' },
      { key: 'email', label: 'Email', displayName: 'Email' },
      { key: 'address', label: 'Address', displayName: 'Address'},
      { key: 'role', label: 'Role', displayName: 'Role' },
      { key: 'country', label: 'Country', displayName: 'Country' },
      { key: 'status', label: 'Status', displayName: 'Status' },
    ],
     tableData : [
      { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
      { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
      { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
      { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
      { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
      { id: 6, name: 'Jakub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street dhfsdk thdf dfjd dfjd dfkjd df', role: 'admin', country: 'India', status: 'active'},  
    ], 
    allSearch: true,

  }
} satisfies Story;
WithAllSearch.parameters = { controls: { include: ['tableHeaders','tableData', 'allSearch', 'allFilter'] } };


export const WithAllFilter: Story = {
  args: {
   
               tableHeaders : [
                  { key: 'name', label: 'Name', displayName: 'Name' },
                  { key: 'age', label: 'Age', displayName: 'Age' },
                  { key: 'email', label: 'Email', displayName: 'Email' },
                  { key: 'address', label: 'Address', displayName: 'Address' },
                  { key: 'role', label: 'Role', displayName: 'Role' },
                  { key: 'country', label: 'Country', displayName: 'Country' },
                  { key: 'status', label: 'Status', displayName: 'Status' },
                ],
                 tableData : [
                  { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
                  { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
                  { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
                  { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
                  { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
                  { id: 6, name: 'Jakub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  

                ],     
                allFilter: true   ,
                totalRecords: 12,            
  }
} satisfies Story;
WithAllFilter.parameters = { controls: { include: ['tableHeaders','tableData', 'allSearch', 'allFilter','totalRecords'] } };

export const WithCustomFilter: Story = {
  args: {
   
               tableHeaders : [
                  { key: 'name', label: 'Name', displayName: 'Name', filter: true, wraptext: true, sortable: true},
                  { key: 'age', label: 'Age', displayName: 'Age' , filter: true, wraptext: true, sortable: true},
                  { key: 'email', label: 'Email', displayName: 'Email', filter: true, wraptext: true, sortable: true},
                  { key: 'address', label: 'Address', displayName: 'Address', filter: true, wraptext: true,sortable: true},
                  { key: 'role', label: 'Role', displayName: 'Role', filter: true, wraptext: true, sortable: true},
                  { key: 'country', label: 'Country', displayName: 'Country', filter: true, wraptext: true, sortable: true},
                  { key: 'status', label: 'Status', displayName: 'Status', filter: true, wraptext: true, sortable: true},
                ],
                 tableData : [
                  { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
                  { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
                  { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
                  { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
                  { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
                  { id: 6, name: 'Jakub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  
                  { id: 7, name: 'John Doe666', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
                  { id: 8, name: 'Jane Doe444', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
                  { id: 9, name: 'Mary Smith7', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
                  { id: 10, name: 'Marry Doer', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
                  { id: 11, name: 'Marry', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
                  { id: 12, name: 'Jakub ', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  
                ] ,
                pagination: true,
                recordsPerPage: 10,
                totalRecords: 12,
              
  }
} satisfies Story;
WithCustomFilter.parameters = { controls: { include: ['tableHeaders','tableData', 'allSearch', 'allFilter'] } };

export const WithCustomSearch: Story = {
  args: {
   
               tableHeaders : [
                  { key: 'name', label: 'Name', displayName: 'Name', hasSearch: true },
                  { key: 'age', label: 'Age', displayName: 'Age' },
                  { key: 'email', label: 'Email', displayName: 'Email', },
                  { key: 'address', label: 'Address', displayName: 'Address' },
                  { key: 'role', label: 'Role', displayName: 'Role', hasSearch: true},
                  { key: 'country', label: 'Country', displayName: 'Country' },
                  { key: 'status', label: 'Status', displayName: 'Status', hasSearch: true},
                ],
                 tableData : [
                  { id: 1, name: 'John Doe', age: 25, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
                  { id: 2, name: 'Jane Doe', age: 28, email: 'test@mm.com', address: '123, abc street', role: 'admin', country: 'USA', status: 'deactive'},
                  { id: 3, name: 'Mary Smith', age: 32, email: 'xyz.mm.com', address: '5656, abc street', role: 'admin', country: 'UK', status: 'active'},
                  { id: 4, name: 'Marry Doe', age: 25, email: 'dfjd@mm.com', address: '123, abc street', role: 'admin', country: 'India', status: 'active'},
                  { id: 5, name: 'Marry Com', age: 28, email: 'kdfds@com', address: '433, abc street', role: 'admin', country: 'USA', status: 'deactive'}, 
                  { id: 6, name: 'Jakub Edwadard', age: 32, email: 'js@ml.com', address: '453, abc street dfd fd dfd fd ttttf ddddddr fdf', role: 'admin', country: 'India', status: 'active'},  

                ] 
  }
} satisfies Story;
WithCustomSearch.parameters = { controls: { include: ['tableHeaders','tableData', 'allSearch', 'allFilter'] } };