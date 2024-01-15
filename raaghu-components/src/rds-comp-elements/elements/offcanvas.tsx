import React from "react";
import { RdsOffcanvas } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsOffcanvas
            offId="canvasExample"
            canvasTitle="Offcanvas Title"
            scrolling={false}
            placement="end"
            backDrop="static"
            offcanvaswidth={650}
            children={
                <>
                    <h2 className="p-3">
            Hello Offcanvas Lorem ipsum dolor sit amet consectetur adipisicing
            elit.
                    </h2>
                </>
            }
            offcanvasbutton={
                <a
                    className="btn btn-primary"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#canvasExample"
                    aria-controls="canvasExample"
                >
          Button
                </a>
            }
        />
    );
};

export default code_actual;
