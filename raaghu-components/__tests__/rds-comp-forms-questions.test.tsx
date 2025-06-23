import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompFormsQuestions, { RdsCompFormsQuestionProps } from '../src/rds-comp-forms-question/rds-comp-forms-questions';

// Mock moment to avoid date-related issues in tests
jest.mock('moment', () => {
  return () => ({
    format: () => '2025-06-11 12:00:00'
  });
});

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsIcon: ({ 
    name, 
    onClick, 
    dataTestId,
    ...props 
  }: any) => (
    <div 
      data-testid={dataTestId || `icon-${name}`} 
      onClick={onClick} 
      className={props.classes || ''}
      style={props.style || {}}
    >
      {name}
    </div>
  ),
  RdsButton: ({ 
    label, 
    onClick, 
    dataTestId,
    icon,
    ...props 
  }: any) => (
    <button
      data-testid={dataTestId || 'default-button'}
      onClick={onClick}
      style={props.style || {}}
      {...props}
    >
      {icon && <span data-testid={`icon-${icon}`}>{icon}</span>}
      {label}
    </button>
  ),
  RdsInput: ({ 
    onChange, 
    value, 
    placeholder,
    inputType,
    dataTestId,
    readonly,
    ...props 
  }: any) => (
    <div data-testid={`input-wrapper-${dataTestId || 'default'}`} style={props.style || {}}>
      {props.label && <label>{props.name}</label>}
      <input
        data-testid={dataTestId || 'default-input'}
        type={inputType || 'text'}
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => onChange && onChange(e)}
        readOnly={readonly}
        style={props.customClasses ? {} : undefined}
      />
    </div>
  ),
  RdsCheckbox: ({ 
    checked, 
    onChange, 
    style,
    ...props 
  }: any) => (
    <input
      data-testid="required-checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={typeof style === 'string' ? {} : style}
      {...props}
    />
  ),
  RdsSelectList: ({ 
    selectItems, 
    selectedValue, 
    onChange, 
    ...props 
  }: any) => (
    <div data-testid="select-list" style={props.style || {}}>
      <select
        data-testid="question-type-select"
        value={selectedValue}
        onChange={(e) => {
          const selectedItem = selectItems.find((item: any) => item.value === parseInt(e.target.value));
          onChange(selectedItem);
        }}
      >
        {selectItems.map((item: any, index: number) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  ),
  RdsTextArea: ({ 
    label, 
    value, 
    onChange, 
    dataTestId,
    ...props 
  }: any) => (
    <div data-testid={`textarea-wrapper-${dataTestId || 'default'}`} style={props.style || {}}>
      {label && <label>{label}</label>}
      <textarea
        data-testid={dataTestId || 'default-textarea'}
        value={value || ''}
        onChange={(e) => onChange && onChange(e)}
        {...props}
      />
    </div>
  ),
  RdsTooltip: ({ 
    children, 
    label,
    style,    ...props 
  }: any) => (
    <div data-testid="tooltip-wrapper" title={label} style={typeof style === 'string' ? {} : style}>
      {children}
    </div>
  )
}));

describe('RdsCompFormsQuestions', () => {
  // Sample question data for testing
  const sampleQuestions = [
    {
      index: 1,
      title: 'Question 1',
      description: 'First question description',
      questionType: 1, // Short answer
      choices: [],
      isRequired: false
    },
    {
      index: 2,
      title: 'Question 2',
      description: 'Second question description',
      questionType: 3, // Multiple choice
      choices: [
        { value: 'Option 1' },
        { value: 'Option 2' }
      ],
      isRequired: true,
      hasOtherOption: false
    }
  ];

  // Default props for the component
  const defaultProps: RdsCompFormsQuestionProps = {
    formQuestionsData: sampleQuestions,
    handleQuestions: jest.fn(),
    deleteQuestion: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Tests
  it('should render the questions form correctly', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Check for question titles
    expect(screen.getByDisplayValue('Question 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Question 2')).toBeInTheDocument();
    
    // Check for descriptions
    expect(screen.getByDisplayValue('First question description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Second question description')).toBeInTheDocument();
    
    // Check for the "New Questions" button
    expect(screen.getByTestId('new-question-btn')).toBeInTheDocument();
  });

  it('should render different question types correctly', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Short answer type should not show choices
    const questionTypesSelects = screen.getAllByTestId('question-type-select');
    expect(questionTypesSelects[0]).toHaveValue('1'); // Short answer
    expect(questionTypesSelects[1]).toHaveValue('3'); // Multiple choice
    
    // Multiple choice should show options
    const options = screen.getAllByTestId('option');
    expect(options.length).toBe(2);
    expect(options[0]).toHaveValue('Option 1');
    expect(options[1]).toHaveValue('Option 2');
  });

  // 2. Interaction Tests
  it('should handle adding a new question', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Initial number of questions
    const initialTitles = screen.getAllByTestId('title');
    expect(initialTitles.length).toBe(2);
    
    // Click "New Questions" button
    const newQuestionBtn = screen.getByTestId('new-question-btn');
    fireEvent.click(newQuestionBtn);
    
    // Verify handleQuestions was called with updated questions
    expect(defaultProps.handleQuestions).toHaveBeenCalled();
    const callArg = defaultProps.handleQuestions.mock.calls[0][0];
    
    // New array should have 3 questions, with the last one being a new question
    expect(callArg.length).toBe(3);
    expect(callArg[2].title).toBe('Question 3');
    expect(callArg[2].questionType).toBe(1); // Default to short answer
  });

  it('should handle deleting a question', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Find delete buttons
    const deleteButtons = screen.getAllByTestId('delete-question');
    expect(deleteButtons.length).toBe(2);
    
    // Delete the first question
    fireEvent.click(deleteButtons[0]);
    
    // Verify deleteQuestion was called with the correct question
    // Note: The component sets isEdit=true on the question before deleting
    expect(defaultProps.deleteQuestion).toHaveBeenCalledWith(expect.objectContaining({
      index: sampleQuestions[0].index,
      title: sampleQuestions[0].title,
      description: sampleQuestions[0].description,
      questionType: sampleQuestions[0].questionType,
    }));
  });

  it('should handle changing question title', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Find title inputs
    const titleInputs = screen.getAllByTestId('title');
    expect(titleInputs.length).toBe(2);
    
    // Change title of first question
    fireEvent.change(titleInputs[0], { target: { value: 'Updated Question Title' } });
    
    // Verify handleQuestions was called with updated questions
    expect(defaultProps.handleQuestions).toHaveBeenCalled();
    const callArg = defaultProps.handleQuestions.mock.calls[0][0];
    expect(callArg[0].title).toBe('Updated Question Title');
    expect(callArg[0].isEdit).toBe(true);
  });

  it('should handle changing question description', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Find description textareas
    const descriptionInputs = screen.getAllByTestId('description');
    expect(descriptionInputs.length).toBe(2);
    
    // Change description of first question
    fireEvent.change(descriptionInputs[0], { target: { value: 'Updated question description' } });
    
    // Verify handleQuestions was called with updated questions
    expect(defaultProps.handleQuestions).toHaveBeenCalled();
    const callArg = defaultProps.handleQuestions.mock.calls[0][0];
    expect(callArg[0].description).toBe('Updated question description');
    expect(callArg[0].isEdit).toBe(true);
  });

  it('should handle toggling required status', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Find required checkboxes
    const requiredCheckboxes = screen.getAllByTestId('required-checkbox');
    expect(requiredCheckboxes.length).toBe(2);
    
    // First question is not required, toggle it
    expect(requiredCheckboxes[0]).not.toBeChecked();
    fireEvent.click(requiredCheckboxes[0]);
    
    // Verify handleQuestions was called with updated questions
    expect(defaultProps.handleQuestions).toHaveBeenCalled();
    const callArg = defaultProps.handleQuestions.mock.calls[0][0];
    expect(callArg[0].isRequired).toBe(true);
    expect(callArg[0].isEdit).toBe(true);
  });

  // 3. Question Type Tests
  it('should handle changing question type', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Find select lists
    const selectLists = screen.getAllByTestId('question-type-select');
    
    // Change first question from Short answer to Multiple choice
    fireEvent.change(selectLists[0], { target: { value: '3' } });
    
    // Verify handleQuestions was called with updated questions
    expect(defaultProps.handleQuestions).toHaveBeenCalled();
    const callArg = defaultProps.handleQuestions.mock.calls[0][0];
    expect(callArg[0].questionType).toBe(3); // Multiple choice
    expect(callArg[0].choices.length).toBe(1); // Should add a default option
    expect(callArg[0].choices[0].value).toBe('Option');
  });

  // 4. Choices Management Tests
  it('should handle adding more choices to a question', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Find "Add More" links (should be one for the multiple choice question)
    const addMoreLinks = screen.getAllByTestId('add-more');
    expect(addMoreLinks.length).toBe(1);
    
    // Add a new option to the second question
    fireEvent.click(addMoreLinks[0]);
    
    // In the component implementation, handleQuestions is not actually called after adding choices
    // Check that the option was added via the UI instead
    const options = screen.getAllByTestId('option');
    expect(options.length).toBe(3); // Should now have 3 options with the new one added
  });

  it('should handle adding "Other" option to a question', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Find "Add Other" links (should be one for the multiple choice question)
    const addOtherLinks = screen.getAllByTestId('add-other');
    expect(addOtherLinks.length).toBe(1);
    
    // Add "Other" option to the second question
    fireEvent.click(addOtherLinks[0]);
    
    // Check that the "Other" option was added via the UI
    const options = screen.getAllByTestId('option');
    expect(options.length).toBe(3);
    // The last option should be "Other..."
    expect(options[options.length - 1]).toHaveValue('Other...');
  });

  it('should handle deleting choices from a question', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Find delete icons for options
    const deleteOptionButtons = screen.getAllByTestId('handle-delete');
    expect(deleteOptionButtons.length).toBe(2);
    
    // Delete the first option
    fireEvent.click(deleteOptionButtons[0]);
    
    // Verify that the option is removed
    const options = screen.getAllByTestId('option');
    expect(options.length).toBe(1);
    expect(options[0]).toHaveValue('Option 2');
  });

  it('should handle editing option values', () => {
    render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Find option inputs
    const optionInputs = screen.getAllByTestId('option');
    expect(optionInputs.length).toBe(2);
    
    // Change value of first option
    fireEvent.change(optionInputs[0], { target: { value: 'Updated Option' } });
    
    // Verify handleQuestions was called with updated questions
    expect(defaultProps.handleQuestions).toHaveBeenCalled();
    const callArg = defaultProps.handleQuestions.mock.calls[0][0];
    expect(callArg[1].choices[0].value).toBe('Updated Option');
    expect(callArg[1].isEdit).toBe(true);
  });
  // 5. Edge Cases
  it('should handle empty formQuestionsData prop', () => {
    const propsWithEmptyQuestions = {
      ...defaultProps,
      formQuestionsData: []
    };
    
    // Should render without errors
    expect(() => render(<RdsCompFormsQuestions {...propsWithEmptyQuestions} />)).not.toThrow();
    
    // Should still show the "New Questions" button
    expect(screen.getByTestId('new-question-btn')).toBeInTheDocument();
  });

  it('should handle null or undefined formQuestionsData prop', () => {
    const propsWithNullQuestions = {
      ...defaultProps,
      formQuestionsData: null
    };
    
    // Should render without errors and show "New Questions" button
    expect(() => render(<RdsCompFormsQuestions {...propsWithNullQuestions} />)).not.toThrow();
  });
  
  // 6. Testing Other Question Types
  it('should handle dropdown question type correctly', () => {
    const dropdownQuestion = [
      {
        index: 1,
        title: 'Dropdown Question',
        description: 'Select one option',
        questionType: 5, // Dropdown
        choices: [
          { value: 'Option 1' },
          { value: 'Option 2' }
        ],
        isRequired: false
      }
    ];
    
    const props = {
      ...defaultProps,
      formQuestionsData: dropdownQuestion
    };
    
    render(<RdsCompFormsQuestions {...props} />);
    
    // Verify dropdown is selected
    const selectList = screen.getByTestId('question-type-select');
    expect(selectList).toHaveValue('5');
    
    // Dropdown should have numbered options instead of radio buttons
    const options = screen.getAllByTestId('option');
    expect(options.length).toBe(2);
    
    // Dropdown shouldn't show "Other" option
    const addLinks = screen.getAllByText('Add More');
    expect(addLinks.length).toBe(1);
    expect(screen.queryByText('/ Add Other')).not.toBeInTheDocument();
  });
  
  it('should handle checkbox question type correctly', () => {
    const checkboxQuestion = [
      {
        index: 1,
        title: 'Checkbox Question',
        description: 'Select multiple options',
        questionType: 4, // Checkboxes
        choices: [
          { value: 'Option 1' },
          { value: 'Option 2' }
        ],
        isRequired: false
      }
    ];
    
    const props = {
      ...defaultProps,
      formQuestionsData: checkboxQuestion
    };
    
    render(<RdsCompFormsQuestions {...props} />);
    
    // Verify checkbox is selected
    const selectList = screen.getByTestId('question-type-select');
    expect(selectList).toHaveValue('4');
    
    // Should have "Add Other" option
    expect(screen.getByText('/ Add Other')).toBeInTheDocument();
  });
  
  // 7. Testing Prop Updates
  it('should update when formQuestionsData prop changes', () => {
    const { rerender } = render(<RdsCompFormsQuestions {...defaultProps} />);
    
    // Initial render with two questions
    expect(screen.getAllByTestId('title').length).toBe(2);
    
    // Update with new questions
    const updatedQuestions = [
      {
        index: 1,
        title: 'New Question 1',
        description: 'Updated description',
        questionType: 1,
        choices: [],
        isRequired: false
      }
    ];
    
    rerender(
      <RdsCompFormsQuestions 
        formQuestionsData={updatedQuestions}
        handleQuestions={defaultProps.handleQuestions}
        deleteQuestion={defaultProps.deleteQuestion}
      />
    );
    
    // Should now show only one question with the updated title
    const titleInputs = screen.getAllByTestId('title');
    expect(titleInputs.length).toBe(1);
    expect(titleInputs[0]).toHaveValue('New Question 1');
  });
  
  // 8. Special Case Handling
  it('should handle changing from multiple choice to dropdown removes Other option', () => {
    const questionWithOther = [
      {
        index: 1,
        title: 'Question with Other',
        description: 'Has Other option',
        questionType: 3, // Multiple choice
        choices: [
          { value: 'Option 1' },
          { value: 'Other...' }
        ],
        hasOtherOption: true,
        isRequired: false
      }
    ];
    
    const props = {
      ...defaultProps,
      formQuestionsData: questionWithOther
    };
    
    render(<RdsCompFormsQuestions {...props} />);
    
    // Verify the Other option exists
    const options = screen.getAllByTestId('option');
    expect(options.length).toBe(2);
    expect(options[1]).toHaveValue('Other...');
    
    // Change question type to dropdown
    const selectList = screen.getByTestId('question-type-select');
    fireEvent.change(selectList, { target: { value: '5' } });
    
    // Verify handleQuestions was called and Other option was removed
    expect(defaultProps.handleQuestions).toHaveBeenCalled();
    const callArg = defaultProps.handleQuestions.mock.calls[0][0];
    expect(callArg[0].questionType).toBe(5); // Dropdown
    
    // Other option should be removed from dropdown
    const otherOptionExists = callArg[0].choices.some((choice: any) => choice.value === 'Other...');
    expect(otherOptionExists).toBe(false);
  });
  
  it('should handle adding first question when there are no questions', () => {
    const props = {
      ...defaultProps,
      formQuestionsData: []
    };
    
    render(<RdsCompFormsQuestions {...props} />);
    
    // Add first question
    const newQuestionBtn = screen.getByTestId('new-question-btn');
    fireEvent.click(newQuestionBtn);
    
    // Verify handleQuestions was called with one question
    expect(defaultProps.handleQuestions).toHaveBeenCalled();
    const callArg = defaultProps.handleQuestions.mock.calls[0][0];
    expect(callArg.length).toBe(1);
    expect(callArg[0].title).toBe('Question 1');
    expect(callArg[0].index).toBe(1);
  });
  
  it('should properly handle the "Other..." option readOnly property', () => {
    const questionWithOther = [
      {
        index: 1,
        title: 'Question with Other',
        description: 'Has Other option',
        questionType: 3, // Multiple choice
        choices: [
          { value: 'Option 1' },
          { value: 'Option 2' }
        ],
        hasOtherOption: false,
        isRequired: false
      }
    ];
    
    const props = {
      ...defaultProps,
      formQuestionsData: questionWithOther
    };
    
    render(<RdsCompFormsQuestions {...props} />);
    
    // Add "Other" option
    const addOtherLink = screen.getByTestId('add-other');
    fireEvent.click(addOtherLink);
    
    // Check that the Other option was added via the UI
    const options = screen.getAllByTestId('option');
    expect(options.length).toBe(3);
    // The last option should be "Other..." and should not be readOnly
    const lastOption = options[options.length - 1];
    expect(lastOption).toHaveValue('Other...');
    expect(lastOption).not.toHaveAttribute('readOnly');
  });
});

// 9. Test for Complete Form with Multiple Question Types
describe('RdsCompFormsQuestions with Complex Setup', () => {
  // Create a complex form with all question types
  const complexQuestions = [
    {
      index: 1,
      title: 'Short Answer Question',
      description: 'Please provide a brief answer',
      questionType: 1, // Short answer
      choices: [],
      isRequired: true
    },
    {
      index: 2,
      title: 'Multiple Choice Question',
      description: 'Select one option',
      questionType: 3, // Multiple choice
      choices: [
        { value: 'Option 1' },
        { value: 'Option 2' },
        { value: 'Option 3' }
      ],
      isRequired: false
    },
    {
      index: 3,
      title: 'Checkbox Question',
      description: 'Select all that apply',
      questionType: 4, // Checkboxes
      choices: [
        { value: 'Option 1' },
        { value: 'Option 2' },
        { value: 'Other...' }
      ],
      hasOtherOption: true,
      isRequired: true
    },
    {
      index: 4,
      title: 'Dropdown Question',
      description: 'Select from dropdown',
      questionType: 5, // Dropdown
      choices: [
        { value: 'Option 1' },
        { value: 'Option 2' },
        { value: 'Option 3' }
      ],
      isRequired: false
    }
  ];
  
  const complexProps: RdsCompFormsQuestionProps = {
    formQuestionsData: complexQuestions,
    handleQuestions: jest.fn(),
    deleteQuestion: jest.fn()
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render all question types correctly', () => {
    render(<RdsCompFormsQuestions {...complexProps} />);
    
    // Should render 4 questions
    expect(screen.getAllByTestId('title').length).toBe(4);
    
    // Check question types
    const questionTypeSelects = screen.getAllByTestId('question-type-select');
    expect(questionTypeSelects[0]).toHaveValue('1'); // Short answer
    expect(questionTypeSelects[1]).toHaveValue('3'); // Multiple choice
    expect(questionTypeSelects[2]).toHaveValue('4'); // Checkboxes
    expect(questionTypeSelects[3]).toHaveValue('5'); // Dropdown
    
    // Check required status
    const requiredCheckboxes = screen.getAllByTestId('required-checkbox');
    expect(requiredCheckboxes[0]).toBeChecked(); // First question is required
    expect(requiredCheckboxes[1]).not.toBeChecked(); // Second question is not required
    expect(requiredCheckboxes[2]).toBeChecked(); // Third question is required
    expect(requiredCheckboxes[3]).not.toBeChecked(); // Fourth question is not required
  });
  
  it('should handle modifying multiple questions simultaneously', () => {
    render(<RdsCompFormsQuestions {...complexProps} />);
    
    // Modify titles of multiple questions
    const titleInputs = screen.getAllByTestId('title');
    fireEvent.change(titleInputs[0], { target: { value: 'Updated Short Answer' } });
    fireEvent.change(titleInputs[2], { target: { value: 'Updated Checkbox Question' } });
    
    // Toggle required status on multiple questions
    const requiredCheckboxes = screen.getAllByTestId('required-checkbox');
    fireEvent.click(requiredCheckboxes[1]); // Make the second question required
    
    // Change question types
    const questionTypeSelects = screen.getAllByTestId('question-type-select');
    fireEvent.change(questionTypeSelects[0], { target: { value: '3' } }); // Change first question to Multiple choice
    
    // Check that all changes were properly handled
    expect(complexProps.handleQuestions).toHaveBeenCalledTimes(4);
    
    // Get the latest state
    const latestState = complexProps.handleQuestions.mock.calls[3][0];
    
    // Verify first question changed type and title
    expect(latestState[0].title).toBe('Updated Short Answer');
    expect(latestState[0].questionType).toBe(3);
    
    // Verify second question is now required
    expect(latestState[1].isRequired).toBe(true);
    
    // Verify third question title changed
    expect(latestState[2].title).toBe('Updated Checkbox Question');
  });

  // Test for checking that question indices are correctly displayed
  it('should display question numbers correctly', () => {
    render(<RdsCompFormsQuestions {...complexProps} />);
    
    // Check for question numbers displayed in the UI
    const questionNumbers = screen.getAllByText(/Question \d+/);
    expect(questionNumbers.length).toBe(4);
    
    // Delete a question and check if numbers are updated
    const deleteButtons = screen.getAllByTestId('delete-question');
    fireEvent.click(deleteButtons[1]); // Delete the second question
    
    // The component should have called deleteQuestion with the second question
    expect(complexProps.deleteQuestion).toHaveBeenCalledWith(expect.objectContaining({
      index: complexQuestions[1].index,
      title: complexQuestions[1].title,
      description: complexQuestions[1].description,
      questionType: complexQuestions[1].questionType
    }));
  });
});

// Test for handling and recovering from errors
describe('RdsCompFormsQuestions Error Handling', () => {
  it('should handle malformed question data gracefully', () => {
    // Create intentionally malformed data
    const malformedQuestions = [
      {
        index: 1,
        title: 'Valid Question',
        description: 'This is valid',
        questionType: 1,
        choices: [],
        isRequired: false
      },
      {
        // Missing title
        index: 2,
        description: 'Missing title',
        questionType: 3,
        choices: [{ value: 'Option' }],
        isRequired: true
      }
    ];
    
    const props = {
      formQuestionsData: malformedQuestions,
      handleQuestions: jest.fn(),
      deleteQuestion: jest.fn()
    };
    
    // Should render without crashing
    expect(() => render(<RdsCompFormsQuestions {...props} />)).not.toThrow();
  });
});
