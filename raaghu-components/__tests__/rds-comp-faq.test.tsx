import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompFaq, { RdsCompFaqProps } from '../src/rds-comp-faq/rds-comp-faq';

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsLabel: ({ label, multiline, fontWeight, size, ...props }: any) => (
    <span 
      data-testid="rds-label" 
      data-multiline={multiline} 
      data-font-weight={fontWeight} 
      data-size={size}
      {...props}
    >
      {label}
    </span>
  ),
}));

describe('RdsCompFaq', () => {
  const mockQuestionHeading = {
    question: 'Frequently Asked Questions',
    description: 'Find answers to common questions about our services and products.'
  };

  const mockQuestionList = [
    {
      question: 'What is your return policy?',
      description: 'We offer a 30-day return policy for all unused items in their original packaging. Returns must be initiated within 30 days of purchase.'
    },
    {
      question: 'How long does shipping take?',
      description: 'Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery.'
    },
    {
      question: 'Do you offer customer support?',
      description: 'Yes, we provide 24/7 customer support via email, phone, and live chat. Our support team is here to help with any questions or issues.'
    }
  ];

  const defaultProps: RdsCompFaqProps = {
    questionList: mockQuestionList,
    QuestionHeading: mockQuestionHeading
  };

  // 1. Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('should render FAQ component correctly', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(screen.getByText('Find answers to common questions about our services and products.')).toBeInTheDocument();
    });

    it('should render container with correct CSS classes', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const container = screen.getByText('Frequently Asked Questions').closest('.container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container');
    });

    it('should render two-column layout', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const leftColumn = screen.getByText('Frequently Asked Questions').closest('.col-md-4');
      const rightColumn = screen.getByText('What is your return policy?').closest('.col-md-8');
      
      expect(leftColumn).toBeInTheDocument();
      expect(rightColumn).toBeInTheDocument();
    });
  });

  // 2. Question Heading Display Tests
  describe('Question Heading Display', () => {
    it('should display question heading with correct formatting', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const headingElement = screen.getByText('Frequently Asked Questions');
      const headingContainer = headingElement.closest('h2');
      
      expect(headingContainer).toBeInTheDocument();
      expect(headingElement).toHaveAttribute('data-multiline', 'true');
      expect(headingElement).toHaveAttribute('data-font-weight', 'bold');
    });

    it('should display question description with correct formatting', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const descriptionElement = screen.getByText('Find answers to common questions about our services and products.');
      const descriptionContainer = descriptionElement.closest('.text-dark');
      
      expect(descriptionContainer).toBeInTheDocument();
      expect(descriptionElement).toHaveAttribute('data-size', '14px');
      expect(descriptionElement).toHaveAttribute('data-multiline', 'true');
    });

    it('should render heading section with correct CSS classes', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const headingSection = screen.getByText('Frequently Asked Questions').closest('.mt-4');
      expect(headingSection).toBeInTheDocument();
      expect(headingSection).toHaveClass('mt-4');
    });
  });

  // 3. Question List Display Tests
  describe('Question List Display', () => {
    it('should display all questions from the question list', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
      expect(screen.getByText('How long does shipping take?')).toBeInTheDocument();
      expect(screen.getByText('Do you offer customer support?')).toBeInTheDocument();
    });

    it('should display all question descriptions', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      expect(screen.getByText('We offer a 30-day return policy for all unused items in their original packaging. Returns must be initiated within 30 days of purchase.')).toBeInTheDocument();
      expect(screen.getByText('Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery.')).toBeInTheDocument();
      expect(screen.getByText('Yes, we provide 24/7 customer support via email, phone, and live chat. Our support team is here to help with any questions or issues.')).toBeInTheDocument();
    });

    it('should format questions with correct styling', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const questionElement = screen.getByText('What is your return policy?');
      const questionContainer = questionElement.closest('h5');
      
      expect(questionContainer).toBeInTheDocument();
      expect(questionElement).toHaveAttribute('data-multiline', 'true');
      expect(questionElement).toHaveAttribute('data-font-weight', 'bold');
    });

    it('should format question descriptions with correct styling', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const descriptionElement = screen.getByText('We offer a 30-day return policy for all unused items in their original packaging. Returns must be initiated within 30 days of purchase.');
      const descriptionContainer = descriptionElement.closest('.text-muted');
      
      expect(descriptionContainer).toBeInTheDocument();
      expect(descriptionContainer).toHaveClass('text-muted', 'mb-2');
      expect(descriptionElement).toHaveAttribute('data-size', '14px');
      expect(descriptionElement).toHaveAttribute('data-multiline', 'true');
    });
  });

  // 4. Empty Data Handling Tests
  describe('Empty Data Handling', () => {
    it('should handle empty question list gracefully', () => {
      const propsWithEmptyList = {
        ...defaultProps,
        questionList: []
      };
      
      render(<RdsCompFaq {...propsWithEmptyList} />);
      
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(screen.getByText('Find answers to common questions about our services and products.')).toBeInTheDocument();
    });    it('should handle missing question properties gracefully', () => {
      const propsWithIncompleteData = {
        ...defaultProps,
        questionList: [
          { question: 'Test Question' }, // Missing description
          { description: 'Test Description' }, // Missing question
        ]
      };
      
      expect(() => {
        render(<RdsCompFaq {...propsWithIncompleteData} />);
      }).not.toThrow();
    });
  });

  // 5. Single Question Test
  describe('Single Question', () => {
    it('should handle single question correctly', () => {
      const propsWithSingleQuestion = {
        ...defaultProps,
        questionList: [mockQuestionList[0]]
      };
      
      render(<RdsCompFaq {...propsWithSingleQuestion} />);
      
      expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
      expect(screen.getByText('We offer a 30-day return policy for all unused items in their original packaging. Returns must be initiated within 30 days of purchase.')).toBeInTheDocument();
      expect(screen.queryByText('How long does shipping take?')).not.toBeInTheDocument();
    });
  });

  // 6. Large Question List Test
  describe('Large Question List', () => {
    it('should handle large number of questions', () => {
      const largeQuestionList = Array.from({ length: 10 }, (_, index) => ({
        question: `Question ${index + 1}`,
        description: `This is the description for question ${index + 1}`
      }));
      
      const propsWithLargeList = {
        ...defaultProps,
        questionList: largeQuestionList
      };
      
      render(<RdsCompFaq {...propsWithLargeList} />);
      
      expect(screen.getByText('Question 1')).toBeInTheDocument();
      expect(screen.getByText('Question 5')).toBeInTheDocument();
      expect(screen.getByText('Question 10')).toBeInTheDocument();
    });
  });

  // 7. RdsLabel Integration Tests
  describe('RdsLabel Integration', () => {
    it('should pass correct props to RdsLabel components for heading', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const headingLabels = screen.getAllByTestId('rds-label');
      const headingLabel = headingLabels.find(label => 
        label.textContent === 'Frequently Asked Questions'
      );
      
      expect(headingLabel).toHaveAttribute('data-multiline', 'true');
      expect(headingLabel).toHaveAttribute('data-font-weight', 'bold');
    });

    it('should pass correct props to RdsLabel components for descriptions', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const descriptionLabels = screen.getAllByTestId('rds-label');
      const descriptionLabel = descriptionLabels.find(label => 
        label.textContent === 'Find answers to common questions about our services and products.'
      );
      
      expect(descriptionLabel).toHaveAttribute('data-size', '14px');
      expect(descriptionLabel).toHaveAttribute('data-multiline', 'true');
    });
  });

  // 8. Accessibility Tests
  describe('Accessibility', () => {
    it('should use proper heading hierarchy', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const mainHeading = screen.getByRole('heading', { level: 2 });
      const questionHeadings = screen.getAllByRole('heading', { level: 5 });
      
      expect(mainHeading).toBeInTheDocument();
      expect(questionHeadings).toHaveLength(3);
    });

    it('should have accessible text content', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      expect(screen.getByText('Frequently Asked Questions')).toBeVisible();
      expect(screen.getByText('What is your return policy?')).toBeVisible();
    });
  });

  // 9. Props Validation Tests
  describe('Props Validation', () => {
    it('should handle different question heading structures', () => {
      const customHeading = {
        question: 'Custom FAQ Title',
        description: 'Custom description text'
      };
      
      const propsWithCustomHeading = {
        ...defaultProps,
        QuestionHeading: customHeading
      };
      
      render(<RdsCompFaq {...propsWithCustomHeading} />);
      
      expect(screen.getByText('Custom FAQ Title')).toBeInTheDocument();
      expect(screen.getByText('Custom description text')).toBeInTheDocument();
    });

    it('should handle questions with long content', () => {
      const longContentQuestion = {
        question: 'This is a very long question that might span multiple lines and test how the component handles lengthy text content',
        description: 'This is a very long description that contains detailed information about the topic and should test how the component renders and displays extensive text content properly without breaking the layout or causing any visual issues.'
      };
      
      const propsWithLongContent = {
        ...defaultProps,
        questionList: [longContentQuestion]
      };
      
      render(<RdsCompFaq {...propsWithLongContent} />);
      
      expect(screen.getByText(longContentQuestion.question)).toBeInTheDocument();
      expect(screen.getByText(longContentQuestion.description)).toBeInTheDocument();
    });
  });

  // 10. Component Structure Tests
  describe('Component Structure', () => {
    it('should maintain proper layout structure', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const container = screen.getByText('Frequently Asked Questions').closest('.container');
      const row = container?.querySelector('.row');
      const leftCol = row?.querySelector('.col-md-4');
      const rightCol = row?.querySelector('.col-md-8');
      
      expect(container).toBeInTheDocument();
      expect(row).toBeInTheDocument();
      expect(leftCol).toBeInTheDocument();
      expect(rightCol).toBeInTheDocument();
    });

    it('should apply correct CSS classes to elements', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const descriptionDiv = screen.getByText('Find answers to common questions about our services and products.').closest('div');
      const questionDescDiv = screen.getByText('We offer a 30-day return policy for all unused items in their original packaging. Returns must be initiated within 30 days of purchase.').closest('div');
      
      expect(descriptionDiv).toHaveClass('text-dark', 'mt-3');
      expect(questionDescDiv).toHaveClass('text-muted', 'mb-2');
    });
  });

  // 11. Content Validation Tests
  describe('Content Validation', () => {
    it('should display exact number of questions provided', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const questionElements = screen.getAllByRole('heading', { level: 5 });
      expect(questionElements).toHaveLength(mockQuestionList.length);
    });

    it('should maintain question-answer pairing', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      const firstQuestion = screen.getByText('What is your return policy?');
      const firstAnswer = screen.getByText('We offer a 30-day return policy for all unused items in their original packaging. Returns must be initiated within 30 days of purchase.');
      
      expect(firstQuestion).toBeInTheDocument();
      expect(firstAnswer).toBeInTheDocument();
    });
  });

  // 12. Integration Tests
  describe('Integration Tests', () => {
    it('should render complete FAQ component with all sections', () => {
      render(<RdsCompFaq {...defaultProps} />);
      
      // Verify main heading section
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(screen.getByText('Find answers to common questions about our services and products.')).toBeInTheDocument();
      
      // Verify all question sections
      mockQuestionList.forEach(item => {
        expect(screen.getByText(item.question)).toBeInTheDocument();
        expect(screen.getByText(item.description)).toBeInTheDocument();
      });
      
      // Verify structure
      expect(screen.getByText('Frequently Asked Questions').closest('.container')).toBeInTheDocument();
    });
  });
});