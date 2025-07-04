import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompFeatures from '../src/rds-comp-features/rds-comp-features';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

// Mock RDS elements with simple implementations
jest.mock('../../raaghu-elements/src', () => ({
  RdsButton: ({ label, onClick, dataTestId }: any) => (
    <button data-testid={dataTestId} onClick={onClick}>
      {label}
    </button>
  ),
  RdsCheckbox: ({ labelText, onChange, checked, name, dataTestId }: any) => (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e)}
        data-testid={dataTestId || name}
      />
      <label>{labelText}</label>
    </div>
  ),
  RdsInput: ({ label, value, onChange, dataTestId, inputType }: any) => (
    <div>
      {label && <label>{label}</label>}
      <input
        type={inputType || 'text'}
        value={String(value || '')}
        onChange={e => onChange(e)}
        data-testid={dataTestId}
      />
    </div>
  ),
  RdsCompNavtabs: ({ navtabsItems, activeNavTabId, activeNavtabOrder, layout }: any) => (
    <div data-testid="rds-comp-navtabs" data-layout={layout} data-style="Vertical -Pointer">
      {navtabsItems?.map((item: any, index: number) => (
        <button
          key={index}
          data-testid={`nav-tab-${index}`}
          className={activeNavTabId === index.toString() ? 'active' : ''}
          onClick={() => activeNavtabOrder(index.toString())}
        >
          {item.label}
        </button>
      ))}
    </div>
  ),
  RdsCompSelectList: ({ label, onChange, selectedValue, selectItems, id }: any) => (
    <div>
      {label && <label>{label}</label>}
      <select
        value={String(selectedValue || '')}
        onChange={e => onChange({ value: e.target.value })}
        data-testid={id}
      >
        {selectItems?.map((item: any, index: number) => (
          <option key={index} value={String(item.value)}>
            {item.option || item.value}
          </option>
        ))}
      </select>
    </div>
  )
}));

describe('RdsCompFeatures', () => {
  const mockFeatureData = [
    {
      displayName: 'General Settings',
      name: 'GeneralSettings',
      features: [
        {
          displayName: 'Enable User Registration',
          name: 'userRegistration',
          value: 'true',
          description: 'Allow users to register themselves',
          valueType: {
            validator: { name: 'BOOLEAN' }
          }
        },
        {
          displayName: 'Max Users',
          name: 'maxUsers',
          value: '100',
          description: 'Maximum number of users allowed',
          valueType: {
            validator: { name: 'NUMERIC' }
          }
        }
      ]
    },
    {
      displayName: 'Security Features',
      name: 'SecurityFeatures',
      features: [
        {
          displayName: 'Authentication Type',
          name: 'authType',
          value: 'OAuth',
          description: 'Select authentication method',
          valueType: {
            validator: { name: 'NULL' },
            itemSource: {
              items: [
                { value: 'Basic' },
                { value: 'OAuth' },
                { value: 'SAML' }
              ]
            }
          }
        }
      ]
    }
  ];

  const defaultProps = {
    featuresData: mockFeatureData,
    onFeatureSelection: jest.fn(),
    emittedDataFeatureData: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should initialize with correct navigation tabs', () => {
    render(<RdsCompFeatures {...defaultProps} />);
    
    expect(screen.getByTestId('rds-comp-navtabs')).toHaveAttribute('data-layout', 'Vertical');
    expect(screen.getByTestId('rds-comp-navtabs')).toHaveAttribute('data-style', 'Vertical -Pointer');
    expect(screen.getByTestId('nav-tab-0')).toHaveTextContent('General Settings');
    expect(screen.getByTestId('nav-tab-1')).toHaveTextContent('Security Features');
  });

  it('should display boolean feature as checkbox with correct state', () => {
    render(<RdsCompFeatures {...defaultProps} />);
    
    const checkbox = screen.getByTestId('userRegistration');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should handle numeric feature input', () => {
    render(<RdsCompFeatures {...defaultProps} />);
    
    const input = screen.getByTestId('maxUsers');
    expect(input).toHaveValue(100); // Expect number, not string
    
    fireEvent.change(input, { target: { value: '200' } });
    
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
    
    expect(defaultProps.onFeatureSelection).toHaveBeenCalledWith([
      expect.objectContaining({
        name: 'maxUsers',
        value: '200'
      })
    ]);
  });

  it('should handle tab navigation', () => {
    render(<RdsCompFeatures {...defaultProps} />);
    
    const tab0 = screen.getByTestId('nav-tab-0');
    const tab1 = screen.getByTestId('nav-tab-1');
    
    expect(tab0).toHaveClass('active');
    fireEvent.click(tab1);
    expect(tab1).toHaveClass('active');
  });

  it('should handle select list changes', () => {
    render(<RdsCompFeatures {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('nav-tab-1')); // Switch to Security Features tab
    const select = screen.getByTestId('feaDis');
    
    fireEvent.change(select, { target: { value: 'SAML' } });
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
    
    expect(defaultProps.onFeatureSelection).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'authType',
          value: 'SAML'
        })
      ])
    );
  });

  it('should restore default values', () => {
    render(<RdsCompFeatures {...defaultProps} />);
    
    const input = screen.getByTestId('maxUsers');
    expect(input).toHaveValue(100); // Expect number, not string
    
    fireEvent.change(input, { target: { value: '200' } });
    
    const restoreButton = screen.getByText('Restore to Default');
    fireEvent.click(restoreButton);
    
    const updatedInput = screen.getByTestId('maxUsers');
    expect(updatedInput).toHaveValue(100); // Expect number, not string
    expect(defaultProps.onFeatureSelection).toHaveBeenCalledWith([]);
  });

  it('should handle missing data gracefully', () => {
    const propsWithoutData = {
      ...defaultProps,
      featuresData: []
    };
    
    render(<RdsCompFeatures {...propsWithoutData} />);
    expect(screen.getByTestId('rds-comp-navtabs')).toBeInTheDocument();
  });

  it('should persist changes in localStorage', () => {
    render(<RdsCompFeatures {...defaultProps} />);
    
    const savedData = JSON.parse(localStorage.getItem('initialFeatureData') || '[]');
    expect(savedData).toHaveLength(2);
    expect(savedData[0].name).toBe('GeneralSettings');
  });

  it('should reset to first tab when isFeatureTabChange prop changes', () => {
    const { rerender } = render(<RdsCompFeatures {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('nav-tab-1'));
    expect(screen.getByTestId('nav-tab-1')).toHaveClass('active');
    
    rerender(<RdsCompFeatures {...defaultProps} isFeatureTabChange="changed" />);
    expect(screen.getByTestId('nav-tab-0')).toHaveClass('active');
  });
});