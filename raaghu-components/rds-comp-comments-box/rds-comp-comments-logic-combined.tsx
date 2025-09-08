import React, { useState, useRef, useEffect } from 'react';
import { RdsAvatar, RdsBox, RdsTypography } from '../../raaghu-elements';
import RdsEmojiGenerator, { EmojiGeneratorType } from '../rds-comp-emoji-generator/rds-comp-emoji-generator';
import { Divider, IconButton, InputAdornment, TextField, Link,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GifIcon from '@mui/icons-material/Gif';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './rds-comp-comments-box.scss';
import { useCommentsBoxLogic, DropdownMenu } from './rds-comp-comments-box';

// Logic moved to rds-comp-comments-box.tsx


export interface RdsCommentBoxProps {
  svgEditPath?: string;
  svgDeletePath?: string;
  imgSrc?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  svgEditProps?: React.SVGProps<SVGSVGElement>;
  svgDeleteProps?: React.SVGProps<SVGSVGElement>;
  /** Custom React node for Edit icon in dropdown */
  editIcon?: React.ReactNode;
  /** Custom React node for Delete icon in dropdown */
  deleteIcon?: React.ReactNode;
  /** Custom label for Edit action */
  editLabel?: string;
  /** Custom label for Delete action */
  deleteLabel?: string;
  state:
    | 'default'
    | 'selected'
    | 'typing'
    | 'comment Posted'
    | 'comment Hover'
    | 'comment Thread';
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

// DropdownMenu moved to rds-comp-comments-box.tsx

export const RdsCommentBoxLogic: React.FC<RdsCommentBoxProps> = (props) => {
  const { state, avatarInitials = 'RD' } = props;
  const logic = useCommentsBoxLogic(props.mentionUsers);
  switch (state) {
    case 'selected':
      return (
        <RdsBox className="rds-comments-box rds-comments-box--selected">
          <RdsAvatar className="rds-comments-box__avatar">{avatarInitials || 'RD'}</RdsAvatar>
          <TextField
            variant="outlined"
            placeholder={props.placeholderText || 'Placeholder'}
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
        </RdsBox>
      );
    case 'typing':
      return (
        <RdsBox className="rds-comments-box rds-comments-box--typing relative">
          <RdsAvatar className="rds-comments-box__avatar">{avatarInitials || 'RD'}</RdsAvatar>
          <RdsBox className="rds-comments-box__typing-box">
            <RdsBox className="rds-comments-box__typing-header">
              <TextField
                className="rds-comments-box__typing-placeholder"
                variant="standard"
                placeholder={props.typingPlaceholderText || 'Placeholder...'}
                value={logic.typingHeader}
                onChange={e => logic.setTypingHeader(e.target.value)}
                InputProps={{ disableUnderline: true }}
                fullWidth
              />
            </RdsBox>
            <RdsBox className="rds-comments-box__typing-toolbar relative">
              <RdsBox className="rds-comments-box__toolbar-icons">
                <span className="rds-comments-box__emoji-trigger">
                  <IconButton aria-label="emoji" className="rds-comments-box__emoji-btn" onClick={logic.handleEmojiBtnClick}>
                    <InsertEmoticonIcon fontSize="inherit" className="rds-comments-box__emoji-icon" />
                  </IconButton>
                  {logic.emojiPickerOpen && (
                    <RdsBox
                      ref={logic.emojiPickerRef}
                      className="rds-comments-box__emoji-dropdown"
                    >
                      <RdsEmojiGenerator
                        Type={EmojiGeneratorType.Default}
                        onEmojiSelect={logic.handleEmojiSelect}
                        maxEmojis={60}
                        sx={{ minWidth: 320 }}
                      />
                    </RdsBox>
                  )}
                </span>
                <span className="rds-comments-box__dropdown-trigger">
                  <IconButton
                    aria-label="attach file"
                    className="rds-comments-box__attach-btn"
                    ref={logic.attachBtnRef}
                    onClick={() => logic.setTypingDropdownOpen((open: boolean) => !open)}
                  >
                    <AttachmentOutlinedIcon fontSize="inherit" className="rds-comments-box__attach-icon" />
                  </IconButton>
                  <DropdownMenu
                    visible={logic.typingDropdownOpen}
                    anchorRef={logic.attachBtnRef}
                    onClose={() => logic.setTypingDropdownOpen(false)}
                    onSelect={(label) => logic.setTypingHeader(label)}
                    labels={props.attachmentLabels}
                  />
                </span>
                <IconButton
                  aria-label="mention"
                  className="rds-comments-box__mention-btn"
                  ref={logic.mentionBtnRef}
                  onClick={() => logic.setMentionDropdownOpen((open: boolean) => !open)}
                >
                  <AlternateEmailIcon fontSize="inherit" className="rds-comments-box__mention-icon" />
                </IconButton>
                {logic.mentionDropdownOpen && (
                  <div className="rds-comments-box__mention-dropdown" ref={logic.mentionDropdownRef}>
                    <div className="rds-comments-box__mention-search">
                      <input
                        type="text"
                        placeholder={props.mentionSearchPlaceholder || 'Search'}
                        value={logic.search}
                        onChange={(e) => logic.setSearch(e.target.value)}
                        className="rds-comments-box__mention-search-input"
                      />
                    </div>
                    <div className="rds-comments-box__mention-divider" />
                    <div className="rds-comments-box__mention-user-list-scroll-hide rds-comments-box__mention-user-list">
                      {logic.filteredUsers.map((user: string) => (
                        <div key={user} className="rds-comments-box__mention-user-item" onClick={() => { logic.setTypingHeader(user); logic.setMentionDropdownOpen(false); }}>
                          <span className="rds-comments-box__mention-user-avatar">
                            <AccountCircleIcon className="rds-comments-box__mention-user-icon" />
                          </span>
                          <span className="rds-comments-box__mention-user-name">{user}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rds-comments-box__mention-invite">
                      <button className="rds-comments-box__mention-invite-btn">
                        <MailOutlineIcon className="rds-comments-box__mention-invite-icon" /> {props.mentionInviteLabel || 'Invite'}
                      </button>
                    </div>
                  </div>
                )}
                <IconButton aria-label="gif" className="rds-comments-box__gif-btn">
                  <GifIcon fontSize="inherit" className="rds-comments-box__gif-icon" />
                </IconButton>
              </RdsBox>
              <RdsBox className="rds-comments-box__toolbar-spacer" />
              <IconButton aria-label="send" className="rds-comments-box__send-btn">
                <SendIcon fontSize="inherit" className="rds-comments-box__send-icon" />
              </IconButton>
            </RdsBox>
          </RdsBox>
        </RdsBox>
      );
    case 'comment Posted':
      return (
        <RdsBox className="rds-comments-box rds-comments-box--posted">
          <RdsBox className="rds-comments-box__badge-container">
            <RdsAvatar className="rds-comments-box__avatar">{avatarInitials || 'RD'}</RdsAvatar>
            <span className="rds-comments-box__dot" />
          </RdsBox>
        </RdsBox>
      );
    case 'comment Hover':
      return (
        <RdsBox className="rds-comments-box rds-comments-box--hover relative">
          <RdsBox className="rds-comments-box__comment-card">
            <RdsBox className="rds-comments-box__header relative">
              <RdsAvatar className="rds-comments-box__avatar">{avatarInitials || 'RD'}</RdsAvatar>
              <RdsBox className="rds-comments-box__info">
                <RdsTypography className="rds-comments-box__name">{props.commentHoverName}</RdsTypography>
                <RdsTypography className="rds-comments-box__time">{props.hoverTime}</RdsTypography>
              </RdsBox>
              <RdsBox className="rds-comments-box__hover-tools">
                <IconButton disableRipple disableFocusRipple className="rds-comments-box__pushpin-btn">
                  <PushPinOutlinedIcon className="rds-comments-box__pushpin-icon" />
                </IconButton>
                <span className="rds-comments-box__dropdown-trigger">
                  <IconButton className="rds-comments-box__more-btn" ref={logic.hoverMoreBtnRef} onClick={() => logic.setHoverDropdownOpen((open: boolean) => !open)}>
                    <MoreHorizIcon className="rds-comments-box__more-icon" />
                  </IconButton>
                  {logic.hoverDropdownOpen && (
                    <div ref={logic.hoverDropdownRef} className="rds-comments-box__comment-dropdown-menu">
                      <div className="rds-comments-box__comment-dropdown-item" onClick={() => { logic.setHoverDropdownOpen(false); /* handle edit */ }}>
                        {props.editIcon ? (
                          <span className="rds-comments-box__comment-dropdown-icon">{props.editIcon}</span>
                        ) : (
                          <EditIcon className="rds-comments-box__comment-dropdown-icon" style={{ color: '#888' }} />
                        )}
                        <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--edit">{props.editLabel || 'Edit'}</span>
                      </div>
                      <div className="rds-comments-box__comment-dropdown-item" onClick={() => { logic.setHoverDropdownOpen(false); /* handle delete */ }}>
                        {props.deleteIcon ? (
                          <span className="rds-comments-box__comment-dropdown-icon rds-comments-box__comment-dropdown-icon--delete">{props.deleteIcon}</span>
                        ) : (
                          <DeleteIcon className="rds-comments-box__comment-dropdown-icon rds-comments-box__comment-dropdown-icon--delete" style={{ color: '#d32f2f' }} />
                        )}
                        <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--delete">{props.deleteLabel || 'Delete'}</span>
                      </div>
                    </div>
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
        <RdsBox className="rds-comments-box rds-comments-box--thread">
          <RdsBox className="rds-comments-box__thread-header">
            <RdsTypography className="rds-comments-box__thread-title">{props.threadTitle}</RdsTypography>
            <RdsBox className="rds-comments-box__thread-icons relative">
              <span className="rds-comments-box__dropdown-trigger">
                <IconButton className="rds-comments-box__more-btn" ref={logic.threadMoreBtnHeaderRef} onClick={() => logic.setThreadDropdownOpenHeader((open: boolean) => !open)}>
                  <MoreHorizIcon className="rds-comments-box__more-icon" />
                </IconButton>
                {logic.threadDropdownOpenHeader && (
                  <div ref={logic.threadDropdownHeaderRef} className="rds-comments-box__comment-dropdown-menu">
                    <div className="rds-comments-box__comment-dropdown-item" onClick={() => { logic.setThreadDropdownOpenHeader(false); /* handle edit */ }}>
                      {props.editIcon ? (
                        <span className="rds-comments-box__comment-dropdown-icon">{props.editIcon}</span>
                      ) : (
                        <EditIcon className="rds-comments-box__comment-dropdown-icon" style={{ color: '#888' }} />
                      )}
                      <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--edit">{props.editLabel || 'Edit'}</span>
                    </div>
                    <div className="rds-comments-box__comment-dropdown-item" onClick={() => { logic.setThreadDropdownOpenHeader(false); /* handle delete */ }}>
                      {props.deleteIcon ? (
                        <span className="rds-comments-box__comment-dropdown-icon rds-comments-box__comment-dropdown-icon--delete">{props.deleteIcon}</span>
                      ) : (
                        <DeleteIcon className="rds-comments-box__comment-dropdown-icon rds-comments-box__comment-dropdown-icon--delete" style={{ color: '#d32f2f' }} />
                      )}
                      <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--delete">{props.deleteLabel || 'Delete'}</span>
                    </div>
                  </div>
                )}
              </span>
              <IconButton disableRipple disableFocusRipple className="rds-comments-box__pushpin-btn">
                <PushPinOutlinedIcon className="rds-comments-box__pushpin-icon" />
              </IconButton>
              <IconButton className="rds-comments-box__close-btn"><CloseIcon className="rds-comments-box__close-icon" /></IconButton>
            </RdsBox>
          </RdsBox>
          <Divider className="rds-comments-box__thread-divider" />
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
                  <RdsAvatar className="rds-comments-box__avatar rds-comments-box__avatar--thread">{avatarInitials || 'RD'}</RdsAvatar>
                <RdsBox className="rds-comments-box__comment-info">
                  <RdsTypography className="rds-comments-box__name">{props.commentThreadName}</RdsTypography>
                  <RdsTypography className="rds-comments-box__time">{props.time}</RdsTypography>
                </RdsBox>
                <RdsBox className="rds-comments-box__tools relative">
                  <IconButton disableRipple disableFocusRipple className="rds-comments-box__pushpin-btn">
                    <PushPinOutlinedIcon className="rds-comments-box__pushpin-icon" />
                  </IconButton>
                  <span className="rds-comments-box__dropdown-trigger">
                    <IconButton className="rds-comments-box__more-btn" ref={logic.threadMoreBtnToolsRef} onClick={() => logic.setThreadDropdownOpenTools((open: boolean) => !open)}>
                      <MoreHorizIcon className="rds-comments-box__more-icon" />
                    </IconButton>
                    {logic.threadDropdownOpenTools && ( 
                      <div ref={logic.threadDropdownToolsRef} className="rds-comments-box__comment-dropdown-menu">
                        <div className="rds-comments-box__comment-dropdown-item" onClick={() => { logic.setThreadDropdownOpenTools(false); /* handle edit */ }}>
                          {props.editIcon ? (
                            <span className="rds-comments-box__comment-dropdown-icon">{props.editIcon}</span>
                          ) : (
                            <EditIcon className="rds-comments-box__comment-dropdown-icon" style={{ color: '#888' }} />
                          )}
                          <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--edit">{props.editLabel || 'Edit'}</span>
                        </div>
                        <div className="rds-comments-box__comment-dropdown-item" onClick={() => { logic.setThreadDropdownOpenTools(false); /* handle delete */ }}>
                          {props.deleteIcon ? (
                            <span className="rds-comments-box__comment-dropdown-icon rds-comments-box__comment-dropdown-icon--delete">{props.deleteIcon}</span>
                          ) : (
                            <DeleteIcon className="rds-comments-box__comment-dropdown-icon rds-comments-box__comment-dropdown-icon--delete" style={{ color: '#d32f2f' }} />
                          )}
                          <span className="rds-comments-box__comment-dropdown-label rds-comments-box__comment-dropdown-label--delete">{props.deleteLabel || 'Delete'}</span>
                        </div>
                      </div>
                    )}
                  </span>
                </RdsBox>
              </RdsBox>
              <RdsTypography className="rds-comments-box__text">{props.text}</RdsTypography>
                {props.imgSrc ? (
                  <img src={props.imgSrc} alt={props.imgProps?.alt || "comment preview"} className="rds-comments-box__preview" {...props.imgProps} />
                ) : (
                  <div className="rds-comments-box__no-image">{props.noImageText || 'No image provided'}</div>
                )}
              <RdsTypography className="rds-comments-box__meta">{props.meta}</RdsTypography>
              <Link className="rds-comments-box__translate">{props.translate}</Link>
            </RdsBox>
          </RdsBox>
          <RdsBox className="rds-comments-box__reply-box">
            {/* <RdsAvatar className="rds-comments-box__avatar">{props.yourLogo || 'RD'}</RdsAvatar> */}
            <RdsAvatar className="rds-comments-box__avatar" src={props.yourLogo} />
            <TextField
              variant="outlined"
              placeholder={props.placeholderText || 'Placeholder'}
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
          </RdsBox>
        </RdsBox>
      );
    default:
      return null;
  }
};
