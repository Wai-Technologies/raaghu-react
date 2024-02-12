import React from "react";
import { RdsAppDetail } from "../rds-elements";

export interface RdsCompAppDetailProps {
    appDetailList: any;
}

const RdsCompAppDetail = (props: RdsCompAppDetailProps) => {

    return (
        <>
            <div>
                {props.appDetailList?.map((item: any, index: number) => (
                    <div className="m-2 " key={index}>
                        <RdsAppDetail appDetailsItem={item} />
                    </div>
                ))}
            </div>
        </>
    );
};
export default RdsCompAppDetail;
