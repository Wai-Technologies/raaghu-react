import React from "react";
import { RdsFeatureList } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsFeatureList
            heading="Features"
            itemList={[
                "Only the best materials",
                "Ethically and locally made",
                "Pre-washed and pre-shrunk",
                "Machine wash cold with similar colors",
                "Stainless strap loops",
                "Double stitched construction",
                "Water-resistant",
            ]}
            columns={0}
        />
    );
};

export default code_actual;
