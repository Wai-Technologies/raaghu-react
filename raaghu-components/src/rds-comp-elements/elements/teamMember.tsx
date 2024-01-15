import React from "react";
import { RdsTeamMember } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsTeamMember
            teamItem={[
                {
                    title: "Tina",
                    subTitle: "Web Developer",
                    imgLink:
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png?W=100",
                    twitterIcon: "star",
                    linkdineIcon: "star",
                    description: "Lorem ipsum dolor sit amet conr adipiscing elit",
                },
            ]}
        />
    );
};

export default code_actual;
