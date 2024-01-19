import React from "react";
import { RdsVideoPlayer } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsVideoPlayer
            width="480px"
            height="240px"
            autoplay={false}
            muted={false}
            videoLink="https=//youtu.be/7sDY4m8KNLc"
        />
    );
};

export default code_actual;
