import React, { useState, useRef, useEffect } from 'react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PushPinIcon from '@mui/icons-material/PushPin';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import RdsEmojiGenerator, { EmojiGeneratorType } from '../rds-comp-emoji-generator/rds-comp-emoji-generator';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import ComputerIcon from '@mui/icons-material/Computer';
import CloudIcon from '@mui/icons-material/Cloud';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GifIcon from '@mui/icons-material/Gif';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';


import './rds-comp-comments-box.scss';

// Styles moved to SCSS

interface RdsCommentBoxProps {
  svgEditPath?: string;
  svgDeletePath?: string;
  imgSrc?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  svgEditProps?: React.SVGProps<SVGSVGElement>;
  svgDeleteProps?: React.SVGProps<SVGSVGElement>;
  state:
    | 'default'
    | 'selected'
    | 'typing'
    | 'commentPosted'
    | 'commentHover'
    | 'commentThread';
  commentHoverName?: string;
  commentThreadName?: string;
  threadTitle?: string;
  text?: string;
  time?: string;
  hoverTime?: string;
  hoverText?: string;
  meta?: string;
  hoverMeta?: string;
  translate?: string;
}

interface DropdownMenuProps {
  visible: boolean;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onSelect: (label: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ visible, anchorRef, onClose, onSelect }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onClose, anchorRef]);
  if (!visible) return null;
  return (
    <div ref={menuRef} className="rds-comments-box__attachment-dropdown-menu">
      <div className="rds-comments-box__attachment-dropdown-item" onClick={() => { onSelect('Computer'); onClose(); }}>
        <ComputerIcon className="rds-comments-box__attachment-dropdown-icon" />
        <span className="rds-comments-box__attachment-dropdown-label">Computer</span>
      </div>
      <div className="rds-comments-box__attachment-dropdown-item" onClick={() => { onSelect('Google Drive'); onClose(); }}>
        <InsertDriveFileIcon className="rds-comments-box__attachment-dropdown-icon" />
        <span className="rds-comments-box__attachment-dropdown-label">Google Drive</span>
      </div>
      <div className="rds-comments-box__attachment-dropdown-item" onClick={() => { onSelect('One Drive'); onClose(); }}>
        <CloudIcon className="rds-comments-box__attachment-dropdown-icon" />
        <span className="rds-comments-box__attachment-dropdown-label">One Drive</span>
      </div>
    </div>
  );
};


const RdsCommentBox: React.FC<RdsCommentBoxProps> = ({
  state,
  imgSrc,
  imgProps,
  svgEditProps,
  svgDeleteProps,
  svgEditPath,
  svgDeletePath,
  commentHoverName = "Renne Doe",
  commentThreadName = "Renne Doe",
  threadTitle = "Comment",
  text = "This is the sample text...",
  hoverText = "This is the sample hover text...",
  time = "1 hour ago",
  hoverTime = "1 hour ago",
  meta = "10 Replies · 2 Images · 1 GIF",
  hoverMeta = "10 Replies · 2 Images · 1 GIF",
  translate = "Translate",
}) => {
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [typingDropdownOpen, setTypingDropdownOpen] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<HTMLElement | null>(null);
  const [typingHeader, setTypingHeader] = useState('');
  const handleEmojiBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    setEmojiAnchorEl(event.currentTarget);
    setEmojiPickerOpen((open) => !open);
  };
  const handleEmojiClose = () => {
    setEmojiPickerOpen(false);
    setEmojiAnchorEl(null);
  };
  const handleEmojiSelect = (emoji: string) => {
    setTypingHeader((prev) => prev + emoji);
    handleEmojiClose();
  };
  useEffect(() => {
    if (!emojiPickerOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiAnchorEl &&
        !emojiAnchorEl.contains(event.target as Node)
      ) {
        handleEmojiClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiPickerOpen, emojiAnchorEl]);
  const [mentionDropdownOpen, setMentionDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const attachBtnRef = useRef<HTMLButtonElement>(null);
  const mentionBtnRef = useRef<HTMLButtonElement>(null);
  const mentionDropdownRef = useRef<HTMLDivElement>(null);
  const users = [
    'John Doe',
    'Harry Cane',
    'Romella',
    'Jackson',
    'Stephen',
  ];
  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    if (!mentionDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        mentionDropdownRef.current &&
        !mentionDropdownRef.current.contains(event.target as Node) &&
        mentionBtnRef.current &&
        !mentionBtnRef.current.contains(event.target as Node)
      ) {
        setMentionDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mentionDropdownOpen]);

  // commentHover state
  const [hoverDropdownOpen, setHoverDropdownOpen] = useState(false);
  const hoverMoreBtnRef = useRef<HTMLButtonElement>(null);
  const hoverDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hoverDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        hoverDropdownRef.current &&
        !hoverDropdownRef.current.contains(event.target as Node) &&
        hoverMoreBtnRef.current &&
        !hoverMoreBtnRef.current.contains(event.target as Node)
      ) {
        setHoverDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hoverDropdownOpen]);

  // commentThread state
  const [threadDropdownOpenHeader, setThreadDropdownOpenHeader] = useState(false);
  const threadMoreBtnHeaderRef = useRef<HTMLButtonElement>(null);
  const threadDropdownHeaderRef = useRef<HTMLDivElement>(null);
  const [threadDropdownOpenTools, setThreadDropdownOpenTools] = useState(false);
  const threadMoreBtnToolsRef = useRef<HTMLButtonElement>(null);
  const threadDropdownToolsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!threadDropdownOpenHeader) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        threadDropdownHeaderRef.current &&
        !threadDropdownHeaderRef.current.contains(event.target as Node) &&
        threadMoreBtnHeaderRef.current &&
        !threadMoreBtnHeaderRef.current.contains(event.target as Node)
      ) {
        setThreadDropdownOpenHeader(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [threadDropdownOpenHeader]);
  useEffect(() => {
    if (!threadDropdownOpenTools) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        threadDropdownToolsRef.current &&
        !threadDropdownToolsRef.current.contains(event.target as Node) &&
        threadMoreBtnToolsRef.current &&
        !threadMoreBtnToolsRef.current.contains(event.target as Node)
      ) {
        setThreadDropdownOpenTools(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [threadDropdownOpenTools]);

  // Render logic
  switch (state) {
    case 'selected':
      return (
        <Box className="rds-comments-box rds-comments-box--selected">
          <Avatar className="rds-comments-box__avatar">RD</Avatar>
          <TextField
            variant="outlined"
            placeholder="Placeholder"
            className="rds-comments-box__input"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton className="rds-comments-box__send">
                    <SendIcon fontSize="inherit" className="rds-comments-box__send-icon" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      );

    case 'typing':
      return (
        <Box className="rds-comments-box rds-comments-box--typing relative">
          <Avatar className="rds-comments-box__avatar">RD</Avatar>
          <Box className="rds-comments-box__typing-box">
            <Box className="rds-comments-box__typing-header">
              <TextField
                className="rds-comments-box__typing-placeholder"
                variant="standard"
                placeholder="Placeholder..."
                value={typingHeader}
                onChange={e => setTypingHeader(e.target.value)}
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
            </Box>
            <Box className="rds-comments-box__typing-toolbar relative">
              <Box className="rds-comments-box__toolbar-icons">
                <span className="rds-comments-box__emoji-trigger">
                  <IconButton aria-label="emoji" className="rds-comments-box__emoji-btn" onClick={handleEmojiBtnClick}>
                    <InsertEmoticonIcon fontSize="inherit" className="rds-comments-box__emoji-icon" />
                  </IconButton>
                  {emojiPickerOpen && (
                    <Box
                      ref={emojiPickerRef}
                      className="rds-comments-box__emoji-dropdown"
                    >
                      <RdsEmojiGenerator
                        Type={EmojiGeneratorType.Default}
                        onEmojiSelect={handleEmojiSelect}
                        maxEmojis={60}
                        sx={{ minWidth: 320 }}
                      />
                    </Box>
                  )}
                </span>
                <span className="rds-comments-box__dropdown-trigger">
                  <IconButton
                    aria-label="attach file"
                    className="rds-comments-box__attach-btn"
                    ref={attachBtnRef}
                    onClick={() => setTypingDropdownOpen((open) => !open)}
                  >
                    <AttachmentOutlinedIcon fontSize="inherit" className="rds-comments-box__attach-icon" />
                  </IconButton>
                  <DropdownMenu
                    visible={typingDropdownOpen}
                    anchorRef={attachBtnRef}
                    onClose={() => setTypingDropdownOpen(false)}
                    onSelect={(label) => setTypingHeader(label)}
                  />
                </span>
                <IconButton
                  aria-label="mention"
                  className="rds-comments-box__mention-btn"
                  ref={mentionBtnRef}
                  onClick={() => setMentionDropdownOpen((open) => !open)}
                >
                  <AlternateEmailIcon fontSize="inherit" className="rds-comments-box__mention-icon" />
                </IconButton>
                {mentionDropdownOpen && (
                  <div className="rds-comments-box__mention-dropdown" ref={mentionDropdownRef}>
                    <div className="rds-comments-box__mention-search">
                      <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rds-comments-box__mention-search-input"
                      />
                    </div>
                    <div className="rds-comments-box__mention-divider" />
                    <div className="rds-comments-box__mention-user-list-scroll-hide rds-comments-box__mention-user-list">
                      {filteredUsers.map((user) => (
                        <div key={user} className="rds-comments-box__mention-user-item" onClick={() => { setTypingHeader(user); setMentionDropdownOpen(false); }}>
                          <span className="rds-comments-box__mention-user-avatar">
                            <AccountCircleIcon className="rds-comments-box__mention-user-icon" />
                          </span>
                          <span className="rds-comments-box__mention-user-name">{user}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rds-comments-box__mention-invite">
                      <button className="rds-comments-box__mention-invite-btn">
                        <MailOutlineIcon className="rds-comments-box__mention-invite-icon" /> Invite
                      </button>
                    </div>
                  </div>
                )}
                <IconButton aria-label="gif" className="rds-comments-box__gif-btn">
                  <GifIcon fontSize="inherit" className="rds-comments-box__gif-icon" />
                </IconButton>
              </Box>
              <Box className="rds-comments-box__toolbar-spacer" />
              <IconButton aria-label="send" className="rds-comments-box__send-btn">
                <SendIcon fontSize="inherit" className="rds-comments-box__send-icon" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      );

    case 'commentPosted':
      return (
        <Box className="rds-comments-box rds-comments-box--posted">
          <Box className="rds-comments-box__badge-container">
            <Avatar className="rds-comments-box__avatar">RD</Avatar>
            <span className="rds-comments-box__dot" />
          </Box>
        </Box>
      );

    case 'commentHover':
      return (
        <Box className="rds-comments-box rds-comments-box--hover relative">
          <Box className="rds-comments-box__comment-card">
            <Box className="rds-comments-box__header relative">
              <Avatar className="rds-comments-box__avatar">RD</Avatar>
              <Box className="rds-comments-box__info">
                <Typography className="rds-comments-box__name">{commentHoverName}</Typography>
                <Typography className="rds-comments-box__time">{hoverTime}</Typography>
              </Box>
              <Box className="rds-comments-box__hover-tools">
                <IconButton disableRipple disableFocusRipple className="rds-comments-box__pushpin-btn">
                  <PushPinOutlinedIcon className="rds-comments-box__pushpin-icon" />
                </IconButton>
                <span className="rds-comments-box__dropdown-trigger">
                  <IconButton className="rds-comments-box__more-btn" ref={hoverMoreBtnRef} onClick={() => setHoverDropdownOpen((open) => !open)}>
                    <MoreHorizIcon className="rds-comments-box__more-icon" />
                  </IconButton>
                  {hoverDropdownOpen && (
                    <div ref={hoverDropdownRef} className="rds-comments-box__comment-dropdown-menu">
                      <div className="rds-comments-box__comment-dropdown-item" onClick={() => { setHoverDropdownOpen(false); /* handle edit */ }}>
                        <svg className="rds-comments-box__comment-dropdown-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" {...svgEditProps}>
                          {svgEditPath ? <path d={svgEditPath} fill="#888" /> : <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" fill="#888"/>}
                        </svg>
                        <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--edit">Edit</span>
                      </div>
                      <div className="rds-comments-box__comment-dropdown-item" onClick={() => { setHoverDropdownOpen(false); /* handle delete */ }}>
                        <svg className="rds-comments-box__comment-dropdown-icon rds-comments-box__comment-dropdown-icon--delete" width="24" height="24" viewBox="0 0 24 24" fill="none" {...svgDeleteProps}>
                          {svgDeletePath ? <path d={svgDeletePath} fill="#d32f2f" /> : <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#d32f2f"/>}
                        </svg>
                        <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--delete">Delete</span>
                      </div>
                    </div>
                  )}
                </span>
              </Box>
            </Box>
            <Typography className="rds-comments-box__text">{hoverText}</Typography>
            <Typography className="rds-comments-box__meta">{hoverMeta}</Typography>
          </Box>
        </Box>
      );
    case 'commentThread':
      return (
        <Box className="rds-comments-box rds-comments-box--thread">
          <Box className="rds-comments-box__thread-header">
            <Typography className="rds-comments-box__thread-title">{threadTitle}</Typography>
            <Box className="rds-comments-box__thread-icons relative">
              <span className="rds-comments-box__dropdown-trigger">
                <IconButton className="rds-comments-box__more-btn" ref={threadMoreBtnHeaderRef} onClick={() => setThreadDropdownOpenHeader((open) => !open)}>
                  <MoreHorizIcon className="rds-comments-box__more-icon" />
                </IconButton>
                {threadDropdownOpenHeader && (
                  <div ref={threadDropdownHeaderRef} className="rds-comments-box__comment-dropdown-menu">
                    <div className="rds-comments-box__comment-dropdown-item" onClick={() => { setThreadDropdownOpenHeader(false); /* handle edit */ }}>
                      <svg className="rds-comments-box__comment-dropdown-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" {...svgEditProps}>
                        {svgEditPath && <path d={svgEditPath} fill="#888" />}
                      </svg>
                      <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--edit">Edit</span>
                    </div>
                    <div className="rds-comments-box__comment-dropdown-item" onClick={() => { setThreadDropdownOpenHeader(false); /* handle delete */ }}>
                      <svg className="rds-comments-box__comment-dropdown-icon rds-comments-box__comment-dropdown-icon--delete" width="24" height="24" viewBox="0 0 24 24" fill="none" {...svgDeleteProps}>
                        {svgDeletePath && <path d={svgDeletePath} fill="#d32f2f" />}
                      </svg>
                      <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--delete">Delete</span>
                    </div>
                  </div>
                )}
              </span>
              <IconButton disableRipple disableFocusRipple className="rds-comments-box__pushpin-btn">
                <PushPinOutlinedIcon className="rds-comments-box__pushpin-icon" />
              </IconButton>
              <IconButton className="rds-comments-box__close-btn"><CloseIcon className="rds-comments-box__close-icon" /></IconButton>
            </Box>
          </Box>
          <Divider className="rds-comments-box__thread-divider" />
          <Box className="rds-comments-box__thread-body">
            <Box className="rds-comments-box__vote">
              <ArrowUpwardIcon className="rds-comments-box__upvote-icon" />
              <Typography className="rds-comments-box__score">00</Typography>
              <ArrowDownwardIcon className="rds-comments-box__downvote-icon" />
            </Box>
            <Box className="rds-comments-box__comment-content">
              <Box className="rds-comments-box__comment-header">
                  <Avatar className="rds-comments-box__avatar rds-comments-box__avatar--thread">RD</Avatar>
                <Box className="rds-comments-box__comment-info">
                  <Typography className="rds-comments-box__name">{commentThreadName}</Typography>
                  <Typography className="rds-comments-box__time">{time}</Typography>
                </Box>
                <Box className="rds-comments-box__tools relative">
                  <IconButton disableRipple disableFocusRipple className="rds-comments-box__pushpin-btn">
                    <PushPinOutlinedIcon className="rds-comments-box__pushpin-icon" />
                  </IconButton>
                  <span className="rds-comments-box__dropdown-trigger">
                    <IconButton className="rds-comments-box__more-btn" ref={threadMoreBtnToolsRef} onClick={() => setThreadDropdownOpenTools((open) => !open)}>
                      <MoreHorizIcon className="rds-comments-box__more-icon" />
                    </IconButton>
                    {threadDropdownOpenTools && (
                      <div ref={threadDropdownToolsRef} className="rds-comments-box__comment-dropdown-menu">
                        <div className="rds-comments-box__comment-dropdown-item" onClick={() => { setThreadDropdownOpenTools(false); /* handle edit */ }}>
                          <svg className="rds-comments-box__comment-dropdown-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" {...svgEditProps}>
                            {svgEditPath && <path d={svgEditPath} fill="#888" />}
                          </svg>
                          <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--edit">Edit</span>
                        </div>
                        <div className="rds-comments-box__comment-dropdown-item" onClick={() => { setThreadDropdownOpenTools(false); /* handle delete */ }}>
                          <svg className="rds-comments-box__comment-dropdown-icon rds-comments-box__comment-dropdown-icon--delete" width="24" height="24" viewBox="0 0 24 24" fill="none" {...svgDeleteProps}>
                            {svgDeletePath && <path d={svgDeletePath} fill="#d32f2f" />}
                          </svg>
                          <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--delete">Delete</span>
                        </div>
                      </div>
                    )}
                  </span>
                </Box>
              </Box>
              <Typography className="rds-comments-box__text">{text}</Typography>
                {imgSrc ? (
                  <img src={imgSrc} alt={imgProps?.alt || "comment preview"} className="rds-comments-box__preview" {...imgProps} />
                ) : (
                  <div className="rds-comments-box__no-image">No image provided</div>
                )}
              <Typography className="rds-comments-box__meta">{meta}</Typography>
              <Link className="rds-comments-box__translate">{translate}</Link>
            </Box>
          </Box>
          <Box className="rds-comments-box__reply-box">
            <Avatar className="rds-comments-box__avatar">RD</Avatar>
            <TextField
              variant="outlined"
              placeholder="Placeholder"
              className="rds-comments-box__input"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton className="rds-comments-box__send">
                      <SendIcon fontSize="inherit" className="rds-comments-box__send-icon" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      );

    case 'default':
    default:
        return (
          <Box className="rds-comments-box rds-comments-box--default">
            <Avatar className="rds-comments-box__avatar">RD</Avatar>
          </Box>
        );
  }
};

export default RdsCommentBox;