import { useState, type ImgHTMLAttributes, type KeyboardEvent, type ReactNode, type Ref, type SVGProps } from 'react';
import clsx from 'clsx';
import { IconButton, InputAdornment, Link, TextField } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RdsAvatar from '../../raaghu-elements/rds-avatar/rds-avatar';
import RdsBox from '../../raaghu-elements/rds-box/rds-box';
import RdsTypography from '../../raaghu-elements/rds-typography/rds-typography';
import RdsEmojiGenerator from '../rds-comp-emoji-generator/rds-comp-emoji-generator';
import { EmojiGeneratorType } from '../rds-comp-emoji-generator/rds-comp-emoji-data';
import { useCommentsBoxLogic } from './rds-comp-comments-box.hooks';
import { DropdownMenu } from './rds-comp-comments-box-dropdown';
import './rds-comp-comments-box.scss';

export type RdsCommentBoxState =
  | 'default'
  | 'selected'
  | 'typing'
  | 'comment Posted'
  | 'comment Hover'
  | 'comment Thread';

export interface RdsCommentBoxProps {
  className?: string;
  sx?: SxProps<Theme>;
  ref?: Ref<HTMLDivElement>;
  /** Renders a fixed visual state. When omitted, renders the interactive comment composer. */
  state?: RdsCommentBoxState;
  svgEditPath?: string;
  svgDeletePath?: string;
  imgSrc?: string;
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
  svgEditProps?: SVGProps<SVGSVGElement>;
  svgDeleteProps?: SVGProps<SVGSVGElement>;
  editIcon?: ReactNode;
  deleteIcon?: ReactNode;
  editLabel?: string;
  deleteLabel?: string;
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
  avatarInitials?: string;
  yourLogo?: string;
  placeholderText?: string;
  typingPlaceholderText?: string;
  attachmentLabels?: { computer?: string; googleDrive?: string; oneDrive?: string };
  mentionInviteLabel?: string;
  mentionSearchPlaceholder?: string;
  mentionUsers?: string[];
  noImageText?: string;
  score?: string;
}

const SendButton = ({ label = 'send', size, onClick }: { label?: string; size?: 'small'; onClick?: () => void }) => (
  <IconButton aria-label={label} className="rds-comments-box__send-btn" size={size} disableRipple onClick={onClick}>
    <span className="rds-comments-box__send-icon" aria-hidden="true">
      <svg width="11" height="11" viewBox="0 0 10.75 10.75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.25097 6.57658L10.3048 0.445201M0.762599 5.41376C0.530035 5.33628 0.375 5.10371 0.375 4.8712C0.375 4.63863 0.530035 4.40597 0.762599 4.32849L10.375 0.375011L6.42154 9.9874C6.34399 10.22 6.11141 10.375 5.8789 10.375C5.64632 10.375 5.41375 10.22 5.33627 9.9874L4.17345 6.57658L0.762599 5.41376Z" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  </IconButton>
);

const onActivateKey = (close: () => void) => (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    close();
  }
};

const CommentActionsMenu = ({
  menuRef,
  onClose,
  editIcon,
  deleteIcon,
  editLabel,
  deleteLabel,
}: {
  menuRef: Ref<HTMLDivElement>;
  onClose: () => void;
  editIcon?: ReactNode;
  deleteIcon?: ReactNode;
  editLabel?: string;
  deleteLabel?: string;
}) => (
  <div ref={menuRef} className="rds-comments-box__comment-dropdown-menu">
    <button type="button" className="rds-comments-box__comment-dropdown-item" onClick={onClose} onKeyDown={onActivateKey(onClose)}>
      {editIcon ? (
        <span className="rds-comments-box__comment-dropdown-icon">{editIcon}</span>
      ) : (
        <EditIcon className="rds-comments-box__comment-dropdown-icon" style={{ color: 'var(--rds-text-disabled)' }} />
      )}
      <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--edit">{editLabel || 'Edit'}</span>
    </button>
    <button type="button" className="rds-comments-box__comment-dropdown-item" onClick={onClose} onKeyDown={onActivateKey(onClose)}>
      {deleteIcon ? (
        <span className="rds-comments-box__comment-dropdown-icon rds-comments-box__comment-dropdown-icon--delete">{deleteIcon}</span>
      ) : (
        <DeleteIcon className="rds-comments-box__comment-dropdown-icon rds-comments-box__comment-dropdown-icon--delete" style={{ color: 'var(--rds-error-main)' }} />
      )}
      <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--delete">{deleteLabel || 'Delete'}</span>
    </button>
  </div>
);

const Avatar = ({ initials, className }: { initials?: string; className?: string }) => (
  <RdsAvatar size="small" showName={false} showDesignation={false} className={clsx('rds-comments-box__avatar', className)}>
    {initials || 'RD'}
  </RdsAvatar>
);

export const RdsCommentBoxLogic = (props: RdsCommentBoxProps) => {
  const { state, avatarInitials = 'RD', placeholderText, typingPlaceholderText, className, sx, ref } = props;
  const [draft, setDraft] = useState('');
  const logic = useCommentsBoxLogic(props.mentionUsers);
  const root = (modifier: string, extra?: string) => ({
    ref,
    sx,
    className: clsx('rds-comments-box', `rds-comments-box--${modifier}`, extra, className),
  });
  const menuProps = {
    editIcon: props.editIcon,
    deleteIcon: props.deleteIcon,
    editLabel: props.editLabel,
    deleteLabel: props.deleteLabel,
  };

  switch (state) {
    case 'default':
      return (
        <RdsBox {...root('default')}>
          <Avatar initials={avatarInitials} />
        </RdsBox>
      );
    case 'selected':
      return (
        <RdsBox {...root('selected')}>
          <Avatar initials={avatarInitials} />
          <TextField
            variant="outlined"
            placeholder={placeholderText || 'Placeholder'}
            className="rds-comments-box__input"
            slotProps={{ input: { endAdornment: <InputAdornment position="end"><SendButton /></InputAdornment> } }}
          />
        </RdsBox>
      );
    case 'typing':
      return (
        <RdsBox {...root('typing', 'relative')}>
          <Avatar initials={avatarInitials} />
          <RdsBox className="rds-comments-box__typing-box">
            <RdsBox className="rds-comments-box__typing-header">
              <TextField
                className="rds-comments-box__typing-placeholder"
                variant="standard"
                placeholder={typingPlaceholderText || 'Placeholder'}
                value={logic.typingHeader}
                onChange={(e) => logic.setTypingHeader(e.target.value)}
                slotProps={{ input: { disableUnderline: true } }}
                fullWidth
              />
            </RdsBox>
            <RdsBox className="rds-comments-box__typing-toolbar">
              <RdsBox className="rds-comments-box__toolbar-icons">
                <span className="rds-comments-box__emoji-trigger">
                  <IconButton aria-label="emoji" className="rds-comments-box__emoji-btn" onClick={logic.handleEmojiBtnClick} disableRipple>
                    <span className="rds-comments-box__emoji-icon" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.45385 7.42308C3.91539 9.08462 5.76154 10.1 7.42308 9.63846C8.43846 9.26923 9.26923 8.43846 9.54616 7.42308M12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5ZM4.46923 5.02308C4.36727 5.02308 4.28462 4.94042 4.28462 4.83846C4.28462 4.7365 4.36727 4.65385 4.46923 4.65385C4.57119 4.65385 4.65386 4.7365 4.65386 4.83846C4.65386 4.94042 4.57119 5.02308 4.46923 5.02308ZM8.53077 5.02308C8.42881 5.02308 8.34615 4.94042 8.34615 4.83846C8.34615 4.7365 8.42881 4.65385 8.53077 4.65385C8.63273 4.65385 8.71539 4.7365 8.71539 4.83846C8.71539 4.94042 8.63273 5.02308 8.53077 5.02308Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </IconButton>
                </span>
                <span className="rds-comments-box__dropdown-trigger">
                  <IconButton
                    aria-label="attach file"
                    className="rds-comments-box__attach-btn"
                    ref={logic.attachBtnRef}
                    onClick={() => logic.setTypingDropdownOpen((open: boolean) => !open)}
                    disableRipple
                  >
                    <span className="rds-comments-box__attach-icon" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 6.30177L6.54859 11.8171C6.31767 12.0333 6.04217 12.2051 5.73819 12.3224C5.4342 12.4396 5.10784 12.5 4.77816 12.5C4.44849 12.5 4.12213 12.4396 3.81814 12.3224C3.51416 12.2051 3.23866 12.0333 3.00774 11.8171L1.22732 10.1533C0.761237 9.71826 0.5 9.13222 0.5 8.52169C0.5 7.91116 0.761237 7.32512 1.22732 6.89007L7.56883 1.04381C7.7548 0.871495 7.97605 0.734725 8.21983 0.641389C8.46361 0.548054 8.72508 0.5 8.98917 0.5C9.25325 0.5 9.51473 0.548054 9.7585 0.641389C10.0023 0.734725 10.2235 0.871495 10.4095 1.04381L11.1197 1.69646C11.3072 1.86737 11.456 2.0707 11.5576 2.29473C11.6591 2.51876 11.7114 2.75906 11.7114 3.00175C11.7114 3.24445 11.6591 3.48475 11.5576 3.70878C11.456 3.93281 11.3072 4.13614 11.1197 4.30705L5.49834 9.49147C5.40535 9.57763 5.29472 9.64601 5.17284 9.69268C5.05095 9.73935 4.92021 9.76337 4.78817 9.76337C4.65612 9.76337 4.52539 9.73935 4.4035 9.69268C4.28161 9.64601 4.17098 9.57763 4.078 9.49147L3.72792 9.16055C3.63416 9.0751 3.55975 8.97343 3.50897 8.86141C3.45819 8.7494 3.43205 8.62925 3.43205 8.5079C3.43205 8.38655 3.45819 8.2664 3.50897 8.15439C3.55975 8.04237 3.63416 7.94071 3.72792 7.85525L7.49881 4.41736" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </IconButton>
                </span>
                <span className="rds-comments-box__mention-trigger">
                  <IconButton
                    aria-label="mention"
                    className="rds-comments-box__mention-btn"
                    ref={logic.mentionBtnRef}
                    onClick={() => logic.setMentionDropdownOpen((open: boolean) => !open)}
                    disableRipple
                  >
                    <span className="rds-comments-box__mention-label">@</span>
                  </IconButton>
                </span>
                <IconButton aria-label="gif" className="rds-comments-box__gif-btn" disableRipple>
                  <span className="rds-comments-box__gif-label">GIF</span>
                </IconButton>
              </RdsBox>
              <RdsBox className="rds-comments-box__toolbar-spacer" />
              <SendButton />
            </RdsBox>
            {logic.emojiPickerOpen && (
              <RdsBox ref={logic.emojiPickerRef} className="rds-comments-box__emoji-dropdown">
                <RdsEmojiGenerator
                  type={EmojiGeneratorType.Default}
                  onChange={(_event, emoji) => logic.handleEmojiSelect(emoji)}
                  maxEmojis={60}
                />
              </RdsBox>
            )}
            <DropdownMenu
              visible={logic.typingDropdownOpen}
              anchorRef={logic.attachBtnRef}
              onClose={() => logic.setTypingDropdownOpen(false)}
              onSelect={(label) => logic.setTypingHeader(label)}
              labels={props.attachmentLabels}
            />
            {logic.mentionDropdownOpen && (
              <div className="rds-comments-box__mention-dropdown" ref={logic.mentionDropdownRef}>
                <div className="rds-comments-box__mention-search">
                  <input
                    type="text"
                    placeholder={props.mentionSearchPlaceholder || 'Search'}
                    value={logic.search}
                    onChange={(e) => logic.setSearch(e.target.value)}
                    className="rds-comments-box__mention-search-input"
                    aria-label={props.mentionSearchPlaceholder || 'Search mentions'}
                  />
                </div>
                <div className="rds-comments-box__mention-divider" />
                <div className="rds-comments-box__mention-user-list-scroll-hide rds-comments-box__mention-user-list">
                  {logic.filteredUsers.map((user: string) => {
                    const pick = () => {
                      logic.setTypingHeader(user);
                      logic.setMentionDropdownOpen(false);
                    };
                    return (
                      <button type="button" key={user} className="rds-comments-box__mention-user-item" onClick={pick} onKeyDown={onActivateKey(pick)}>
                        <span className="rds-comments-box__mention-user-avatar">
                          <AccountCircleIcon className="rds-comments-box__mention-user-icon" />
                        </span>
                        <span className="rds-comments-box__mention-user-name">{user}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="rds-comments-box__mention-invite">
                  <button type="button" className="rds-comments-box__mention-invite-btn">
                    <MailOutlineIcon className="rds-comments-box__mention-invite-icon" /> {props.mentionInviteLabel || 'Invite'}
                  </button>
                </div>
              </div>
            )}
          </RdsBox>
        </RdsBox>
      );
    case 'comment Posted':
      return (
        <RdsBox {...root('posted')}>
          <RdsBox className="rds-comments-box__badge-container">
            <Avatar initials={avatarInitials} />
            <span className="rds-comments-box__dot" aria-label="unread" />
          </RdsBox>
        </RdsBox>
      );
    case 'comment Hover':
      return (
        <RdsBox {...root('hover', 'relative')}>
          <RdsBox className="rds-comments-box__comment-card">
            <RdsBox className="rds-comments-box__header relative">
              <Avatar initials={avatarInitials} />
              <RdsBox className="rds-comments-box__info">
                <RdsTypography className="rds-comments-box__name">{props.commentHoverName}</RdsTypography>
                <RdsTypography className="rds-comments-box__time">{props.hoverTime}</RdsTypography>
              </RdsBox>
              <RdsBox className="rds-comments-box__hover-tools">
                <IconButton aria-label="Pin comment" disableRipple disableFocusRipple className="rds-comments-box__pushpin-btn">
                  <PushPinOutlinedIcon className="rds-comments-box__pushpin-icon" />
                </IconButton>
                <span className="rds-comments-box__dropdown-trigger">
                  <IconButton aria-label="More options" className="rds-comments-box__more-btn" ref={logic.hoverMoreBtnRef} onClick={() => logic.setHoverDropdownOpen((open: boolean) => !open)}>
                    <MoreHorizIcon className="rds-comments-box__more-icon" />
                  </IconButton>
                  {logic.hoverDropdownOpen && (
                    <CommentActionsMenu menuRef={logic.hoverDropdownRef} onClose={() => logic.setHoverDropdownOpen(false)} {...menuProps} />
                  )}
                </span>
              </RdsBox>
            </RdsBox>
            <RdsTypography className="rds-comments-box__text">{props.hoverText}</RdsTypography>
            <RdsTypography className="rds-comments-box__meta">{props.hoverMeta}</RdsTypography>
          </RdsBox>
        </RdsBox>
      );
    case 'comment Thread':
      return (
        <RdsBox {...root('thread')}>
          <RdsBox className="rds-comments-box__thread-header">
            <RdsTypography className="rds-comments-box__thread-title">{props.threadTitle}</RdsTypography>
            <RdsBox className="rds-comments-box__thread-icons relative">
              <span className="rds-comments-box__dropdown-trigger">
                <IconButton aria-label="More options" className="rds-comments-box__more-btn" ref={logic.threadMoreBtnHeaderRef} onClick={() => logic.setThreadDropdownOpenHeader((open: boolean) => !open)}>
                  <MoreHorizIcon className="rds-comments-box__more-icon" />
                </IconButton>
                {logic.threadDropdownOpenHeader && (
                  <CommentActionsMenu menuRef={logic.threadDropdownHeaderRef} onClose={() => logic.setThreadDropdownOpenHeader(false)} {...menuProps} />
                )}
              </span>
              <IconButton aria-label="Pin thread" disableRipple disableFocusRipple className="rds-comments-box__pushpin-btn">
                <PushPinOutlinedIcon className="rds-comments-box__pushpin-icon" />
              </IconButton>
              <IconButton aria-label="Close" className="rds-comments-box__close-btn">
                <CloseIcon className="rds-comments-box__close-icon" />
              </IconButton>
            </RdsBox>
          </RdsBox>
          <div className="rds-comments-box__thread-divider" role="separator" />
          <RdsBox className="rds-comments-box__thread-body">
            <RdsBox className="rds-comments-box__vote">
              <ArrowUpwardIcon className="rds-comments-box__upvote-icon" />
              <div className="rds-comments-box__score-border">
                <RdsTypography className="rds-comments-box__score">{props.score ? props.score.padStart(2, '0') : '00'}</RdsTypography>
              </div>
              <ArrowDownwardIcon className="rds-comments-box__downvote-icon" />
            </RdsBox>
            <RdsBox className="rds-comments-box__comment-content">
              <RdsBox className="rds-comments-box__comment-header">
                <Avatar initials={avatarInitials} className="rds-comments-box__avatar--thread" />
                <RdsBox className="rds-comments-box__comment-info">
                  <RdsTypography className="rds-comments-box__name">{props.commentThreadName}</RdsTypography>
                  <RdsTypography className="rds-comments-box__time">{props.time}</RdsTypography>
                </RdsBox>
                <RdsBox className="rds-comments-box__tools relative">
                  <IconButton aria-label="Pin comment" disableRipple disableFocusRipple className="rds-comments-box__pushpin-btn">
                    <PushPinOutlinedIcon className="rds-comments-box__pushpin-icon" />
                  </IconButton>
                  <span className="rds-comments-box__dropdown-trigger">
                    <IconButton aria-label="More options" className="rds-comments-box__more-btn" ref={logic.threadMoreBtnToolsRef} onClick={() => logic.setThreadDropdownOpenTools((open: boolean) => !open)}>
                      <MoreHorizIcon className="rds-comments-box__more-icon" />
                    </IconButton>
                    {logic.threadDropdownOpenTools && (
                      <CommentActionsMenu menuRef={logic.threadDropdownToolsRef} onClose={() => logic.setThreadDropdownOpenTools(false)} {...menuProps} />
                    )}
                  </span>
                </RdsBox>
              </RdsBox>
              <RdsTypography className="rds-comments-box__text">{props.text}</RdsTypography>
              {props.imgSrc ? (
                <img src={props.imgSrc} alt={props.imgProps?.alt || 'comment preview'} className="rds-comments-box__preview" {...props.imgProps} />
              ) : (
                <div className="rds-comments-box__no-image">{props.noImageText || 'No image provided'}</div>
              )}
              <RdsTypography className="rds-comments-box__meta">{props.meta}</RdsTypography>
              <Link className="rds-comments-box__translate">{props.translate}</Link>
            </RdsBox>
          </RdsBox>
          <RdsBox className="rds-comments-box__reply-box">
            <RdsAvatar size="small" showName={false} showDesignation={false} className="rds-comments-box__avatar" src={props.yourLogo} />
            <TextField
              variant="outlined"
              placeholder={placeholderText || 'Placeholder'}
              className="rds-comments-box__input"
              slotProps={{ input: { endAdornment: <InputAdornment position="end"><SendButton /></InputAdornment> } }}
            />
          </RdsBox>
        </RdsBox>
      );
    default:
      return (
        <RdsBox {...root('composer')}>
          <Avatar initials={avatarInitials} />
          <TextField
            variant="outlined"
            size="small"
            placeholder={typingPlaceholderText ?? placeholderText ?? 'Add a comment'}
            className="rds-comments-box__input rds-input--compact"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SendButton label="send comment" size="small" onClick={() => setDraft('')} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </RdsBox>
      );
  }
};

RdsCommentBoxLogic.displayName = 'RdsCommentBoxLogic';
