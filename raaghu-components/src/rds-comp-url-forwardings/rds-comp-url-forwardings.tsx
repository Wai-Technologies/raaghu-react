import React, { useEffect, useState } from "react";
import { RdsInput } from "../rds-elements";
import { useTranslation } from "react-i18next";

interface RdsCompUrlForwardingsProps {
    urlForwardingData?: any
    emitUrlForwardingData?: any
    isEdit?: boolean;
    reset?: boolean;
}

function RdsCompUrlForwardings(props: RdsCompUrlForwardingsProps) {
    const [formData, setFormData] = useState(props.urlForwardingData || { source: '', target: '' });

    useEffect(() => {
        setFormData(props.urlForwardingData || { source: '', target: '' });
    }, [props.urlForwardingData]);
 
    return (
        <>
            <div className="tab-content">
                <div className="form-group mb-3">
                    <RdsInput
                        inputType="text"
                        name="Source"
                        label={true}
                        placeholder="Enter Source"
                        required={true}
                        value={formData.source}
                        onChange={(e: any) => {(e.target.value);}}
                        dataTestId="source"
                        isDisabled={props.isEdit || false}
                        reset={props.reset}
                    ></RdsInput>
                    <small className="text-muted-300 ms-2" >Ensure that source URL starts with a forward slash ("/")</small>
                </div>

                <div className="form-group mb-3">
                    <RdsInput
                        inputType="text"
                        name="Target"
                        label={true}
                        placeholder="Enter Target"
                        required={true}
                        onChange={(e: any) => {(e.target.value);}}
                        value={formData.target}
                        dataTestId="target"
                        reset={props.reset}
                    ></RdsInput>
                    <small className="text-muted-300 ms-2" >URL must start with a forward slash ("/") if targeting same domain</small>
                </div>
            </div>
        </>
    );
}

export default RdsCompUrlForwardings;