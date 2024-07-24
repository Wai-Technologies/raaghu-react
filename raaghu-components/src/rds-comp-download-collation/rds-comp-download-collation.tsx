import React from "react";
import { RdsIcon } from "../rds-elements";

export interface RdsCompDownloadCollationProps {
    downloadTable: any[];
}

const RdsCompDownloadCollation = (props: RdsCompDownloadCollationProps) => {
    const handleDownloadTXT = (item: any) => {
        const text = `Date of Data: ${item.DateofData}\nNumber of Days: ${item.NummberofDay}`;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `data-${item.DateofData}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <div className="border p-3">
                {props.downloadTable?.map((item: any, index: number) => (
                    <div className="d-flex justify-content-between p-3" role="listitem" key={index}>
                        <div className="d-flex justify-content-between">
                            <span className="align-self-center ms-2 me-3">
                                <RdsIcon
                                    name="information"
                                    fill={false}
                                    stroke={true}
                                    colorVariant="dark"
                                    isCursorPointer={false}
                                    width="30px"
                                    height="30px"
                                />
                            </span>
                            <span>
                                <small className="d-flex">{item.DateofData}</small>
                                <small className="text-muted"> {item.NummberofDay}</small>
                            </span>
                        </div>
                        <div onClick={() => handleDownloadTXT(item)}>
                            <RdsIcon
                                name="download"
                                fill={false}
                                stroke={true}
                                colorVariant="primary"
                                isCursorPointer={true}
                                width="30px"
                                height="30px"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default RdsCompDownloadCollation;
