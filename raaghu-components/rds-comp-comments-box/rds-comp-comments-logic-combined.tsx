import React from 'react';
import { useCommentsBoxLogic } from './rds-comp-comments-box';
import {
  SelectedCommentView,
  TypingCommentView,
  PostedCommentView,
  HoverCommentView,
  ThreadCommentView,
} from './rds-comp-comments-views';

export interface RdsCommentBoxProps {
  svgEditPath?: string;
  svgDeletePath?: string;
  imgSrc?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  svgEditProps?: React.SVGProps<SVGSVGElement>;
  svgDeleteProps?: React.SVGProps<SVGSVGElement>;
  editIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  editLabel?: string;
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

export const RdsCommentBoxLogic: React.FC<RdsCommentBoxProps> = (props) => {
  const { state, avatarInitials = 'RD' } = props;
  const logic = useCommentsBoxLogic(props.mentionUsers);
  const viewProps = { props, logic, avatarInitials };

  switch (state) {
    case 'selected':
      return <SelectedCommentView {...viewProps} />;
    case 'typing':
      return <TypingCommentView {...viewProps} />;
    case 'comment Posted':
      return <PostedCommentView {...viewProps} />;
    case 'comment Hover':
      return <HoverCommentView {...viewProps} />;
    case 'comment Thread':
      return <ThreadCommentView {...viewProps} />;
    default:
      return null;
  }
};

RdsCommentBoxLogic.displayName = 'RdsCommentBoxLogic';
