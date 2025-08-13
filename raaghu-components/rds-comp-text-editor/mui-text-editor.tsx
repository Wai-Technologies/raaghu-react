import React from 'react';
import { 
  Box,
  TextField, 
  Toolbar, 
  Button, 
  Divider,
  Tooltip,
  Stack,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  InsertLink,
  InsertPhoto,
  FormatQuote,
  FormatIndentDecrease,
  FormatIndentIncrease,
  Code,
  FormatClear,
  HorizontalRule,
  TableChart,
  FormatColorText
} from '@mui/icons-material';

export interface MuiTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minRows?: number;
  maxRows?: number;
}

interface Command {
  tag: string;
  before: string;
  after: string;
}

const MuiTextEditor: React.FC<MuiTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
  minRows = 6,
  maxRows = 20
}) => {
  const editorRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [selectedHeading, setSelectedHeading] = React.useState<string>("");

  const commands: Record<string, Command> = {
    bold: { tag: 'strong', before: '<strong>', after: '</strong>' },
    italic: { tag: 'em', before: '<em>', after: '</em>' },
    underline: { tag: 'u', before: '<u>', after: '</u>' },
    link: { tag: 'a', before: '<a href="#">', after: '</a>' },
    orderedList: { tag: 'ol', before: '<ol><li>', after: '</li></ol>' },
    unorderedList: { tag: 'ul', before: '<ul><li>', after: '</li></ul>' },
    alignLeft: { tag: 'div', before: '<div style="text-align: left">', after: '</div>' },
    alignCenter: { tag: 'div', before: '<div style="text-align: center">', after: '</div>' },
    alignRight: { tag: 'div', before: '<div style="text-align: right">', after: '</div>' },
    alignJustify: { tag: 'div', before: '<div style="text-align: justify">', after: '</div>' },
    quote: { tag: 'blockquote', before: '<blockquote>', after: '</blockquote>' },
    indentDecrease: { tag: 'div', before: '<div style="margin-left: -20px">', after: '</div>' },
    indentIncrease: { tag: 'div', before: '<div style="margin-left: 20px">', after: '</div>' },
    code: { tag: 'pre', before: '<pre><code>', after: '</code></pre>' },
    image: { tag: 'img', before: '<img src="https://example.com/image.jpg" alt="Image">', after: '' },
    hr: { tag: 'hr', before: '<hr>', after: '' }
  };

  const handleCommand = (cmd: string) => {
    if (!editorRef.current || disabled) return;
    
    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const command = commands[cmd];

    if (!command) return;

    // Apply formatting
    const newText = value.substring(0, start) + 
                   command.before + 
                   selectedText + 
                   command.after + 
                   value.substring(end);
    
    onChange(newText);

    // Reset textarea selection after formatting (for better UX)
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + command.before.length,
        start + command.before.length + selectedText.length
      );
    }, 0);
  };

  const handleHeadingChange = (event: SelectChangeEvent) => {
    const heading = event.target.value;
    setSelectedHeading(heading);
    
    if (!editorRef.current || disabled) return;
    
    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let before = '';
    let after = '';
    
    if (heading) {
      before = `<${heading}>`;
      after = `</${heading}>`;
    }
    
    // Apply heading
    const newText = value.substring(0, start) + 
                   before + 
                   selectedText + 
                   after + 
                   value.substring(end);
    
    onChange(newText);
    setSelectedHeading(""); // Reset after applying
  };

  return (
    <Box className={`mui-text-editor ${className || ''}`}>
      <Toolbar 
        variant="dense" 
        sx={{ 
          bgcolor: 'background.paper', 
          borderRadius: '4px 4px 0 0',
          border: '1px solid',
          borderColor: disabled ? '#e9ecef' : '#ccc',
          borderBottom: 'none',
          opacity: disabled ? 0.6 : 1,
          '& .MuiButtonBase-root': {
            padding: '4px',
          }
        }}
        disableGutters
      >
        <FormControl size="small" sx={{ minWidth: 120, mr: 1 }}>
          <InputLabel id="heading-select-label">Format</InputLabel>
          <Select
            labelId="heading-select-label"
            value={selectedHeading}
            onChange={handleHeadingChange}
            size="small"
            label="Format"
            disabled={disabled}
          >
            <MenuItem value="">Normal</MenuItem>
            <MenuItem value="h1">Heading 1</MenuItem>
            <MenuItem value="h2">Heading 2</MenuItem>
            <MenuItem value="h3">Heading 3</MenuItem>
            <MenuItem value="h4">Heading 4</MenuItem>
            <MenuItem value="h5">Heading 5</MenuItem>
            <MenuItem value="h6">Heading 6</MenuItem>
          </Select>
        </FormControl>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Bold">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('bold')}
              disabled={disabled}
            >
              <FormatBold fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Italic">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('italic')}
              disabled={disabled}
            >
              <FormatItalic fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Underline">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('underline')}
              disabled={disabled}
            >
              <FormatUnderlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Align Left">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('alignLeft')}
              disabled={disabled}
            >
              <FormatAlignLeft fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Align Center">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('alignCenter')}
              disabled={disabled}
            >
              <FormatAlignCenter fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Align Right">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('alignRight')}
              disabled={disabled}
            >
              <FormatAlignRight fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Justify">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('alignJustify')}
              disabled={disabled}
            >
              <FormatAlignJustify fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Bullet List">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('unorderedList')}
              disabled={disabled}
            >
              <FormatListBulleted fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Numbered List">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('orderedList')}
              disabled={disabled}
            >
              <FormatListNumbered fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Decrease Indent">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('indentDecrease')}
              disabled={disabled}
            >
              <FormatIndentDecrease fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Increase Indent">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('indentIncrease')}
              disabled={disabled}
            >
              <FormatIndentIncrease fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Insert Link">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('link')}
              disabled={disabled}
            >
              <InsertLink fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Insert Image">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('image')}
              disabled={disabled}
            >
              <InsertPhoto fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Block Quote">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('quote')}
              disabled={disabled}
            >
              <FormatQuote fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Code Block">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('code')}
              disabled={disabled}
            >
              <Code fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Horizontal Rule">
            <IconButton 
              size="small" 
              onClick={() => handleCommand('hr')}
              disabled={disabled}
            >
              <HorizontalRule fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
      
      <TextField 
        inputRef={editorRef}
        multiline
        fullWidth
        minRows={minRows}
        maxRows={maxRows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: '0 0 4px 4px',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            fontFamily: 'inherit',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: disabled ? '#e9ecef' : '#ccc',
          },
          '& .MuiInputBase-root': {
            opacity: disabled ? 0.6 : 1,
            backgroundColor: disabled ? '#e9ecef' : 'transparent',
            cursor: disabled ? 'not-allowed' : 'text',
          }
        }}
        variant="outlined"
      />
    </Box>
  );
};

export default MuiTextEditor;
