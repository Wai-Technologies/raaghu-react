import React, { useState } from "react";
import "./rds-comp-delivery-method.css";

export interface RdsCompDeliveryMethodProps {
    sizeDataWithDescription: any[];
    sizeType: "withoutDescription" | "withDescription";
}

const RdsCompDeliveryMethod = (props: RdsCompDeliveryMethodProps) => {
    const [activeButton, setActiveButton] = useState<number>();

    const onclick = (data: any, index: any) => {
    };
    return (
        <>
            <ul className="d-flex ulStl" id="rds-delivery">
                {props.sizeDataWithDescription.map((data: any, index: number) => (
                    <li key={data.id} className="m-2 border flex-evens">
                        <div
                            onClick={() => {
                                setActiveButton(index);
                            }}
                            className={`${activeButton === index ? "p-3 border-color" : " p-3"
                                }`}
                        >
                            <div className="d-flex">
                                <div className="type flex-grow-1">{data.type}</div>

                                {/* <input type="checkbox" className="checkbox-round" defaultChecked={true} />
                <input type="checkbox" className="checkbox-round" defaultChecked={false} /> */}
                                {activeButton === index && (
                                    <div className="checkbox">
                                        {" "}
                                        <input
                                            type="checkbox"
                                            className="checkbox-round"
                                            defaultChecked={true}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="description">{data.days}</div>
                            <div className="type mt-2">{data.cost}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};
export default RdsCompDeliveryMethod;
