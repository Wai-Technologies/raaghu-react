import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompCopyText from '../src/rds-comp-copy-text/rds-comp-copy-text';

// Mock the RdsCompIcon and RdsCompLabel components
jest.mock('../src/rds-elements', () => ({
  RdsCompIcon: ({ 
    name, 
    colorVariant, 
    height, 
    width, 
    stroke, 
    fill,
    isCursorPointer,
    ...rest 
  }: any) => (
    <div
      data-testid={`icon-${name}`}
      className={`icon-${colorVariant || 'default'} ${isCursorPointer ? 'cursor-pointer' : ''}`}
      style={{ 
        height, 
        width,
        stroke: stroke ? 'currentColor' : 'none',
        fill: fill ? 'currentColor' : 'none'
      }}
      {...rest}
    >
      {name}
    </div>
  ),
  RdsCompLabel: ({ 
    label, 
    fontWeight,
    ...rest 
  }: any) => (
    <div
      data-testid={`label-${label.replace(/\s+/g, '-').toLowerCase()}`}
      className={`font-weight-${fontWeight || 'normal'}`}
      {...rest}
    >
      {label}
    </div>
  )
}));

// Mock document.execCommand
Object.defineProperty(document, 'execCommand', {
  value: jest.fn().mockImplementation(() => true)
});

// Mock Clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve())
  },
  writable: true
});

// Mock window.getSelection
const mockSelection = {
  removeAllRanges: jest.fn(),
  addRange: jest.fn()
};

Object.defineProperty(window, 'getSelection', {
  value: jest.fn().mockImplementation(() => mockSelection)
});

// Mock createRange
document.createRange = jest.fn().mockImplementation(() => ({
  selectNode: jest.fn()
}));

describe('RdsCompCopyText', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    const { container } = render(<RdsCompCopyText />);
    expect(container).toBeTruthy();
  });

  it('renders the component title correctly', () => {
    render(<RdsCompCopyText />);
    
    // Check if the title is present
    const title = screen.getByText('COPY TEXT');
    expect(title).toBeInTheDocument();
  });

  it('renders all three copy sections with correct labels and text', () => {
    render(<RdsCompCopyText />);
    
    // Check if labels are present
    expect(screen.getByTestId('label-download-the-cli-tool')).toBeInTheDocument();
    expect(screen.getByTestId('label-update-the-cli-tool-to-the-latest-version')).toBeInTheDocument();
    expect(screen.getByTestId('label-create-a-new-solution-')).toBeInTheDocument();
    
    // Check if copy texts are present
    expect(screen.getByText('dotnet tool install -g Waiin.Raaghu.Cli')).toBeInTheDocument();
    expect(screen.getByText('dotnet tool update -g Waiin.Raaghu.Cli')).toBeInTheDocument();
    expect(screen.getByText('raaghu new <solution-name> [options]')).toBeInTheDocument();
  });

  it('shows clipboard icon for each copy section', () => {
    render(<RdsCompCopyText />);
    
    // Check if clipboard icons are present
    const clipboardIcons = screen.getAllByTestId('icon-clipboard');
    expect(clipboardIcons).toHaveLength(3);
  });

  it('copies text and shows success icon when clipboard is clicked - first section', async () => {
    render(<RdsCompCopyText />);
    
    // Get all clipboard icons and click the first one
    const clipboardIcons = screen.getAllByTestId('icon-clipboard');
    fireEvent.click(clipboardIcons[0]);
    
    // Check if copy command was executed
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    
    // Check if success icon is shown
    expect(screen.getByTestId('icon-clipboard_check')).toBeInTheDocument();
    
    // After 3 seconds, success icon should disappear
    jest.advanceTimersByTime(3000);
    
    // Wait for the timeout to complete
    await waitFor(() => {
      expect(screen.queryByTestId('icon-clipboard_check')).not.toBeInTheDocument();
    });
  });

  it('copies text and shows success icon when clipboard is clicked - second section', async () => {
    render(<RdsCompCopyText />);
    
    // Get all clipboard icons and click the second one
    const clipboardIcons = screen.getAllByTestId('icon-clipboard');
    fireEvent.click(clipboardIcons[1]);
    
    // Check if copy command was executed
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    
    // Check if success icon is shown
    expect(screen.getByTestId('icon-clipboard_check')).toBeInTheDocument();
    
    // After 3 seconds, success icon should disappear
    jest.advanceTimersByTime(3000);
    
    // Wait for the timeout to complete
    await waitFor(() => {
      expect(screen.queryByTestId('icon-clipboard_check')).not.toBeInTheDocument();
    });
  });

  it('copies text and shows success icon when clipboard is clicked - third section', async () => {
    render(<RdsCompCopyText />);
    
    // Get all clipboard icons and click the third one
    const clipboardIcons = screen.getAllByTestId('icon-clipboard');
    fireEvent.click(clipboardIcons[2]);
    
    // Check if copy command was executed
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    
    // Check if success icon is shown
    expect(screen.getByTestId('icon-clipboard_check')).toBeInTheDocument();
    
    // After 3 seconds, success icon should disappear
    jest.advanceTimersByTime(3000);
    
    // Wait for the timeout to complete
    await waitFor(() => {
      expect(screen.queryByTestId('icon-clipboard_check')).not.toBeInTheDocument();
    });
  });

  it('has proper card styling for copy sections', () => {
    const { container } = render(<RdsCompCopyText />);
    
    // Check if cards have proper styling
    const cards = container.querySelectorAll('.card');
    expect(cards).toHaveLength(3);
    
    cards.forEach(card => {
      expect(card).toHaveClass('rounded-2');
      
      // Check card body
      const cardBody = card.querySelector('.card-body');
      expect(cardBody).toHaveClass('py-2');
      expect(cardBody).toHaveClass('d-flex');
      expect(cardBody).toHaveClass('align-items-center');
      expect(cardBody).toHaveClass('justify-content-between');
      expect(cardBody).toHaveClass('clipboard');
    });
  });

  it('has cursor pointer style for clipboard icons', () => {
    render(<RdsCompCopyText />);
    
    // Check if clipboard icons have cursor-pointer style
    const clipboardIcons = screen.getAllByTestId('icon-clipboard');
    
    clipboardIcons.forEach(icon => {
      expect(icon).toHaveClass('cursor-pointer');
    });
  });  it('copies text when div containing clipboard icon is clicked', async () => {
    render(<RdsCompCopyText />);
    
    // Get all clipboard icon parent divs
    const clipboardIcon = screen.getAllByTestId('icon-clipboard')[0];
    const clipboardDiv = clipboardIcon.parentElement;
    
    // Ensure parentElement exists before firing event
    if (clipboardDiv) {
      // Simulate clicking on the first clipboard div
      fireEvent.click(clipboardDiv);
      
      // Check if copy command was executed
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      
      // Check if success icon is shown
      expect(screen.getByTestId('icon-clipboard_check')).toBeInTheDocument();
      
      // After 3 seconds, success icon should disappear
      jest.advanceTimersByTime(3000);
      
      // Wait for the timeout to complete
      await waitFor(() => {
        expect(screen.queryByTestId('icon-clipboard_check')).not.toBeInTheDocument();
      });
    }
  });

  it('copies multiple sections independently', async () => {
    render(<RdsCompCopyText />);
    
    // Get all clipboard icons
    const clipboardIcons = screen.getAllByTestId('icon-clipboard');
    
    // Click the first clipboard icon
    fireEvent.click(clipboardIcons[0]);
    
    // Check if one success icon is shown and clipboard icon disappears
    expect(screen.getAllByTestId('icon-clipboard_check')).toHaveLength(1);
    expect(screen.getAllByTestId('icon-clipboard')).toHaveLength(2); // Two remaining
    
    // After 3 seconds, first success icon should disappear
    jest.advanceTimersByTime(3000);
    
    await waitFor(() => {
      expect(screen.queryAllByTestId('icon-clipboard_check')).toHaveLength(0);
      expect(screen.getAllByTestId('icon-clipboard')).toHaveLength(3); // All three back
    });
    
    // Click the second clipboard icon
    fireEvent.click(clipboardIcons[1]);
    
    // Check if one success icon is shown
    expect(screen.getAllByTestId('icon-clipboard_check')).toHaveLength(1);
    
    // After 3 seconds, success icon should disappear
    jest.advanceTimersByTime(3000);
    
    await waitFor(() => {
      expect(screen.queryAllByTestId('icon-clipboard_check')).toHaveLength(0);
    });
  });

  it('handles copy failure gracefully', async () => {
    // Mock document.execCommand to return false (copy failed) for just this test
    (document.execCommand as jest.Mock).mockImplementationOnce(() => false);
    
    render(<RdsCompCopyText />);
    
    // Get clipboard icon and click it
    const clipboardIcon = screen.getAllByTestId('icon-clipboard')[0];
    fireEvent.click(clipboardIcon);
    
    // Even if copy fails, the UI should still show success to provide feedback
    expect(screen.getByTestId('icon-clipboard_check')).toBeInTheDocument();
    
    // After 3 seconds, success icon should disappear
    jest.advanceTimersByTime(3000);
    
    // Wait for the timeout to complete
    await waitFor(() => {
      expect(screen.queryByTestId('icon-clipboard_check')).not.toBeInTheDocument();
    });
  });
});