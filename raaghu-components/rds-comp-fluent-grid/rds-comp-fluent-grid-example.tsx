import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RdsFluentGridWorking, { FluentGridColumn, FluentGridAction, ActionPosition, State, ActionColumnStyle } from './rds-comp-fluent-grid-working';

// Example usage component showing how to integrate Fluent Grid
const RdsFluentGridExample: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  // Define columns with Fluent UI features
  const columns: FluentGridColumn[] = [
    {
      key: 'id',
      name: 'ID',
      dataType: 'number',
      isSort: true,        // Enable sorting
      isFilter: true,      // Enable filtering
      isResizable: true,   // Enable resizing
      minWidth: 80,
      maxWidth: 120,
    },
    {
      key: 'name',
      name: 'Full Name',
      dataType: 'string',
      isSort: true,
      isFilter: true,
      isResizable: true,
      minWidth: 150,
      maxWidth: 300,
      isBold: true,
      required: true,
    },
    {
      key: 'email',
      name: 'Email Address',
      dataType: 'string',
      isSort: true,
      isFilter: true,
      isResizable: true,
      minWidth: 200,
      maxWidth: 400,
    },
    {
      key: 'department',
      name: 'Department',
      dataType: 'string',
      isSort: true,
      isFilter: true,
      isResizable: true,
      minWidth: 120,
      maxWidth: 200,
    },
    {
      key: 'role',
      name: 'Role',
      dataType: 'string',
      isSort: true,
      isFilter: true,
      isResizable: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      key: 'status',
      name: 'Status',
      dataType: 'string',
      isSort: true,
      isFilter: true,
      isResizable: true,
      minWidth: 100,
      maxWidth: 150,
    },
    {
      key: 'lastActive',
      name: 'Last Active',
      dataType: 'date',
      isSort: true,
      isFilter: true,
      isResizable: true,
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  // Sample data
  const data = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      role: 'Senior Developer',
      status: 'Active',
      lastActive: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'Marketing',
      role: 'Marketing Manager',
      status: 'Active',
      lastActive: '2024-01-14',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@company.com',
      department: 'Sales',
      role: 'Sales Director',
      status: 'Inactive',
      lastActive: '2024-01-10',
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@company.com',
      department: 'HR',
      role: 'HR Specialist',
      status: 'Active',
      lastActive: '2024-01-16',
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie.wilson@company.com',
      department: 'Engineering',
      role: 'Tech Lead',
      status: 'Active',
      lastActive: '2024-01-13',
    },
    {
      id: 6,
      name: 'Diana Lee',
      email: 'diana.lee@company.com',
      department: 'Finance',
      role: 'Financial Analyst',
      status: 'Pending',
      lastActive: '2024-01-12',
    },
    {
      id: 7,
      name: 'Eve Davis',
      email: 'eve.davis@company.com',
      department: 'Operations',
      role: 'Operations Manager',
      status: 'Active',
      lastActive: '2024-01-11',
    },
    {
      id: 8,
      name: 'Frank Miller',
      email: 'frank.miller@company.com',
      department: 'Customer Support',
      role: 'Support Lead',
      status: 'Inactive',
      lastActive: '2024-01-09',
    },
    {
      id: 9,
      name: 'Grace Taylor',
      email: 'grace.taylor@company.com',
      department: 'Design',
      role: 'UX Designer',
      status: 'Active',
      lastActive: '2024-01-14',
    },
    {
      id: 10,
      name: 'Henry Anderson',
      email: 'henry.anderson@company.com',
      department: 'Engineering',
      role: 'DevOps Engineer',
      status: 'Active',
      lastActive: '2024-01-15',
    },
  ];

  // Define actions
  const actions: FluentGridAction[] = [
    {
      id: 'edit',
      displayName: 'Edit User',
    },
    {
      id: 'view',
      displayName: 'View Profile',
    },
    {
      id: 'delete',
      displayName: 'Delete User',
    },
    {
      id: 'reset',
      displayName: 'Reset Password',
    },
  ];

  // Event handlers
  const handleRowSelect = (rowData: any) => {
    console.log('Row selected:', rowData);
    setSelectedRows(prev => [...prev, rowData]);
  };

  const handleActionSelection = (rowData: any, actionId: string) => {
    console.log('Action selected:', actionId, 'for row:', rowData);
    // Handle different actions
    switch (actionId) {
      case 'edit':
        alert(`Edit user: ${rowData.name}`);
        break;
      case 'view':
        alert(`View profile: ${rowData.name}`);
        break;
      case 'delete':
        if (confirm(`Delete user: ${rowData.name}?`)) {
          alert('User deleted');
        }
        break;
      case 'reset':
        alert(`Reset password for: ${rowData.name}`);
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handlePagination = (page: number, recordsPerPage: number) => {
    console.log('Page changed:', page, 'Records per page:', recordsPerPage);
  };

  const handleSortChange = (sortState: any) => {
    console.log('Sort changed:', sortState);
  };

  const handleFilterChange = (filterState: any) => {
    console.log('Filter changed:', filterState);
  };

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '20px', height: '600px' }}>
        <h2>Material-UI Grid Integration Example</h2>
        <p>This example demonstrates how to use the RdsFluentGridBasic component with all Material-UI features enabled.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Selected Rows: {selectedRows.length}</h3>
        <p>Features enabled: Sorting, Filtering, Resizing, Checkbox Selection, Actions, Pagination</p>
      </div>

      <RdsFluentGridWorking
        tableHeaders={columns}
        tableData={data}
        
        // Fluent UI Features
        isSort={true}                    // Enable sorting
        isFilter={true}                  // Enable filtering  
        isResizable={true}               // Enable resizing
        
        // Selection
        enableCheckboxSelection={true}   // Enable checkbox selection
        
        // UI Controls
        showHeader={true}                // Show header with search
        showSubHeader={true}             // Show subheader
        state={State.Default}            // Default state (not collapsed)
        
        // Actions
        actions={actions}                // Define actions
        actionPosition={ActionPosition.Right}
        actionColumnStyle={ActionColumnStyle.ShowDots}
        
        // Pagination
        pagination={true}                // Enable pagination
        recordsPerPage={5}               // 5 records per page
        totalRecords={data.length}       // Total number of records
        
        // Callbacks
        onRowSelect={handleRowSelect}
        onActionSelection={handleActionSelection}
        onPaginationHandler={handlePagination}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        
        // Styling
        classes="custom-grid-class"
        noDataTitle="No users found"
        noDataHeaderTitle="User Management"
        
        // Theme
        theme="light"                    // Light theme
      />
      </div>
    </ThemeProvider>
  );
};

export default RdsFluentGridExample;
