import { forwardRef, memo, useMemo } from "react";
import Box from "@mui/material/Box";
import "./rds-comp-ai-message-box.scss";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
import { joinClassNames, type RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";

export interface RdsCompAiMessageBoxProps extends RdsStylingProps {
  isImage?: boolean;
  message?: string;
  src?: string;
  avtar?: string;
  avatar?: string;
  name?: string;
}

const RdsCompAiMessageBox = memo(forwardRef<HTMLDivElement, RdsCompAiMessageBoxProps>(function RdsCompAiMessageBox({
  isImage,
  message,
  src,
  avtar,
  avatar,
  name = "Jane Doe",
  className,
  sx,
  style,
}, ref) {
  const avatarSrc = useMemo(() => avatar ?? avtar, [avatar, avtar]);
  const imageSrc = src;

  return (
    <Box ref={ref} className={joinClassNames("rds-comp-ai-message-box", className)} sx={sx} style={style}>
      <div className="rds-comp-ai-message-box__container">
        <div className="rds-comp-ai-message-box__row">
          <RdsAvatar
            alt="User Avatar"
            displayStyle="with-name"
            showDesignation
            showName={false}
            src={avatarSrc}
            subText={message}
            title={name}
          />
        </div>
        {isImage && imageSrc && (
          <div className="rds-comp-ai-message-box__image-wrapper">
            <img src={imageSrc} alt="message image" className="rds-comp-ai-message-box__image" />
          </div>
        )}
      </div>
    </Box>
  );
}));

RdsCompAiMessageBox.displayName = "RdsCompAiMessageBox";
export default RdsCompAiMessageBox;
