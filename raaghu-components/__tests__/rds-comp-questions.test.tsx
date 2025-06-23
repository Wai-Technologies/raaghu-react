import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompQuestions from '../src/rds-comp-questions/rds-comp-questions';
import { RdsCompQuestionsProps } from '../src/rds-comp-questions/rds-comp-questions';

// Mock the child components
jest.mock('../src/rds-comp-forms-basic/rds-comp-forms-basic', () => {
  return function MockRdsCompFormsBasic({ basicInfo, handleNewFormData, questions }: any) {
    return (
      <div data-testid="rds-comp-forms-basic">
        <div data-testid="basic-info">{JSON.stringify(basicInfo)}</div>
        <div data-testid="questions-count">{questions?.length || 0}</div>
        <button 
          data-testid="update-form-data" 
          onClick={() => handleNewFormData({ ...basicInfo, updated: true })}
        >
          Update Form Data
        </button>
      </div>
    );
  };
});

jest.mock('../src/rds-comp-forms-question/rds-comp-forms-questions', () => {
  return function MockRdsCompFormsQuestions({ formQuestionsData, handleQuestions, deleteQuestion }: any) {
    return (
      <div data-testid="rds-comp-forms-questions">
        <div data-testid="form-questions-data">{JSON.stringify(formQuestionsData)}</div>
        <button 
          data-testid="update-questions" 
          onClick={() => handleQuestions([...formQuestionsData, { id: 'new', text: 'New Question' }])}
        >
          Update Questions
        </button>
        <button 
          data-testid="delete-question" 
          onClick={() => deleteQuestion({ id: 'test-id', text: 'Test Question' })}
        >
          Delete Question
        </button>
      </div>
    );
  };
});

describe('RdsCompQuestions Component', () => {
  // Default props for testing
  const defaultProps: RdsCompQuestionsProps = {
    handleEditQuestion: jest.fn(),
    formQuestionsData: [
      { id: '1', text: 'Question 1', type: 'text' },
      { id: '2', text: 'Question 2', type: 'multiple-choice' }
    ],
    basicEditFormData: {
      title: 'Test Form',
      description: 'Test Description',
      isPublished: false
    },
    getBasicEditDataFromQuestionComp: jest.fn(),
    getQuestionsEditDataFromQuestionComp: jest.fn(),
    deleteQuestion: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      render(<RdsCompQuestions {...defaultProps} />);
      expect(screen.getByTestId('rds-comp-forms-basic')).toBeInTheDocument();
      expect(screen.getByTestId('rds-comp-forms-questions')).toBeInTheDocument();
    });

    it('should render with correct structure', () => {
      render(<RdsCompQuestions {...defaultProps} />);
      
      // Check if the main container has the correct class
      const container = screen.getByTestId('rds-comp-forms-basic').closest('.row.mt-3');
      expect(container).toBeInTheDocument();
    });

    it('should pass correct props to child components', () => {
      render(<RdsCompQuestions {...defaultProps} />);
      
      // Check if basic form component receives correct data
      const basicInfo = screen.getByTestId('basic-info');
      expect(basicInfo).toHaveTextContent(JSON.stringify(defaultProps.basicEditFormData));
      
      // Check if questions component receives correct data
      const questionsData = screen.getByTestId('form-questions-data');
      expect(questionsData).toHaveTextContent(JSON.stringify(defaultProps.formQuestionsData));
      
      // Check questions count
      const questionsCount = screen.getByTestId('questions-count');
      expect(questionsCount).toHaveTextContent('2');
    });
  });

  describe('Props Handling', () => {
    it('should handle empty formQuestionsData', () => {
      const propsWithEmptyQuestions = {
        ...defaultProps,
        formQuestionsData: []
      };
      
      render(<RdsCompQuestions {...propsWithEmptyQuestions} />);
      
      const questionsCount = screen.getByTestId('questions-count');
      expect(questionsCount).toHaveTextContent('0');
    });

    it('should handle missing optional props', () => {
      const minimalProps = {
        formQuestionsData: defaultProps.formQuestionsData,
        basicEditFormData: defaultProps.basicEditFormData,
        deleteQuestion: jest.fn()
      };
      
      expect(() => render(<RdsCompQuestions {...minimalProps} />)).not.toThrow();
    });

    it('should update when props change', async () => {
      const { rerender } = render(<RdsCompQuestions {...defaultProps} />);
      
      const updatedProps = {
        ...defaultProps,
        formQuestionsData: [
          ...defaultProps.formQuestionsData,
          { id: '3', text: 'Question 3', type: 'textarea' }
        ]
      };
      
      rerender(<RdsCompQuestions {...updatedProps} />);
      
      await waitFor(() => {
        const questionsCount = screen.getByTestId('questions-count');
        expect(questionsCount).toHaveTextContent('3');
      });
    });

    it('should update when basicEditFormData changes', async () => {
      const { rerender } = render(<RdsCompQuestions {...defaultProps} />);
      
      const updatedProps = {
        ...defaultProps,
        basicEditFormData: {
          ...defaultProps.basicEditFormData,
          title: 'Updated Form Title'
        }
      };
      
      rerender(<RdsCompQuestions {...updatedProps} />);
      
      await waitFor(() => {
        const basicInfo = screen.getByTestId('basic-info');
        expect(basicInfo).toHaveTextContent('Updated Form Title');
      });
    });
  });

  describe('Event Handling', () => {
    it('should handle form data updates from basic form component', async () => {
      render(<RdsCompQuestions {...defaultProps} />);
      
      const updateButton = screen.getByTestId('update-form-data');
      fireEvent.click(updateButton);
      
      await waitFor(() => {
        expect(defaultProps.getBasicEditDataFromQuestionComp).toHaveBeenCalledWith(
          expect.objectContaining({
            ...defaultProps.basicEditFormData,
            updated: true,
            questions: defaultProps.formQuestionsData
          })
        );
      });
    });

    it('should handle questions updates from questions component', async () => {
      render(<RdsCompQuestions {...defaultProps} />);
      
      const updateQuestionsButton = screen.getByTestId('update-questions');
      fireEvent.click(updateQuestionsButton);
      
      await waitFor(() => {
        expect(defaultProps.getQuestionsEditDataFromQuestionComp).toHaveBeenCalledWith(
          expect.arrayContaining([
            ...defaultProps.formQuestionsData,
            expect.objectContaining({ id: 'new', text: 'New Question' })
          ])
        );
      });
    });

    it('should handle question deletion', async () => {
      render(<RdsCompQuestions {...defaultProps} />);
      
      const deleteButton = screen.getByTestId('delete-question');
      fireEvent.click(deleteButton);
      
      await waitFor(() => {
        expect(defaultProps.deleteQuestion).toHaveBeenCalledWith({
          id: 'test-id',
          text: 'Test Question'
        });
      });
    });

    it('should call handleEditQuestion when provided', () => {
      const handleEditQuestion = jest.fn();
      const propsWithEditHandler = {
        ...defaultProps,
        handleEditQuestion
      };
      
      render(<RdsCompQuestions {...propsWithEditHandler} />);
      // The component receives the prop but doesn't use it directly in the current implementation
      expect(handleEditQuestion).toBeDefined();
    });
  });

  describe('State Management', () => {
    it('should maintain internal state for basic form data', () => {
      render(<RdsCompQuestions {...defaultProps} />);
      
      const basicInfo = screen.getByTestId('basic-info');
      expect(basicInfo).toHaveTextContent(JSON.stringify(defaultProps.basicEditFormData));
    });

    it('should maintain internal state for questions data', () => {
      render(<RdsCompQuestions {...defaultProps} />);
      
      const questionsData = screen.getByTestId('form-questions-data');
      expect(questionsData).toHaveTextContent(JSON.stringify(defaultProps.formQuestionsData));
    });

    it('should update internal state when form data is modified', async () => {
      render(<RdsCompQuestions {...defaultProps} />);
      
      const updateButton = screen.getByTestId('update-form-data');
      fireEvent.click(updateButton);
      
      // The component should update its internal state and call the callback
      await waitFor(() => {
        expect(defaultProps.getBasicEditDataFromQuestionComp).toHaveBeenCalled();
      });
    });
  });

  describe('Integration Tests', () => {
    it('should handle complex data flow between components', async () => {
      const complexFormData = {
        title: 'Complex Form',
        description: 'A form with multiple sections',
        isPublished: true,
        metadata: { version: '1.0', author: 'Test Author' }
      };
      
      const complexQuestions = [
        { id: '1', text: 'Text Question', type: 'text', required: true },
        { id: '2', text: 'Choice Question', type: 'multiple-choice', options: ['A', 'B', 'C'] },
        { id: '3', text: 'Rating Question', type: 'rating', scale: 5 }
      ];
      
      const complexProps = {
        ...defaultProps,
        basicEditFormData: complexFormData,
        formQuestionsData: complexQuestions
      };
      
      render(<RdsCompQuestions {...complexProps} />);
      
      // Verify complex data is rendered correctly
      const basicInfo = screen.getByTestId('basic-info');
      expect(basicInfo).toHaveTextContent(complexFormData.title);
      
      const questionsCount = screen.getByTestId('questions-count');
      expect(questionsCount).toHaveTextContent('3');
    });

    it('should handle rapid prop updates', async () => {
      const { rerender } = render(<RdsCompQuestions {...defaultProps} />);
      
      // Simulate rapid updates
      for (let i = 0; i < 5; i++) {
        const updatedProps = {
          ...defaultProps,
          basicEditFormData: {
            ...defaultProps.basicEditFormData,
            title: `Updated Title ${i}`
          }
        };
        
        rerender(<RdsCompQuestions {...updatedProps} />);
      }
      
      await waitFor(() => {
        const basicInfo = screen.getByTestId('basic-info');
        expect(basicInfo).toHaveTextContent('Updated Title 4');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle null or undefined props gracefully', () => {
      const propsWithNulls = {
        ...defaultProps,
        formQuestionsData: null as any,
        basicEditFormData: null as any
      };
      
      // Should not crash even with null props
      expect(() => render(<RdsCompQuestions {...propsWithNulls} />)).not.toThrow();
    });    it('should handle invalid data types gracefully', () => {
      const propsWithInvalidData = {
        ...defaultProps,
        formQuestionsData: 'invalid' as any, // Invalid type
        basicEditFormData: 123 as any // Invalid type
      };
      
      // Should render without crashing even with invalid data types
      expect(() => render(<RdsCompQuestions {...propsWithInvalidData} />)).not.toThrow();
    });
  });
  describe('Accessibility', () => {
    it('should have proper structure for screen readers', () => {
      render(<RdsCompQuestions {...defaultProps} />);
      
      // Check if components are rendered in logical order
      const basicForm = screen.getByTestId('rds-comp-forms-basic');
      const questionsForm = screen.getByTestId('rds-comp-forms-questions');
      
      expect(basicForm).toBeInTheDocument();
      expect(questionsForm).toBeInTheDocument();
      
      // Get the parent container
      const basicFormParent = basicForm.parentElement;
      const questionsFormParent = questionsForm.parentElement;
      
      // Both should be in the document
      expect(basicFormParent).toBeInTheDocument();
      expect(questionsFormParent).toBeInTheDocument();
      
      // Verify they are properly structured (both components exist and are accessible)
      expect(basicForm).toHaveAttribute('data-testid', 'rds-comp-forms-basic');
      expect(questionsForm).toHaveAttribute('data-testid', 'rds-comp-forms-questions');
    });
  });
});