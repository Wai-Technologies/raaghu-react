import { useState, type ImgHTMLAttributes, type ReactNode, type Ref, type SVGProps } from 'react';
import clsx from 'clsx';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
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
                  disableRipple
                  onClick={() => setDraft('')}
                >
                  <span className="rds-comments-box__send-icon" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 10.75 10.75" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.25097 6.57658L10.3048 0.445201M0.762599 5.41376C0.530035 5.33628 0.375 5.10371 0.375 4.8712C0.375 4.63863 0.530035 4.40597 0.762599 4.32849L10.375 0.375011L6.42154 9.9874C6.34399 10.22 6.11141 10.375 5.8789 10.375C5.64632 10.375 5.41375 10.22 5.33627 9.9874L4.17345 6.57658L0.762599 5.41376Z" stroke="currentColor" strokeWidth="0.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
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
