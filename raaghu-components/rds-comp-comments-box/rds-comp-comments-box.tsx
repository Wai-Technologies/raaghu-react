import { RdsCommentBoxLogic, type RdsCommentBoxProps } from './rds-comp-comments-logic-combined';
import { useCommentsBoxLogic } from './rds-comp-comments-box.hooks';
import { DropdownMenu } from './rds-comp-comments-box-dropdown';

export { useCommentsBoxLogic, DropdownMenu };

const RdsCommentBox = (props: RdsCommentBoxProps) => {
  return <RdsCommentBoxLogic {...props} />;
};

export default RdsCommentBox;

RdsCommentBox.displayName = 'RdsCommentBox';
