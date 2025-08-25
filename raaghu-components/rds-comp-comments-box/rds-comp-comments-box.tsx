
import React from 'react';
import { RdsAvatar, RdsBox } from '../../raaghu-elements';
import './rds-comp-comments-box.scss';
import { RdsCommentBoxLogic, RdsCommentBoxProps } from './rds-comp-comments-logic-combined';

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