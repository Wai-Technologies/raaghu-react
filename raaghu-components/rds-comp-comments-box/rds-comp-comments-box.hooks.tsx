import React, { useEffect, useRef, useState } from 'react';

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

export default useCommentsBoxLogic;
