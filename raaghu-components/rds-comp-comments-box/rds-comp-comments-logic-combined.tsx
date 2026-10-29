import { useState, type ImgHTMLAttributes, type ReactNode, type Ref, type SVGProps } from 'react';
import clsx from 'clsx';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RdsAvatar from '../../raaghu-elements/rds-avatar/rds-avatar';
import RdsBox from '../../raaghu-elements/rds-box/rds-box';
import './rds-comp-comments-box.scss';

export interface RdsCommentBoxProps {
  className?: string;
  sx?: SxProps<Theme>;
  ref?: Ref<HTMLDivElement>;
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

export const RdsCommentBoxLogic = ({
  avatarInitials = 'RD',
  placeholderText,
  typingPlaceholderText,
  className,
  sx,
  ref,
}: RdsCommentBoxProps) => {
  const [draft, setDraft] = useState('');

  return (
    <RdsBox ref={ref} className={clsx('rds-comments-box rds-comments-box--composer', className)} sx={sx}>
      <RdsAvatar size="small" showName={false} showDesignation={false} className="rds-comments-box__avatar">
        {avatarInitials || 'RD'}
      </RdsAvatar>
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
                <IconButton
                  aria-label="send comment"
                  className="rds-comments-box__send-btn"
                  size="small"
                  onClick={() => setDraft('')}
                  disabled={!draft.trim()}
                  sx={{
                    padding: 'var(--rds-spacing-xs) var(--rds-spacing-sm)',
                    backgroundColor: 'var(--rds-primary-main)',
                    color: 'var(--rds-primary-contrast-text)',
                    width: 'auto',
                    height: 'var(--rds-size-lg)',
                    minWidth: 'var(--rds-comments-box-send-button-min-width)',
                    minHeight: 'var(--rds-size-lg)',
                    maxHeight: 'var(--rds-size-lg)',
                    borderRadius: 'var(--rds-border-radius-sm)',
                    boxShadow: 'none',
                    '&:hover': { backgroundColor: 'var(--rds-primary-dark)' },
                  }}
                >
                  <SendIcon aria-hidden="true" className="rds-comments-box__send-icon" sx={{ fontSize: 'var(--rds-font-size-2xs)', width: 'var(--rds-spacing-11-px)', height: 'var(--rds-spacing-11-px)' }} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </RdsBox>
  );
};

RdsCommentBoxLogic.displayName = 'RdsCommentBoxLogic';
