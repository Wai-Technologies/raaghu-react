import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompBlogPostNew from '../src/rds-comp-blog-post-new/rds-comp-blog-post-new';
import { act } from 'react-dom/test-utils';

// Define interfaces for mock components
interface RdsButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  dataTestId?: string;
  isDisabled?: boolean;
  [key: string]: any;
}

interface RdsInputProps {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
  placeholder?: string;
  label?: boolean;
  [key: string]: any;
}

interface RdsCompLabelProps {
  label: string;
  [key: string]: any;
}

interface SelectItem {
  option: string;
  value: string;
}

interface RdsSelectListProps {
  label?: string;
  onChange: (item: { value: string }) => void;
  dataTestId?: string;
  selectItems?: SelectItem[];
  selectedValue?: string;
  [key: string]: any;
}

interface RdsTextAreaProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  dataTestId?: string;
  placeholder?: string;
  [key: string]: any;
}

interface RdsTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
  [key: string]: any;
}

interface RdsFileUploaderProps {
  onFileArray: (files: File[]) => void;
  label?: string;
  [key: string]: any;
}

// Mock the necessary dependencies
jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ label, onClick, dataTestId, isDisabled, ...rest }: RdsButtonProps) => (
    <button 
      onClick={onClick} 
      data-testid={dataTestId} 
      disabled={isDisabled}
      {...rest}
    >
      {label}
    </button>
  ),
  RdsInput: ({ name, value, onChange, dataTestId, placeholder, label, ...rest }: RdsInputProps) => (
    <div>
      {label && <label>{name}</label>}
      <input 
        type="text" 
        value={value || ''} 
        onChange={onChange} 
        data-testid={dataTestId} 
        placeholder={placeholder}
        {...rest}
      />
    </div>
  ),
  RdsCompLabel: ({ label, ...rest }: RdsCompLabelProps) => <label {...rest}>{label}</label>,
  RdsCompSelectList: ({ label, onChange, dataTestId, selectItems, selectedValue, ...rest }: RdsSelectListProps) => (
    <div>
      <label>{label}</label>
      <select 
        data-testid={dataTestId} 
        onChange={(e) => onChange({ value: e.target.value })}
        value={selectedValue}
        {...rest}
      >
        {selectItems?.map((item: SelectItem, index: number) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  ),
  RdsTextArea: ({ label, value, onChange, dataTestId, placeholder, ...rest }: RdsTextAreaProps) => (
    <div>
      <label>{label}</label>
      <textarea 
        value={value || ''} 
        onChange={onChange} 
        data-testid={dataTestId} 
        placeholder={placeholder}
        {...rest}
      />
    </div>
  ),
  RdsTextEditor: ({ value, onChange, ...rest }: RdsTextEditorProps) => (
    <div data-testid="text-editor" {...rest}>
      <textarea 
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ),
  RdsFileUploader: ({ onFileArray, label, ...rest }: RdsFileUploaderProps) => (
    <div {...rest}>
      <label>{label}</label>
      <input 
        type="file" 
        data-testid="file-uploader"
        onChange={(e) => {
          const files = e.target.files ? Array.from(e.target.files) : [];
          onFileArray(files);
        }}
      />
    </div>
  ),
}));

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('RdsCompBlogPostNew', () => {
  // Sample data for testing
  const mockBlogList = [
    { option: 'Blog 1', value: 'blog1' },
    { option: 'Blog 2', value: 'blog2' },
    { option: 'Blog 3', value: 'blog3' },
  ];

  const mockBlogPostData = {
    title: 'Test Blog Post',
    slug: 'test-blog-post',
    description: 'This is a test blog post',
    tags: 'test, blog, post',
    blogId: 'blog1',
    content: 'Test content',
    concurrencyStamp: 'abc123',
    file: [],
    fileName: '',
  };

  const defaultProps = {
    blogList: mockBlogList,
    isEdit: false,
    offId: 'offcanvas1',
    onSaveHandler: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<RdsCompBlogPostNew {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('renders in edit mode correctly', () => {
    render(
      <RdsCompBlogPostNew 
        {...defaultProps} 
        isEdit={true} 
        blogPostData={mockBlogPostData} 
      />
    );
    
    // Check that concurrency stamp field is rendered in edit mode
    expect(screen.getByTestId('concurrency-stamp')).toBeInTheDocument();
    
    // Verify form is populated with blog post data
    expect(screen.getByTestId('title')).toHaveValue(mockBlogPostData.title);
    expect(screen.getByTestId('slug')).toHaveValue(mockBlogPostData.slug);
    expect(screen.getByTestId('tag')).toHaveValue(mockBlogPostData.tags);
  });

  it('does not render concurrency stamp field in create mode', () => {
    render(<RdsCompBlogPostNew {...defaultProps} />);
    expect(screen.queryByTestId('concurrency-stamp')).not.toBeInTheDocument();
  });

  it('updates form values when user enters data', async () => {
    render(<RdsCompBlogPostNew {...defaultProps} />);
    
    // Enter title
    const titleInput = screen.getByTestId('title');
    fireEvent.change(titleInput, { target: { value: 'New Blog Title' } });
    
    // Enter slug
    const slugInput = screen.getByTestId('slug');
    fireEvent.change(slugInput, { target: { value: 'new-blog-title' } });
    
    // Enter tags
    const tagsInput = screen.getByTestId('tag');
    fireEvent.change(tagsInput, { target: { value: 'new, blog' } });
    
    // Enter description
    const descInput = screen.getByTestId('shord-desc');
    fireEvent.change(descInput, { target: { value: 'This is a new blog description' } });
    
    // Select blog
    const blogSelect = screen.getByTestId('blog-id');
    fireEvent.change(blogSelect, { target: { value: 'blog2' } });
    
    // Verify form values have been updated
    expect(titleInput).toHaveValue('New Blog Title');
    expect(slugInput).toHaveValue('new-blog-title');
    expect(tagsInput).toHaveValue('new, blog');
    expect(descInput).toHaveValue('This is a new blog description');
  });

  it('disables submit buttons when form is invalid', () => {
    render(<RdsCompBlogPostNew {...defaultProps} />);
    
    // Initially buttons should be disabled since form is empty
    expect(screen.getByTestId('submit')).toBeDisabled();
    expect(screen.getByTestId('save')).toBeDisabled();
    
    // Fill out required fields
    fireEvent.change(screen.getByTestId('title'), { target: { value: 'New Blog Title' } });
    fireEvent.change(screen.getByTestId('slug'), { target: { value: 'new-blog-title' } });
    
    // Form is still invalid without tags
    expect(screen.getByTestId('submit')).toBeDisabled();
    
    // Add tags to make form valid
    fireEvent.change(screen.getByTestId('tag'), { target: { value: 'new, blog' } });
    
    // Now buttons should be enabled
    expect(screen.getByTestId('submit')).not.toBeDisabled();
    expect(screen.getByTestId('save')).not.toBeDisabled();
  });

  it('calls onSaveHandler with correct data when submit button is clicked', () => {
    render(<RdsCompBlogPostNew {...defaultProps} />);
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('title'), { target: { value: 'New Blog Title' } });
    fireEvent.change(screen.getByTestId('slug'), { target: { value: 'new-blog-title' } });
    fireEvent.change(screen.getByTestId('tag'), { target: { value: 'new, blog' } });
    fireEvent.change(screen.getByTestId('shord-desc'), { target: { value: 'This is a new blog description' } });
    
    // Click the submit button
    fireEvent.click(screen.getByTestId('submit'));
    
    // Check that onSaveHandler was called with the correct data
    expect(defaultProps.onSaveHandler).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSaveHandler).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Blog Title',
      slug: 'new-blog-title',
      tags: 'new, blog',
      description: 'This is a new blog description'
    }));
  });

  it('renders different button set based on isEdit prop', () => {
    // Render in create mode
    const { rerender } = render(<RdsCompBlogPostNew {...defaultProps} isEdit={false} />);
    
    // In create mode, we should have Cancel, Save As Draft, and Publish buttons
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save As Draft')).toBeInTheDocument();
    expect(screen.getByText('Publish')).toBeInTheDocument();
    
    // Rerender in edit mode
    rerender(<RdsCompBlogPostNew {...defaultProps} isEdit={true} />);
    
    // In edit mode, we should have Cancel and Save buttons
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.queryByText('Save As Draft')).not.toBeInTheDocument();
    expect(screen.queryByText('Publish')).not.toBeInTheDocument();
  });  // Add another test specifically for the file upload handler
  it('correctly updates state when a file is uploaded', () => {
    // Create a spy on setState
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    
    // Mock useState to return our controlled state and setState function
    let capturedHandlerBlogDataChange: any = null;
    
    // Override the RdsFileUploader mock to capture the handlerBlogDataChange function
    const fileUploaderMock = jest.fn(({ onFileArray }: { onFileArray: any }) => {
      capturedHandlerBlogDataChange = onFileArray;
      return <div data-testid="file-uploader" />;
    });
    
    // Save original implementation
    const originalFileUploader = jest.requireMock('../src/rds-elements').RdsFileUploader;
    
    // Override the mock temporarily
    jest.requireMock('../src/rds-elements').RdsFileUploader = fileUploaderMock;
    
    try {
      // Render component
      render(<RdsCompBlogPostNew {...defaultProps} />);
      
      // Verify fileUploader was rendered
      expect(screen.getByTestId('file-uploader')).toBeInTheDocument();
      
      // Make sure handlerBlogDataChange was captured
      expect(capturedHandlerBlogDataChange).toBeTruthy();
      
      // Create a mock file
      const mockFile = new File(['file content'], 'test-file.jpg', { type: 'image/jpeg' });
      
      // Call the handler directly with the mock file
      // This directly tests the handlerBlogDataChange function's behavior with a file
      const fileArray = [mockFile];
      capturedHandlerBlogDataChange(fileArray);
      
      // Fill out form fields to enable the submit button
      fireEvent.change(screen.getByTestId('title'), { target: { value: 'Test Title' } });
      fireEvent.change(screen.getByTestId('slug'), { target: { value: 'test-slug' } });
      fireEvent.change(screen.getByTestId('tag'), { target: { value: 'test-tag' } });
      
      // Submit the form
      fireEvent.click(screen.getByTestId('submit'));
      
      // Verify onSaveHandler was called and contains the file
      expect(defaultProps.onSaveHandler).toHaveBeenCalledTimes(1);
      
      // Get the saved data
      const savedData = defaultProps.onSaveHandler.mock.calls[0][0];
      
      // Verify file was saved
      expect(savedData.file).toBeTruthy();
      expect(Array.isArray(savedData.file)).toBe(true);
    } finally {
      // Restore the original implementation
      jest.requireMock('../src/rds-elements').RdsFileUploader = originalFileUploader;
    }
  });

  it('handles file uploads correctly', () => {
    render(<RdsCompBlogPostNew {...defaultProps} />);
    
    // Create a mock file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    
    // Simulate file upload
    const fileInput = screen.getByTestId('file-uploader');
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    fireEvent.change(fileInput);
    
    // Submit the form
    fireEvent.change(screen.getByTestId('title'), { target: { value: 'New Blog Title' } });
    fireEvent.change(screen.getByTestId('slug'), { target: { value: 'new-blog-title' } });
    fireEvent.change(screen.getByTestId('tag'), { target: { value: 'new, blog' } });
    
    fireEvent.click(screen.getByTestId('submit'));
    
    // Check that onSaveHandler was called with the file data
    // Only verify that the file was included in the saved data
    expect(defaultProps.onSaveHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        file: expect.any(Array),
        title: 'New Blog Title',
        slug: 'new-blog-title',
        tags: 'new, blog'
      })
    );

    // Get the actual call argument
    const savedData = defaultProps.onSaveHandler.mock.calls[0][0];
    
    // Verify file is in the correct format (an array)
    expect(savedData.file).toBeInstanceOf(Array);
    expect(savedData.file.length).toBe(1);
  });
});