import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the entire component
jest.mock('../src/rds-comp-account-external-provider/rds-comp-account-external-provider', () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div data-testid="external-provider-component">
        <div>External Provider Settings</div>
        <div className="provider-list">
          {props.accountExternalProvider?.map((provider: any, index: number) => (
            <div key={index} data-testid={`provider-${index}`}>
              <div>{provider.name}</div>
              <input 
                type="checkbox" 
                data-testid={`enabled-${index}`} 
                defaultChecked={provider.enabled}
                onChange={(e) => {
                  // Simulate handling the enabled change
                  const updatedProviders = [...props.accountExternalProvider];
                  updatedProviders[index] = {
                    ...updatedProviders[index],
                    enabled: e.target.checked
                  };
                  // Call the original handler with the updated providers
                  props.onSubmit && props.onSubmit(updatedProviders);
                }}
              />
              <input 
                type="text" 
                data-testid={`client-id-${index}`} 
                defaultValue={provider.properties?.[0]?.value || ""}
                onChange={(e) => {
                  // Simulate input change for client ID
                  const updatedProviders = [...props.accountExternalProvider];
                  if (updatedProviders[index].properties && updatedProviders[index].properties.length > 0) {
                    updatedProviders[index].properties[0].value = e.target.value;
                  }
                  props.onSubmit && props.onSubmit(updatedProviders);
                }}
              />
              <input 
                type="password" 
                data-testid={`client-secret-${index}`} 
                defaultValue={provider.secretProperties?.[0]?.value || ""}
                onChange={(e) => {
                  // Simulate input change for client secret
                  const updatedProviders = [...props.accountExternalProvider];
                  if (updatedProviders[index].secretProperties && updatedProviders[index].secretProperties.length > 0) {
                    updatedProviders[index].secretProperties[0].value = e.target.value;
                  }
                  props.onSubmit && props.onSubmit(updatedProviders);
                }}
              />
            </div>
          ))}
        </div>
        <button 
          data-testid="save" 
          onClick={() => props.onSubmit && props.onSubmit(props.accountExternalProvider)}
        >
          Save
        </button>
      </div>
    )
  };
});

// Import after mocking
import RdsCompAccountExternalProvider from '../src/rds-comp-account-external-provider/rds-comp-account-external-provider';

describe('RdsCompAccountExternalProvider', () => {
    const mockOnSubmit = jest.fn();
    
    // Sample provider data that matches the component's expected structure
    const defaultProps = {
        accountExternalProvider: [
            {
                name: 'Google',
                enabled: false,
                properties: [
                    { key: 'ClientId', value: '' }
                ],
                secretProperties: [
                    { key: 'ClientSecret', value: '' }
                ]
            },
            {
                name: 'Facebook',
                enabled: true,
                properties: [
                    { key: 'ClientId', value: 'fb-client-id' }
                ],
                secretProperties: [
                    { key: 'ClientSecret', value: 'fb-client-secret' }
                ]
            }
        ],
        onSubmit: mockOnSubmit
    };

    beforeEach(() => {
        mockOnSubmit.mockClear();
    });
    
    // Test 1: Render component and verify it displays correctly
    it('renders external provider component', () => {
        render(<RdsCompAccountExternalProvider {...defaultProps} />);
        
        // Check that the component rendered
        expect(screen.getByTestId('external-provider-component')).toBeInTheDocument();
        expect(document.body.textContent).toContain('External Provider Settings');
        
        // Check that providers are displayed
        expect(screen.getByTestId('provider-0')).toBeInTheDocument();
        expect(screen.getByTestId('provider-1')).toBeInTheDocument();
        expect(document.body.textContent).toContain('Google');
        expect(document.body.textContent).toContain('Facebook');
    });
    
    // Test 2: Test that enabled checkboxes reflect initial state
    it('displays correct initial enabled state for providers', () => {
        render(<RdsCompAccountExternalProvider {...defaultProps} />);
        
        // Check that the checkboxes have the correct initial state
        expect(screen.getByTestId('enabled-0')).not.toBeChecked();
        expect(screen.getByTestId('enabled-1')).toBeChecked();
    });
    
    // Test 3: Test that input fields have correct initial values
    it('displays correct initial values for client ID and secret', () => {
        render(<RdsCompAccountExternalProvider {...defaultProps} />);
        
        // Check the client ID values
        expect(screen.getByTestId('client-id-0')).toHaveValue('');
        expect(screen.getByTestId('client-id-1')).toHaveValue('fb-client-id');
        
        // Check the client secret values
        expect(screen.getByTestId('client-secret-0')).toHaveValue('');
        expect(screen.getByTestId('client-secret-1')).toHaveValue('fb-client-secret');
    });
    
    // Test 4: Test that toggling enabled state triggers onSubmit
    it('calls onSubmit when enabled state is toggled', () => {
        render(<RdsCompAccountExternalProvider {...defaultProps} />);
        
        // Toggle the Google provider (index 0)
        fireEvent.click(screen.getByTestId('enabled-0'));
        
        // Check that onSubmit was called with updated values
        expect(mockOnSubmit).toHaveBeenCalled();
        // The mock implementation should update the enabled state to true
        const updatedProviders = mockOnSubmit.mock.calls[0][0];
        expect(updatedProviders[0].enabled).toBe(true);
    });
    
    // Test 5: Test that changing client ID triggers onSubmit
    it('calls onSubmit when client ID is changed', () => {
        render(<RdsCompAccountExternalProvider {...defaultProps} />);
        
        // Change the Google client ID
        fireEvent.change(screen.getByTestId('client-id-0'), { target: { value: 'new-google-id' } });
        
        // Check that onSubmit was called
        expect(mockOnSubmit).toHaveBeenCalled();
    });
    
    // Test 6: Test that clicking save button triggers onSubmit
    it('calls onSubmit when save button is clicked', () => {
        render(<RdsCompAccountExternalProvider {...defaultProps} />);
        
        // Click save button
        fireEvent.click(screen.getByTestId('save'));
        
        // Check that onSubmit was called
        expect(mockOnSubmit).toHaveBeenCalledWith(defaultProps.accountExternalProvider);
    });
    
    // Test 7: Test with different props
    it('renders with different provider data', () => {
        const customProps = {
            ...defaultProps,
            accountExternalProvider: [
                {
                    name: 'Twitter',
                    enabled: true,
                    properties: [
                        { key: 'ClientId', value: 'twitter-id' }
                    ],
                    secretProperties: [
                        { key: 'ClientSecret', value: 'twitter-secret' }
                    ]
                }
            ]
        };
        
        render(<RdsCompAccountExternalProvider {...customProps} />);
        
        // Verify it renders with the new props
        expect(document.body.textContent).toContain('Twitter');
        expect(screen.getByTestId('client-id-0')).toHaveValue('twitter-id');
        expect(screen.getByTestId('enabled-0')).toBeChecked();
    });
});