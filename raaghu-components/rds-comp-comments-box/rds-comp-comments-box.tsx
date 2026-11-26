import { forwardRef } from 'react';
import clsx from 'clsx';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { RdsAvatar, RdsBox } from '../../raaghu-elements';
import './rds-comp-comments-box.scss';
import { RdsCommentBoxLogic, RdsCommentBoxProps } from './rds-comp-comments-logic-combined';
import { useCommentsBoxLogic } from './rds-comp-comments-box.hooks';
import { DropdownMenu } from './rds-comp-comments-box-dropdown';

export { useCommentsBoxLogic, DropdownMenu };

const RdsCommentBox = forwardRef<HTMLDivElement, RdsCommentBoxProps>(function RdsCommentBox(props, ref) {
  const { state, avatarInitials, placeholderText, className, sx, style } = props;

  if (state === 'default' || !state) {
    return (
      <RdsBox ref={ref} className={clsx('rds-comments-box rds-comments-box--default', className)} sx={sx} style={style}>
        <RdsAvatar className="rds-comments-box__avatar">{avatarInitials || 'RD'}</RdsAvatar>
        <TextField
          variant="outlined"
          placeholder={placeholderText || 'Add a comment'}
          className="rds-comments-box__input"
          inputProps={{ 'aria-label': placeholderText || 'Add a comment' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="Send" className="rds-comments-box__send">
                  <SendOutlinedIcon className="rds-comments-box__send-icon" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </RdsBox>
    );
  }
  return <RdsCommentBoxLogic {...props} ref={ref} />;
});

export default RdsCommentBox;

RdsCommentBox.displayName = 'RdsCommentBox';
