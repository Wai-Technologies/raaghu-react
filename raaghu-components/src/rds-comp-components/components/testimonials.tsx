import React from "react";
import RdsCompTestimonials from "../../rds-comp-testimonials/rds-comp-testimonials";

export const code_actual = () => {
    return (
        <RdsCompTestimonials
            displayType="basic"
            carousalItem={[
                {
                    id: 1,
                    imgUrl:
            "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                    name: "Sam Smith",
                    roleName: "Product Manager",
                    subTitle:
            "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra.",
                },
                {
                    id: 2,
                    imgUrl:
            "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg",
                    name: "king John",
                    roleName: "Tech Lead",
                    subTitle:
            "this is the caption section were u can add the caption for the image",
                },
            ]}
        />
    );
};

export default code_actual;
