import { useEffect, useRef, useState, type MouseEvent, type RefObject } from 'react';

function useClickOutside(
  isOpen: boolean,
  contentRef: RefObject<HTMLElement | null>,
  triggerElement: HTMLElement | null,
  onClose: () => void
) {
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerElement &&
        !triggerElement.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, contentRef, triggerElement, onClose]);
}

export function useCommentsBoxLogic(mentionUsers?: string[]) {
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<HTMLElement | null>(null);
  const [typingHeader, setTypingHeader] = useState('');
  const handleEmojiBtnClick = (event: MouseEvent<HTMLElement>) => {
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
  useClickOutside(emojiPickerOpen, emojiPickerRef, emojiAnchorEl, handleEmojiClose);

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
  useClickOutside(
    mentionDropdownOpen,
    mentionDropdownRef,
    mentionBtnRef.current,
    () => setMentionDropdownOpen(false)
  );

  const [hoverDropdownOpen, setHoverDropdownOpen] = useState(false);
  const hoverMoreBtnRef = useRef<HTMLButtonElement>(null);
  const hoverDropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(
    hoverDropdownOpen,
    hoverDropdownRef,
    hoverMoreBtnRef.current,
    () => setHoverDropdownOpen(false)
  );

  const [threadDropdownOpenHeader, setThreadDropdownOpenHeader] = useState(false);
  const threadMoreBtnHeaderRef = useRef<HTMLButtonElement>(null);
  const threadDropdownHeaderRef = useRef<HTMLDivElement>(null);
  const [threadDropdownOpenTools, setThreadDropdownOpenTools] = useState(false);
  const threadMoreBtnToolsRef = useRef<HTMLButtonElement>(null);
  const threadDropdownToolsRef = useRef<HTMLDivElement>(null);
  useClickOutside(
    threadDropdownOpenHeader,
    threadDropdownHeaderRef,
    threadMoreBtnHeaderRef.current,
    () => setThreadDropdownOpenHeader(false)
  );
  useClickOutside(
    threadDropdownOpenTools,
    threadDropdownToolsRef,
    threadMoreBtnToolsRef.current,
    () => setThreadDropdownOpenTools(false)
  );

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

