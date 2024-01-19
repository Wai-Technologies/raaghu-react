import React from "react";
import { RdsReviewCategory } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsReviewCategory
            display_type="Basic"
            item={{
                name: "Jems Rock",
                date: new Date(),
                rating: 4,
                likes: 50,
                dislikes: 50,
                reviewTitle: "Very good and color also nice & fresh look",
                reviewSubTitle:
          "After a quick chat with support team, I had a good feeling about this shirt and ordered there of them.",
                description:
          "Less than 48 hours later, my delivery arrived. I have not worn anything else since that day! These shirts are so comfortable,yet look classy enough that I can wear them at work or even some formal events.Thank you!",
            }}
        />
    );
};

export default code_actual;
