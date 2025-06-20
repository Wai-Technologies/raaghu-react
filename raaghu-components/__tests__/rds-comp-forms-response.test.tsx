import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompFormsResponse, { RdsCompFormsResponseProps } from '../src/rds-comp-forms-response/rds-comp-forms-response';

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsTextArea: ({ 
    value, 
    placeholder,
    rows,
    ...props 
  }: any) => (
    <textarea
      data-testid="textarea"
      value={value || ''}
      placeholder={placeholder}
      rows={rows}
      {...props}
    />
  ),
  RdsLabel: ({ 
    label, 
    required,
    ...props 
  }: any) => (
    <label 
      data-testid="label" 
      className={props.class || ''}
    >
      {label}
      {required && <span data-testid="required-indicator">*</span>}
    </label>
  ),
  RdsRadioButton: ({ 
    itemList, 
    checkedId,
    ...props 
  }: any) => (
    <div data-testid="radio-group">
      {itemList && itemList.map((item: any, index: number) => (
        <div key={index} data-testid={`radio-item-${item.id}`}>
          <input 
            type="radio" 
            id={item.id} 
            name={item.name} 
            checked={checkedId && checkedId.includes(item.id)} 
            readOnly 
          />
          <label htmlFor={item.id}>{item.label}</label>
        </div>
      ))}
    </div>
  ),
  RdsCheckbox: ({ 
    id, 
    labelText,
    checked,
    choiceId,
    ...props 
  }: any) => (
    <div data-testid={`checkbox-item-${id}`}>
      <input 
        type="checkbox" 
        id={id} 
        checked={choiceId && choiceId.includes(id)} 
        readOnly 
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  ),
  RdsSelectList: ({ 
    selectItems, 
    selectedValue,
    ...props 
  }: any) => (
    <div data-testid="select-list">
      <select 
        value={selectedValue || ''} 
        data-testid="select-dropdown"
      >
        {selectItems && selectItems.map((item: any, index: number) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  ),
  RdsButton: ({ 
    colorVariant, 
    isOutline,
    icon,
    onClick,
    ...props 
  }: any) => (
    <button 
      data-testid={`button-${colorVariant}`}
      onClick={onClick}
      className={props.class || ''}
      data-bs-target={props.databstarget}
      data-bs-toggle={props.databstoggle}
    >
      {icon && <span data-testid={`icon-${icon}`}>{icon}</span>}
      {props.children}
    </button>
  ),
  RdsPagination: ({ 
    totalRecords, 
    count,
    onPreviousClickHandler,
    onNextClickHandler,
    ...props 
  }: any) => (
    <div data-testid="pagination">
      <button 
        data-testid="prev-button" 
        onClick={onPreviousClickHandler}
        disabled={count <= 1}
      >
        Previous
      </button>
      <span data-testid="pagination-count">{count} of {totalRecords}</span>
      <button 
        data-testid="next-button" 
        onClick={onNextClickHandler}
        disabled={count >= totalRecords}
      >
        Next
      </button>
    </div>
  )
}));

// Mock Alert Popup component
jest.mock('../src/rds-comp-alert-popup', () => ({
  __esModule: true,
  default: ({ alertID, onSuccess }: any) => (
    <div data-testid="alert-popup" id={alertID}>
      <button data-testid="confirm-delete-button" onClick={onSuccess}>Confirm Delete</button>
    </div>
  )
}));

describe('RdsCompFormsResponse', () => {
  // Sample form responses data
  const sampleFormsData = {
    getResponses: {
      items: [
        {
          id: 'response1',
          answers: [
            {
              questionId: 'q1',
              value: 'This is a short answer response',
              choiceId: null
            },
            {
              questionId: 'q2',
              value: null,
              choiceId: 'choice1'
            },
            {
              questionId: 'q3',
              value: null,
              choiceId: 'choice3'
            },
            {
              questionId: 'q4',
              value: null,
              choiceId: 'choice5'
            }
          ]
        },
        {
          id: 'response2',
          answers: [
            {
              questionId: 'q1',
              value: 'Another short answer response',
              choiceId: null
            }
          ]
        }
      ],
      totalCount: 2
    },
    formQuestionEdit: [
      {
        id: 'q1',
        title: 'Question 1',
        description: 'Short answer question',
        questionType: 1,
        isRequired: true,
        choices: []
      },
      {
        id: 'q2',
        title: 'Question 2',
        description: 'Multiple choice question',
        questionType: 3,
        isRequired: false,
        choices: [
          { id: 'choice1', value: 'Option 1' },
          { id: 'choice2', value: 'Option 2' }
        ]
      },
      {
        id: 'q3',
        title: 'Question 3',
        description: 'Checkbox question',
        questionType: 4,
        isRequired: true,
        choices: [
          { id: 'choice3', value: 'Checkbox 1' },
          { id: 'choice4', value: 'Checkbox 2' }
        ]
      },
      {
        id: 'q4',
        title: 'Question 4',
        description: 'Dropdown question',
        questionType: 5,
        isRequired: false,
        choices: [
          { id: 'choice5', value: 'Dropdown Option 1' },
          { id: 'choice6', value: 'Dropdown Option 2' }
        ]
      }
    ]
  };

  const sampleResponse = {
    totalCount: 2
  };

  // Default props
  const defaultProps: RdsCompFormsResponseProps = {
    response: sampleResponse,
    formsData: sampleFormsData,
    onDeleteHandler: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Tests
  it('should render the component correctly with responses', () => {
    render(<RdsCompFormsResponse {...defaultProps} />);
    
    // Should display pagination
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    
    // Should display delete button
    expect(screen.getByTestId('button-danger')).toBeInTheDocument();
    
    // Should display question labels
    const labels = screen.getAllByTestId('label');
    expect(labels.length).toBeGreaterThan(0);
    expect(labels[0].textContent).toContain('Question 1');
  });

  it('should display "No response yet" message when there are no responses', () => {
    const propsWithNoResponses = {
      ...defaultProps,
      response: { totalCount: 0 }
    };
    
    render(<RdsCompFormsResponse {...propsWithNoResponses} />);
    
    expect(screen.getByText('There is no response yet')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  // 2. Pagination Tests
  it('should handle pagination correctly', () => {
    render(<RdsCompFormsResponse {...defaultProps} />);
    
    // Initially on first page
    const paginationCount = screen.getByTestId('pagination-count');
    expect(paginationCount.textContent).toContain('1 of 2');
    
    // Click next button
    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);
    
    // Should now be on second page
    expect(paginationCount.textContent).toContain('2 of 2');
    
    // Click previous button
    const prevButton = screen.getByTestId('prev-button');
    fireEvent.click(prevButton);
    
    // Should be back on first page
    expect(paginationCount.textContent).toContain('1 of 2');
  });

  it('should disable previous button on first page', () => {
    render(<RdsCompFormsResponse {...defaultProps} />);
    
    const prevButton = screen.getByTestId('prev-button');
    expect(prevButton).toBeDisabled();
    
    // Move to second page
    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);
    
    // Previous button should be enabled
    expect(prevButton).not.toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(<RdsCompFormsResponse {...defaultProps} />);
    
    // Move to second page
    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);
    
    // Next button should be disabled on last page
    expect(nextButton).toBeDisabled();
  });

  // 3. Question Type Rendering Tests
  it('should render short answer questions correctly', () => {
    render(<RdsCompFormsResponse {...defaultProps} />);
    
    // Find labels for short answer question
    const questionLabels = screen.getAllByTestId('label');
    const shortAnswerLabel = Array.from(questionLabels).find(label => 
      label.textContent?.includes('Question 1')
    );
    expect(shortAnswerLabel).toBeInTheDocument();
    
    // Should have a textarea with the answer
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('This is a short answer response');
  });

  it('should render multiple choice questions correctly', () => {
    render(<RdsCompFormsResponse {...defaultProps} />);
    
    // Find labels for multiple choice question
    const questionLabels = screen.getAllByTestId('label');
    const multipleChoiceLabel = Array.from(questionLabels).find(label => 
      label.textContent?.includes('Question 2')
    );
    expect(multipleChoiceLabel).toBeInTheDocument();
    
    // Should have radio buttons
    expect(screen.getByTestId('radio-group')).toBeInTheDocument();
  });

  it('should render checkbox questions correctly', () => {
    render(<RdsCompFormsResponse {...defaultProps} />);
    
    // Find labels for checkbox question
    const questionLabels = screen.getAllByTestId('label');
    const checkboxLabel = Array.from(questionLabels).find(label => 
      label.textContent?.includes('Question 3')
    );
    expect(checkboxLabel).toBeInTheDocument();
    
    // Should have checkboxes
    expect(screen.getByTestId('checkbox-item-choice3')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-item-choice4')).toBeInTheDocument();
  });

  it('should render dropdown questions correctly', () => {
    render(<RdsCompFormsResponse {...defaultProps} />);
    
    // Find labels for dropdown question
    const questionLabels = screen.getAllByTestId('label');
    const dropdownLabel = Array.from(questionLabels).find(label => 
      label.textContent?.includes('Question 4')
    );
    expect(dropdownLabel).toBeInTheDocument();
    
    // Should have a select dropdown
    expect(screen.getByTestId('select-list')).toBeInTheDocument();
    expect(screen.getByTestId('select-dropdown')).toBeInTheDocument();
  });

  // 4. Delete Functionality Test
  it('should handle delete functionality correctly', () => {
    render(<RdsCompFormsResponse {...defaultProps} />);
    
    // Click delete button
    const deleteButton = screen.getByTestId('button-danger');
    fireEvent.click(deleteButton);
    
    // Click confirm delete in the alert popup
    const confirmButton = screen.getByTestId('confirm-delete-button');
    fireEvent.click(confirmButton);
    
    // Should call onDeleteHandler with the response ID
    expect(defaultProps.onDeleteHandler).toHaveBeenCalledWith('response1');
  });

  // 5. Required Field Indicator Test
  it('should display required indicator for required questions', () => {
    render(<RdsCompFormsResponse {...defaultProps} />);
    
    // Required indicators should be displayed
    const requiredIndicators = screen.getAllByTestId('required-indicator');
    expect(requiredIndicators.length).toBeGreaterThan(0);
  });
});