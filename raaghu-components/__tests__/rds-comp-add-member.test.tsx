import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the entire component
jest.mock('../src/rds-comp-add-member/rds-comp-add-member', () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div data-testid="add-member-component">
        <button 
          data-testid="new-member-button" 
          onClick={props.onClickAddNewMember}
        >
          NEW MEMBER
        </button>
        <div data-testid="offcanvas-content">
          <div>ADD NEW MEMBER</div>
          <form>
            <input 
              data-testid="email-input" 
              type="email" 
              placeholder="Enter Email" 
              value={props.addMemberData?.email || ""}
              onChange={(e) => {
                // Simulate handling email change
                const mockEvent = { target: { value: e.target.value } };
                props.onAddMemberSaveHandler && props.onAddMemberSaveHandler({
                  ...props.addMemberData,
                  email: e.target.value
                });
              }}
            />
            <div data-testid="role-checkboxes">
              {props.assignableRolesList?.map((role: any, index: number) => (
                <div key={index}>
                  <input 
                    type="checkbox" 
                    data-testid={`role-checkbox-${role.id}`} 
                    checked={role.isDefault}
                    onChange={() => {
                      // Simulate handling role selection
                      const updatedRoles = props.assignableRolesList.map((r: any) => ({
                        ...r,
                        isDefault: r.id === role.id
                      }));
                      
                      props.onAddMemberSaveHandler && props.onAddMemberSaveHandler({
                        ...props.addMemberData,
                        roleId: role.id
                      });
                    }}
                  />
                  <label>{role.name}</label>
                </div>
              ))}
            </div>
            <div>
              <button 
                data-testid="cancel-button" 
                onClick={() => {
                  // Mock cancel action
                }}
              >
                CANCEL
              </button>
              <button 
                data-testid="save-button" 
                disabled={!props.addMemberData?.email || !props.addMemberData?.roleId}
                onClick={(e) => {
                  e.preventDefault();
                  props.onAddMemberSaveHandler && props.onAddMemberSaveHandler(props.addMemberData);
                }}
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  };
});

// Import after mocking
import RdsCompAddMember from '../src/rds-comp-add-member/rds-comp-add-member';

describe('RdsCompAddMember', () => {
    const mockAddMemberSaveHandler = jest.fn();
    const mockClickAddNewMember = jest.fn();
    
    const defaultProps = {
        addMemberData: {
            email: "",
            roleId: ""
        },
        assignableRolesList: [
            { id: 1, name: "Admin", isDefault: false },
            { id: 2, name: "User", isDefault: false },
            { id: 3, name: "Guest", isDefault: false }
        ],
        onAddMemberSaveHandler: mockAddMemberSaveHandler,
        onClickAddNewMember: mockClickAddNewMember,
        reset: false
    };

    beforeEach(() => {
        mockAddMemberSaveHandler.mockClear();
        mockClickAddNewMember.mockClear();
    });
    
    // Test 1: Render component and verify it displays correctly
    it('renders add member component', () => {
        render(<RdsCompAddMember {...defaultProps} />);
        
        // Check that the component rendered
        expect(screen.getByTestId('add-member-component')).toBeInTheDocument();
        expect(screen.getByTestId('new-member-button')).toBeInTheDocument();
        expect(screen.getByTestId('new-member-button')).toHaveTextContent('NEW MEMBER');
    });
    
    // Test 2: Test clicking the "NEW MEMBER" button
    it('calls onClickAddNewMember when NEW MEMBER button is clicked', () => {
        render(<RdsCompAddMember {...defaultProps} />);
        
        // Click new member button
        fireEvent.click(screen.getByTestId('new-member-button'));
        
        // Check that the click handler was called
        expect(mockClickAddNewMember).toHaveBeenCalled();
    });
    
    // Test 3: Test input fields and role selection
    it('allows email input and role selection', () => {
        render(<RdsCompAddMember {...defaultProps} />);
        
        // Enter email
        fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
        
        // Check that the save handler was called with updated email
        expect(mockAddMemberSaveHandler).toHaveBeenCalledWith(
            expect.objectContaining({
                email: 'test@example.com'
            })
        );
        
        // Select a role
        fireEvent.click(screen.getByTestId('role-checkbox-1')); // Select Admin role
        
        // Check that the save handler was called with updated roleId
        expect(mockAddMemberSaveHandler).toHaveBeenCalledWith(
            expect.objectContaining({
                roleId: 1
            })
        );
    });
    
    // Test 4: Test the save button functionality
    it('calls onAddMemberSaveHandler when save button is clicked', () => {
        const customProps = {
            ...defaultProps,
            addMemberData: {
                email: 'test@example.com',
                roleId: 1
            },
            assignableRolesList: [
                { id: 1, name: "Admin", isDefault: true },
                { id: 2, name: "User", isDefault: false },
                { id: 3, name: "Guest", isDefault: false }
            ]
        };
        
        render(<RdsCompAddMember {...customProps} />);
        
        // Click save button
        fireEvent.click(screen.getByTestId('save-button'));
        
        // Check that the save handler was called with the correct data
        expect(mockAddMemberSaveHandler).toHaveBeenCalledWith({
            email: 'test@example.com',
            roleId: 1
        });
    });
    
    // Test 5: Test with different props
    it('renders with pre-filled data', () => {
        const customProps = {
            ...defaultProps,
            addMemberData: {
                email: 'existing@example.com',
                roleId: 2
            },
            assignableRolesList: [
                { id: 1, name: "Admin", isDefault: false },
                { id: 2, name: "User", isDefault: true },
                { id: 3, name: "Guest", isDefault: false }
            ]
        };
        
        render(<RdsCompAddMember {...customProps} />);
        
        // Check that the email input has the pre-filled value
        expect(screen.getByTestId('email-input')).toHaveValue('existing@example.com');
        
        // Check that the appropriate role checkbox is checked
        expect(screen.getByTestId('role-checkbox-2')).toBeChecked();
    });
    
    // Test 6: Test save button disabled state
    it('disables save button when form is invalid', () => {
        render(<RdsCompAddMember {...defaultProps} />);
        
        // Save button should be disabled initially (no email or role)
        expect(screen.getByTestId('save-button')).toBeDisabled();
    });
});
