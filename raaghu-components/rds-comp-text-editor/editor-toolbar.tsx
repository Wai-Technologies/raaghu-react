import { useCallback, useEffect, useId, useRef, useState, type ChangeEvent, type JSX } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  type TextFormatType,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, $isQuoteNode } from '@lexical/rich-text';
import { $isListNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  type SelectChangeEvent,
} from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { INSERT_IMAGE_COMMAND } from './image-plugin';
import { isSafeUrl } from './sanitize-html';

type BlockType = 'paragraph' | 'h1' | 'h2' | 'h3' | 'quote' | 'bullet' | 'number';
type Alignment = 'left' | 'center' | 'right' | 'justify';

const BLOCK_OPTIONS: { value: BlockType; label: string }[] = [
  { value: 'paragraph', label: 'Normal' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'quote', label: 'Quote' },
];

const TEXT_FORMATS: TextFormatType[] = ['bold', 'italic', 'underline', 'strikethrough'];
const IMAGE_ACCEPT = 'image/gif,image/jpeg,image/jpg,image/png';
const LINK_PREFIX = 'https://';

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export interface EditorToolbarProps {
  /** Disables every toolbar control. */
  disabled?: boolean;
  /** Upload handler for images; files are read as data URLs when omitted. */
  onImageUpload?: (file: File) => Promise<string> | string;
}

/** Accessible MUI toolbar for the Lexical editor. */
export function EditorToolbar({ disabled = false, onImageUpload }: EditorToolbarProps): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [formats, setFormats] = useState<TextFormatType[]>([]);
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [alignment, setAlignment] = useState<Alignment>('left');
  const [isLink, setIsLink] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [linkAnchor, setLinkAnchor] = useState<HTMLElement | null>(null);
  const [linkUrl, setLinkUrl] = useState(LINK_PREFIX);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const linkFieldId = useId();

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;

    setFormats(TEXT_FORMATS.filter((format) => selection.hasFormat(format)));

    const anchorNode = selection.anchor.getNode();
    const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
    if ($isListNode(element)) {
      setBlockType(element.getListType() === 'number' ? 'number' : 'bullet');
    } else if ($isHeadingNode(element)) {
      const tag = element.getTag();
      setBlockType(tag === 'h1' || tag === 'h2' || tag === 'h3' ? tag : 'paragraph');
    } else {
      setBlockType($isQuoteNode(element) ? 'quote' : 'paragraph');
    }

    const format = $isElementNode(element) ? element.getFormatType() : '';
    setAlignment(format === 'center' || format === 'right' || format === 'justify' ? format : 'left');
    setIsLink($isLinkNode(anchorNode) || $isLinkNode(anchorNode.getParent()));
  }, []);

  useEffect(() => {
    const unregisterUpdate = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(updateToolbar);
    });
    const unregisterUndo = editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
    const unregisterRedo = editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
    return () => {
      unregisterUpdate();
      unregisterUndo();
      unregisterRedo();
    };
  }, [editor, updateToolbar]);

  const setBlock = (type: BlockType) => {
    if ((type === 'bullet' || type === 'number') && blockType !== type) {
      editor.dispatchCommand(type === 'bullet' ? INSERT_UNORDERED_LIST_COMMAND : INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      $setBlocksType(selection, () => {
        if (type === 'quote') return $createQuoteNode();
        if (type === 'h1' || type === 'h2' || type === 'h3') return $createHeadingNode(type);
        return $createParagraphNode();
      });
    });
  };

  const trimmedLink = linkUrl.trim();
  const linkValid = trimmedLink !== LINK_PREFIX && isSafeUrl(trimmedLink);

  const applyLink = () => {
    if (linkValid) editor.dispatchCommand(TOGGLE_LINK_COMMAND, trimmedLink);
    setLinkAnchor(null);
  };

  const removeLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    setLinkAnchor(null);
  };

  const handleImageFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const src = onImageUpload ? await onImageUpload(file) : await readAsDataUrl(file);
    if (src) editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src, altText: file.name });
  };

  return (
    <Box className="rds-comp-text-editor__toolbar" role="toolbar" aria-label="Text formatting">
      <IconButton
        size="small"
        aria-label="Undo"
        disabled={disabled || !canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      >
        <UndoIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        aria-label="Redo"
        disabled={disabled || !canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      >
        <RedoIcon fontSize="small" />
      </IconButton>

      <Divider flexItem orientation="vertical" />

      <Select
        size="small"
        value={blockType === 'bullet' || blockType === 'number' ? 'paragraph' : blockType}
        onChange={(event: SelectChangeEvent) => setBlock(event.target.value as BlockType)}
        disabled={disabled}
        inputProps={{ 'aria-label': 'Block type' }}
        className="rds-comp-text-editor__block-select"
        MenuProps={{ slotProps: { paper: { className: 'rds-comp-text-editor__block-menu' } } }}
      >
        {BLOCK_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <ToggleButtonGroup value={formats} size="small" aria-label="Text style" disabled={disabled}>
        <ToggleButton value="bold" aria-label="Bold" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}>
          <FormatBoldIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="Italic" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}>
          <FormatItalicIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="underline" aria-label="Underline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}>
          <FormatUnderlinedIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton
          value="strikethrough"
          aria-label="Strikethrough"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
        >
          <StrikethroughSIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup value={blockType} exclusive size="small" aria-label="Lists" disabled={disabled}>
        <ToggleButton value="bullet" aria-label="Bullet list" onClick={() => setBlock(blockType === 'bullet' ? 'paragraph' : 'bullet')}>
          <FormatListBulletedIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="number" aria-label="Numbered list" onClick={() => setBlock(blockType === 'number' ? 'paragraph' : 'number')}>
          <FormatListNumberedIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        value={alignment}
        exclusive
        size="small"
        aria-label="Text alignment"
        disabled={disabled}
        onChange={(_, value: Alignment | null) => {
          if (value) editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value);
        }}
      >
        <ToggleButton value="left" aria-label="Align left">
          <FormatAlignLeftIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="center" aria-label="Align center">
          <FormatAlignCenterIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="right" aria-label="Align right">
          <FormatAlignRightIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="justify" aria-label="Justify">
          <FormatAlignJustifyIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>

      <ToggleButton
        value="link"
        size="small"
        selected={isLink}
        aria-label="Link"
        aria-haspopup="dialog"
        disabled={disabled}
        onClick={(event) => {
          setLinkUrl(LINK_PREFIX);
          setLinkAnchor(event.currentTarget);
        }}
      >
        <LinkIcon fontSize="small" />
      </ToggleButton>
      <IconButton size="small" aria-label="Insert image" disabled={disabled} onClick={() => fileInputRef.current?.click()}>
        <ImageIcon fontSize="small" />
      </IconButton>
      <input
        ref={fileInputRef}
        type="file"
        accept={IMAGE_ACCEPT}
        hidden
        tabIndex={-1}
        aria-hidden="true"
        onChange={handleImageFile}
        data-testid="rds-comp-text-editor-image-input"
      />

      <Popover
        open={Boolean(linkAnchor)}
        anchorEl={linkAnchor}
        onClose={() => setLinkAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{ paper: { className: 'rds-comp-text-editor__link-popover', role: 'dialog', 'aria-label': 'Edit link' } }}
      >
        <Stack
          component="form"
          direction="row"
          spacing={1}
          className="rds-comp-text-editor__link-form"
          onSubmit={(event) => {
            event.preventDefault();
            applyLink();
          }}
        >
          <TextField
            id={linkFieldId}
            size="small"
            label="Link URL"
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
            error={trimmedLink !== LINK_PREFIX && !linkValid}
            autoFocus
          />
          <Button type="submit" size="small" variant="contained" disabled={!linkValid}>
            Apply
          </Button>
          {isLink && (
            <Button size="small" onClick={removeLink}>
              Remove
            </Button>
          )}
        </Stack>
      </Popover>
    </Box>
  );
}
