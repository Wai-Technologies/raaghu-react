import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RdsCompPollsQuestion from '../src/rds-comp-polls-question/rds-comp-polls-question';

// Mock the dependencies
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ onChange, value, label, placeholder, dataTestId, name, required, reset, ...props }: any) => (
    <div>
      {label && <label>{name}{required && ' *'}</label>}
      <input
        onChange={onChange}
        value={value || ''}
        placeholder={placeholder}
        data-testid={dataTestId}
        required={required}
        {...props}
      />
    </div>
  ),
  RdsCompSelectList: ({ onChange, selectItems, placeholder, label, size }: any) => (
    <div>
      {label && <label>{label}</label>}
      <select
        onChange={(e) => {
          const selectedItem = selectItems?.find((item: any) => item.value === e.target.value);
          if (selectedItem && onChange) {
            onChange(selectedItem);
          }
        }}
        data-testid="widget-select"
      >
        <option value="">{placeholder}</option>
        {selectItems?.map((item: any, index: number) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  ),
  RdsDatePicker: ({ onDatePicker, DatePickerLabel, titleText, showTitle }: any) => (
    <div>
      {showTitle && <label>{titleText}</label>}
      <input
        type="date"
        data-testid={DatePickerLabel?.toLowerCase().replace(/\s+/g, '-')}
        onChange={(e) => {
          if (onDatePicker && e.target.value) {
            onDatePicker(new Date(e.target.value));
          }
        }}
      />
    </div>
  ),
  RdsCheckbox: ({ labelText, checked, onChange, dataTestId }: any) => (
    <div>
      <input
        type="checkbox"
        checked={checked || false}
        onChange={onChange}
        data-testid={dataTestId}
      />
      <label>{labelText}</label>
    </div>
  ),
  RdsButton: ({ onClick, label, dataTestId, type, colorVariant, ...props }: any) => (
    <button
      onClick={onClick}
      data-testid={dataTestId}
      type={type}
      {...props}
    >
      {label}
    </button>
  ),
}));

describe('RdsCompPollsQuestion', () => {
  const mockGetPollsQuestion = jest.fn();
  
  const defaultProps = {
    widgetList: [
      { option: 'Radio Button', value: 'radio' },
      { option: 'Checkbox', value: 'checkbox' },
      { option: 'Dropdown', value: 'dropdown' }
    ],
    getPollsQuestion: mockGetPollsQuestion,
    questionData: {
      question: '',
      code: '',
      name: '',
      widget: '',
      startDate: '',
      endDate: '',
      resultShowingEndDate: '',
      showHoursLeft: false,
      allowMultipleVote: false,
      showVoteCount: false,
      showResultWithoutGivingVote: false
    },
    reset: false
  };

  const sampleQuestionData = {
    question: 'What is your favorite color?',
    code: 'Q001',
    name: 'Color Preference',
    widget: 'radio',
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-12-31T23:59:59.000Z',
    resultShowingEndDate: '2025-01-15T23:59:59.000Z',
    showHoursLeft: true,
    allowMultipleVote: false,
    showVoteCount: true,
    showResultWithoutGivingVote: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render all form fields correctly', () => {
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      expect(screen.getByTestId('question')).toBeInTheDocument();
      expect(screen.getByTestId('code')).toBeInTheDocument();
      expect(screen.getByTestId('name')).toBeInTheDocument();
      expect(screen.getByTestId('widget-select')).toBeInTheDocument();
      expect(screen.getByTestId('start-date')).toBeInTheDocument();
      expect(screen.getByTestId('end-date')).toBeInTheDocument();
      expect(screen.getByTestId('result-showing-end-date')).toBeInTheDocument();
    });

    it('should render all checkbox options', () => {
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      expect(screen.getByTestId('remaining-time')).toBeInTheDocument();
      expect(screen.getByTestId('multiple-voting')).toBeInTheDocument();
      expect(screen.getByTestId('vote-count')).toBeInTheDocument();
      expect(screen.getByTestId('result-without-vote')).toBeInTheDocument();
    });

    it('should render action buttons', () => {
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
      expect(screen.getByTestId('save')).toBeInTheDocument();
    });

    it('should display field labels correctly', () => {
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      expect(screen.getByText('Question *')).toBeInTheDocument();
      expect(screen.getByText('Code *')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Widget')).toBeInTheDocument();
    });
  });

  describe('Initial Data Population', () => {
    it('should populate form with provided question data', () => {
      render(
        <RdsCompPollsQuestion 
          {...defaultProps} 
          questionData={sampleQuestionData}
        />
      );
      
      expect(screen.getByTestId('question')).toHaveValue('What is your favorite color?');
      expect(screen.getByTestId('code')).toHaveValue('Q001');
      expect(screen.getByTestId('name')).toHaveValue('Color Preference');
    });

    it('should update form when questionData prop changes', () => {
      const { rerender } = render(<RdsCompPollsQuestion {...defaultProps} />);
      
      expect(screen.getByTestId('question')).toHaveValue('');
      
      rerender(
        <RdsCompPollsQuestion 
          {...defaultProps} 
          questionData={sampleQuestionData}
        />
      );
      
      expect(screen.getByTestId('question')).toHaveValue('What is your favorite color?');
    });

    it('should handle checkbox states from initial data', () => {
      render(
        <RdsCompPollsQuestion 
          {...defaultProps} 
          questionData={sampleQuestionData}
        />
      );
      
      expect(screen.getByTestId('remaining-time')).toBeChecked();
      expect(screen.getByTestId('multiple-voting')).not.toBeChecked();
      expect(screen.getByTestId('vote-count')).toBeChecked();
      expect(screen.getByTestId('result-without-vote')).not.toBeChecked();
    });
  });

  describe('Form Input Handling', () => {
    it('should handle question input changes', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const questionInput = screen.getByTestId('question');
      await user.type(questionInput, 'New Question');
      
      expect(questionInput).toHaveValue('New Question');
      expect(mockGetPollsQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ question: 'New Question' })
      );
    });

    it('should handle code input changes', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const codeInput = screen.getByTestId('code');
      await user.type(codeInput, 'CODE123');
      
      expect(codeInput).toHaveValue('CODE123');
      expect(mockGetPollsQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ code: 'CODE123' })
      );
    });

    it('should handle name input changes', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const nameInput = screen.getByTestId('name');
      await user.type(nameInput, 'Test Name');
      
      expect(nameInput).toHaveValue('Test Name');
      expect(mockGetPollsQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Test Name' })
      );
    });

    it('should handle widget selection changes', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const widgetSelect = screen.getByTestId('widget-select');
      await user.selectOptions(widgetSelect, 'radio');
      
      expect(mockGetPollsQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ widget: 'radio' })
      );
    });
  });

  describe('Date Picker Handling', () => {
    it('should handle start date changes', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const startDateInput = screen.getByTestId('start-date');
      await user.type(startDateInput, '2024-06-15');
      
      expect(mockGetPollsQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ 
          startDate: expect.stringContaining('2024-06-15')
        })
      );
    });

    it('should handle end date changes', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const endDateInput = screen.getByTestId('end-date');
      await user.type(endDateInput, '2024-12-31');
      
      expect(mockGetPollsQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ 
          endDate: expect.stringContaining('2024-12-31')
        })
      );
    });

    it('should handle result showing end date changes', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const resultDateInput = screen.getByTestId('result-showing-end-date');
      await user.type(resultDateInput, '2025-01-15');
      
      expect(mockGetPollsQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ 
          resultShowingEndDate: expect.stringContaining('2025-01-15')
        })
      );
    });
  });

  describe('Checkbox Handling', () => {
    it('should handle "Show Hours Left" checkbox toggle', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const checkbox = screen.getByTestId('remaining-time');
      await user.click(checkbox);
      
      expect(checkbox).toBeChecked();
      expect(mockGetPollsQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ showHoursLeft: true })
      );
    });

    it('should handle "Allow Multiple Vote" checkbox toggle', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const checkbox = screen.getByTestId('multiple-voting');
      await user.click(checkbox);
      
      expect(checkbox).toBeChecked();
      expect(mockGetPollsQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ allowMultipleVote: true })
      );
    });

    it('should handle "Show Vote Count" checkbox toggle', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const checkbox = screen.getByTestId('vote-count');
      await user.click(checkbox);
      
      expect(checkbox).toBeChecked();
      expect(mockGetPollsQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ showVoteCount: true })
      );
    });

    it('should handle "Show Result Without Giving Vote" checkbox toggle', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const checkbox = screen.getByTestId('result-without-vote');
      await user.click(checkbox);
      
      expect(checkbox).toBeChecked();
      expect(mockGetPollsQuestion).toHaveBeenCalledWith(
        expect.objectContaining({ showResultWithoutGivingVote: true })
      );
    });
  });

  describe('Form Submission', () => {
    it('should handle save button click', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      await user.click(saveButton);
      
      expect(mockGetPollsQuestion).toHaveBeenCalled();
    });    it('should not call getPollsQuestion when save is clicked if handler not provided', async () => {
      const user = userEvent.setup();
      render(
        <RdsCompPollsQuestion 
          {...defaultProps}
          getPollsQuestion={undefined}
        />
      );
      
      const saveButton = screen.getByTestId('save');
      await user.click(saveButton);
      
      // Should not throw error
      expect(saveButton).toBeInTheDocument();
    });
  });

  describe('Reset Functionality', () => {
    it('should handle reset prop changes', () => {
      const { rerender } = render(<RdsCompPollsQuestion {...defaultProps} />);
      
      rerender(<RdsCompPollsQuestion {...defaultProps} reset={true} />);
      
      // Component should handle reset state change
      expect(screen.getByTestId('question')).toBeInTheDocument();
    });
  });

  describe('Widget List Handling', () => {
    it('should render all widget options', () => {
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      const widgetSelect = screen.getByTestId('widget-select');
      expect(widgetSelect).toBeInTheDocument();
      
      // Check for placeholder
      expect(screen.getByText('Select Widget')).toBeInTheDocument();
    });

    it('should handle empty widget list', () => {
      render(
        <RdsCompPollsQuestion 
          {...defaultProps}
          widgetList={[]}
        />
      );
      
      const widgetSelect = screen.getByTestId('widget-select');
      expect(widgetSelect).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('should handle undefined questionData prop', () => {
      render(
        <RdsCompPollsQuestion 
          {...defaultProps}
          questionData={undefined}
        />
      );
      
      expect(screen.getByTestId('question')).toHaveValue('');
      expect(screen.getByTestId('code')).toHaveValue('');
      expect(screen.getByTestId('name')).toHaveValue('');
    });

    it('should handle partial questionData', () => {
      const partialData = {
        question: 'Partial Question',
        code: 'P001'
        // Missing other properties
      };
      
      render(
        <RdsCompPollsQuestion 
          {...defaultProps}
          questionData={partialData}
        />
      );
      
      expect(screen.getByTestId('question')).toHaveValue('Partial Question');
      expect(screen.getByTestId('code')).toHaveValue('P001');
      expect(screen.getByTestId('name')).toHaveValue('');
    });
  });
  describe('Integration Tests', () => {
    it('should maintain form state during user interactions', async () => {
      const user = userEvent.setup();
      render(<RdsCompPollsQuestion {...defaultProps} />);
      
      // Type in question field
      await user.type(screen.getByTestId('question'), 'Test');
      expect(screen.getByTestId('question')).toHaveValue('Test');
      
      // Toggle checkbox
      await user.click(screen.getByTestId('remaining-time'));
      expect(screen.getByTestId('remaining-time')).toBeChecked();
      
      // Question field should still have value
      expect(screen.getByTestId('question')).toHaveValue('Test');
    });
  });
});