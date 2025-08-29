
import React, { useEffect, useRef, useState } from 'react';
import { RdsAvatar, RdsBox } from '../../raaghu-elements';
import './rds-comp-comments-box.scss';
import ComputerIcon from '@mui/icons-material/Computer';
import CloudIcon from '@mui/icons-material/Cloud';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { RdsCommentBoxLogic, RdsCommentBoxProps } from './rds-comp-comments-logic-combined';

export function useCommentsBoxLogic(mentionUsers?: string[]) {
  const emojiPickerRef = useRef<HTMLDivElement>(null);
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

  const [typingDropdownOpen, setTypingDropdownOpen] = useState(false);
  const attachBtnRef = useRef<HTMLButtonElement>(null);

  const [mentionDropdownOpen, setMentionDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const mentionBtnRef = useRef<HTMLButtonElement>(null);
  const mentionDropdownRef = useRef<HTMLDivElement>(null);
  const users = mentionUsers || [];
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

  return {
    emojiPickerRef,
    emojiPickerOpen,
    emojiAnchorEl,
    typingHeader,
    setTypingHeader,
    handleEmojiBtnClick,
    handleEmojiClose,
    handleEmojiSelect,
    typingDropdownOpen,
    setTypingDropdownOpen,
    attachBtnRef,
    mentionDropdownOpen,
    setMentionDropdownOpen,
    search,
    setSearch,
    mentionBtnRef,
    mentionDropdownRef,
    filteredUsers,
    hoverDropdownOpen,
    setHoverDropdownOpen,
    hoverMoreBtnRef,
    hoverDropdownRef,
    threadDropdownOpenHeader,
    setThreadDropdownOpenHeader,
    threadMoreBtnHeaderRef,
    threadDropdownHeaderRef,
    threadDropdownOpenTools,
    setThreadDropdownOpenTools,
    threadMoreBtnToolsRef,
    threadDropdownToolsRef,
  };
}

interface DropdownMenuProps {
  visible: boolean;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onSelect: (label: string) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps & { labels?: { computer?: string; googleDrive?: string; oneDrive?: string } }> = ({ visible, anchorRef, onClose, onSelect, labels }) => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
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
      <div className="rds-comments-box__attachment-dropdown-item" onClick={() => { onSelect(labels?.computer || 'Computer'); onClose(); }}>
        <ComputerIcon className="rds-comments-box__attachment-dropdown-icon" />
        <span className="rds-comments-box__attachment-dropdown-label">{labels?.computer || 'Computer'}</span>
      </div>
      <div className="rds-comments-box__attachment-dropdown-item" onClick={() => { onSelect(labels?.googleDrive || 'Google Drive'); onClose(); }}>
        <InsertDriveFileIcon className="rds-comments-box__attachment-dropdown-icon" />
        <span className="rds-comments-box__attachment-dropdown-label">{labels?.googleDrive || 'Google Drive'}</span>
      </div>
      <div className="rds-comments-box__attachment-dropdown-item" onClick={() => { onSelect(labels?.oneDrive || 'One Drive'); onClose(); }}>
        <CloudIcon className="rds-comments-box__attachment-dropdown-icon" />
        <span className="rds-comments-box__attachment-dropdown-label">{labels?.oneDrive || 'One Drive'}</span>
      </div>
    </div>
  );
};

const RdsCommentBox: React.FC<RdsCommentBoxProps> = (props) => {
  if (props.state === 'default' || !props.state) {
    return (
      <RdsBox className="rds-comments-box rds-comments-box--default">
        <RdsAvatar className="rds-comments-box__avatar">{props.avatarInitials || 'RD'}</RdsAvatar>
      </RdsBox>
    );
  }
  return <RdsCommentBoxLogic {...props} />;
};

export default RdsCommentBox;