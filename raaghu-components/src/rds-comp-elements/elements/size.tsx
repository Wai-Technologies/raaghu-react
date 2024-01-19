import React from "react";
import { RdsSize } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsSize
            sizeType= "withoutDescription"
            sizeData={ [
                { value: "XXS",inStock:false},
                { value: "XS", inStock:true},
                { value: "S", inStock:true},
                { value: "M", inStock:true},
                { value: "L", inStock:true},
                { value: "XL",inStock:true},
                { value: "XXL",inStock:true},
            ]}
        />
    );
};

export default code_actual;
