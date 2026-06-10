
import { RdsAvatar, RdsBox } from '../../raaghu-elements';
import './rds-comp-comments-box.scss';
import { RdsCommentBoxLogic, RdsCommentBoxProps } from './rds-comp-comments-logic-combined';
import { useCommentsBoxLogic } from './rds-comp-comments-box.hooks';
import { DropdownMenu } from './rds-comp-comments-box-dropdown';

export { useCommentsBoxLogic, DropdownMenu };

const RdsCommentBox = (props: RdsCommentBoxProps) => {
  const { state, avatarInitials } = props;

  if (state === 'default' || !state) {
    return (
      <RdsBox className="rds-comments-box rds-comments-box--default">
        <RdsAvatar className="rds-comments-box__avatar">{avatarInitials || 'RD'}</RdsAvatar>
      </RdsBox>
    );
  }
  return <RdsCommentBoxLogic {...props} />;
};

export default RdsCommentBox;

RdsCommentBox.displayName = 'RdsCommentBox';
