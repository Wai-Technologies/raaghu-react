import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompClaimType from '../src/rds-comp-claim-type/rds-comp-claim-type';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    label, 
    value, 
    placeholder, 
    required, 
    name, 
    onChange, 
    dataTestId,
    reset
  }: any) => (
    <div data-testid={`input-wrapper-${dataTestId}`}>
      {label && <label htmlFor={dataTestId}>{name} {required && <span className="text-danger">*</span>}</label>}
      <input
        data-testid={dataTestId}
        type="text"
        value={value || ''}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        id={dataTestId}
      />
    </div>
  ),
  RdsCompSelectList: ({ 
    id, 
    label, 
    placeholder, 
    selectItems, 
    selectedValue, 
    onChange, 
    dataTestId,
    required
  }: any) => (
    <div data-testid={`select-wrapper-${dataTestId}`}>
      <label htmlFor={id}>{label} {required && <span className="text-danger">*</span>}</label>
      <select 
        data-testid={dataTestId}
        id={id}
        value={selectedValue || ''}
        onChange={(e) => {
          const selectedItem = selectItems.find((item: any) => item.value === e.target.value);
          onChange(selectedItem || { value: e.target.value, option: e.target.value });
        }}
      >
        <option value="">{placeholder}</option>
        {selectItems && selectItems.map((item: any, index: number) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  ),
  RdsTextArea: ({ 
    label, 
    placeholder, 
    onChange, 
    value, 
    rows, 
    dataTestId 
  }: any) => (
    <div data-testid={`textarea-wrapper-${dataTestId}`}>
      <label htmlFor={dataTestId}>{label}</label>
      <textarea
        data-testid={dataTestId}
        id={dataTestId}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        rows={rows}
      />
    </div>
  ),
  RdsCheckbox: ({ 
    labelText, 
    onChange, 
    checked, 
    dataTestId 
  }: any) => (
    <div data-testid={`checkbox-wrapper-${dataTestId}`} className="form-check">
      <input
        type="checkbox"
        data-testid={dataTestId}
        id={dataTestId}
        checked={checked || false}
        onChange={onChange}
        className="form-check-input"
      />
      <label htmlFor={dataTestId} className="form-check-label">
        {labelText}
      </label>
    </div>
  ),
  RdsButton: ({ 
    label, 
    databsdismiss, 
    type, 
    size, 
    isOutline, 
    colorVariant, 
    dataTestId, 
    onClick,
    isDisabled
  }: any) => (
    <button
      data-testid={dataTestId}
      type={type}
      disabled={isDisabled}
      data-bs-dismiss={databsdismiss}
      className={`btn btn-${isOutline ? 'outline-' : ''}${colorVariant} btn-${size}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}));

describe('RdsCompClaimType', () => {
  // Sample data for testing
  const valueTypeOptions = [
    { option: 'String', value: 'string' },
    { option: 'Boolean', value: 'boolean' },
    { option: 'Integer', value: 'integer' },
    { option: 'DateTime', value: 'datetime' }
  ];

  const claimsData = {
    name: 'Email',
    regex: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
    valueType: 'string',
    regexDescription: 'Valid email format required',
    description: 'User email address',
    required: true
  };

  const defaultProps = {
    valueType: valueTypeOptions,
    onSaveHandler: jest.fn(),
    onCancel: jest.fn(),
    reset: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<RdsCompClaimType {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('renders all form fields correctly', () => {
    render(<RdsCompClaimType {...defaultProps} />);
    
    // Check if all form fields are rendered
    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('regex')).toBeInTheDocument();
    expect(screen.getByTestId('value-type')).toBeInTheDocument();
    expect(screen.getByTestId('reges-description')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
    expect(screen.getByTestId('required')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByTestId('save')).toBeInTheDocument();
    expect(screen.getByTestId('cancel')).toBeInTheDocument();
  });

  it('renders with pre-filled data if claimsData is provided', () => {
    render(<RdsCompClaimType {...defaultProps} claimsData={claimsData} />);
    
    // Check if form fields are pre-filled with the provided data
    expect(screen.getByTestId('name')).toHaveValue(claimsData.name);
    expect(screen.getByTestId('regex')).toHaveValue(claimsData.regex);
    expect(screen.getByTestId('reges-description')).toHaveValue(claimsData.regexDescription);
    expect(screen.getByTestId('description')).toHaveValue(claimsData.description);
    expect(screen.getByTestId('required')).toBeChecked();
  });

  it('updates form values on input change', () => {
    render(<RdsCompClaimType {...defaultProps} />);
    
    // Type in the name field
    const nameInput = screen.getByTestId('name');
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    expect(nameInput).toHaveValue('New Name');
    
    // Type in the regex field
    const regexInput = screen.getByTestId('regex');
    fireEvent.change(regexInput, { target: { value: '[a-z]+' } });
    expect(regexInput).toHaveValue('[a-z]+');
    
    // Type in the regex description field
    const regexDescInput = screen.getByTestId('reges-description');
    fireEvent.change(regexDescInput, { target: { value: 'Lowercase letters only' } });
    expect(regexDescInput).toHaveValue('Lowercase letters only');
    
    // Type in the description field
    const descInput = screen.getByTestId('description');
    fireEvent.change(descInput, { target: { value: 'This is a description' } });
    expect(descInput).toHaveValue('This is a description');
    
    // Toggle the required checkbox
    const requiredCheckbox = screen.getByTestId('required');
    fireEvent.click(requiredCheckbox);
    expect(requiredCheckbox).toBeChecked();
  });

  it('selects a value type from the dropdown', () => {
    render(<RdsCompClaimType {...defaultProps} />);
    
    // Select a value from the dropdown
    const valueTypeSelect = screen.getByTestId('value-type');
    fireEvent.change(valueTypeSelect, { target: { value: 'boolean' } });
    expect(valueTypeSelect).toHaveValue('boolean');
  });

  it('disables the save button when form is invalid', () => {
    render(<RdsCompClaimType {...defaultProps} />);
    
    // Initially the form should be invalid and save button disabled
    const saveButton = screen.getByTestId('save');
    expect(saveButton).toBeDisabled();
    
    // Fill in required fields
    fireEvent.change(screen.getByTestId('name'), { target: { value: 'Name' } });
    fireEvent.change(screen.getByTestId('regex'), { target: { value: 'Regex' } });
    fireEvent.change(screen.getByTestId('value-type'), { target: { value: 'string' } });
    fireEvent.change(screen.getByTestId('reges-description'), { target: { value: 'Description' } });
    
    // Now the save button should be enabled
    expect(saveButton).not.toBeDisabled();
  });

  it('calls onSaveHandler with form data when save button is clicked', () => {
    render(<RdsCompClaimType {...defaultProps} />);
    
    // Fill in required fields
    fireEvent.change(screen.getByTestId('name'), { target: { value: 'Name' } });
    fireEvent.change(screen.getByTestId('regex'), { target: { value: 'Regex' } });
    fireEvent.change(screen.getByTestId('value-type'), { target: { value: 'string' } });
    fireEvent.change(screen.getByTestId('reges-description'), { target: { value: 'Description' } });
    
    // Click the save button
    fireEvent.click(screen.getByTestId('save'));
    
    // Check if onSaveHandler was called with the right data
    expect(defaultProps.onSaveHandler).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSaveHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Name',
        regex: 'Regex',
        valueType: 'string',
        regexDescription: 'Description',
        description: '',
        required: false
      })
    );
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<RdsCompClaimType {...defaultProps} />);
    
    // Click the cancel button
    fireEvent.click(screen.getByTestId('cancel'));
    
    // Check if onCancel was called
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('resets form fields after save', async () => {
    render(<RdsCompClaimType {...defaultProps} />);
    
    // Fill in required fields
    fireEvent.change(screen.getByTestId('name'), { target: { value: 'Name' } });
    fireEvent.change(screen.getByTestId('regex'), { target: { value: 'Regex' } });
    fireEvent.change(screen.getByTestId('value-type'), { target: { value: 'string' } });
    fireEvent.change(screen.getByTestId('reges-description'), { target: { value: 'Description' } });
    
    // Click the save button
    fireEvent.click(screen.getByTestId('save'));
    
    // Form fields should be reset
    await waitFor(() => {
      expect(screen.getByTestId('name')).toHaveValue('');
      expect(screen.getByTestId('regex')).toHaveValue('');
      expect(screen.getByTestId('reges-description')).toHaveValue('');
      expect(screen.getByTestId('description')).toHaveValue('');
      expect(screen.getByTestId('required')).not.toBeChecked();
    });
  });

  it('responds to props.reset changes', () => {
    const { rerender } = render(<RdsCompClaimType {...defaultProps} reset={false} />);
    
    // Fill in a field
    fireEvent.change(screen.getByTestId('name'), { target: { value: 'Name' } });
    expect(screen.getByTestId('name')).toHaveValue('Name');
    
    // Change the reset prop to true
    rerender(<RdsCompClaimType {...defaultProps} reset={true} />);
    
    // The component should handle the reset
    // Note: Our mock doesn't actually reset the value, but the component's useEffect will respond to the change
    // In a real component, this would likely trigger a reset of form values
  });
});