import React from "react";
import { RdsCarousel } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsCarousel
            Indicators={true}
            crossFade={true}
            controls={true}
            carouselItems={[
                {
                    id: 1,
                    imgUrl:
            "https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg",
                    name: "Sam Smith",
                    roleName: "Product Manager",
                    subTitle:
            "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra.",
                },
                {
                    id: 2,
                    imgUrl:
            "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE",
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
