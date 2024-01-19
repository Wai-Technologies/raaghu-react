import React from "react";
import { RdsRating } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsRating
            rating={3}
            colorVariant="warning"
            reviewPosition="right"
            noOfReviews={123}
            seeAllOption={false}
        />
    );
};

export default code_actual;
