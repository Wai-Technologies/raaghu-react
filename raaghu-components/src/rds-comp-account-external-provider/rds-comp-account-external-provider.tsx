import React, { useEffect, useState } from "react";
import {
    RdsButton,
    RdsCheckbox,
    RdsInput,
    RdsLabel,
} from "../../../raaghu-elements/src";

export interface RdsCompAccountExternalProviderProps {
    accountExternalProvider: any;
    onSubmit: any;
}
const RdsCompAccountExternalProvider = (props: RdsCompAccountExternalProviderProps) => {
    const [externalProvider, setExternalProvider] = useState(
        props.accountExternalProvider
    );

    const handlerSubmit = (event: any) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(externalProvider);
    };

    const handlerChange = (e: any, value: any, index: number, propertyName: string) => {
        e.stopPropagation();
        const tempExternal = externalProvider.map((item: any, id: number) => {
            if (id === index) {
                if (propertyName == "enabled") {
                    return { ...item, enabled: value };
                } else {
                    const updatedProperties = item[propertyName].map((prop: any) => {
                        return { ...prop, value: value };
                    }
                    );
                    return { ...item, [propertyName]: updatedProperties };
                }
            } else return item;
        });
        setExternalProvider(tempExternal);
    };

    useEffect(() => {
        setExternalProvider(props.accountExternalProvider);
    }, [props.accountExternalProvider]);

    return (
        <div className="overflow-x-hidden overflow-y-auto card-custom-scroll">
            <form onSubmit={handlerSubmit}>
                {externalProvider?.length !== 0 && (externalProvider?.map((item: any, index: number) => (
                    <div className={` ${index == 0 ? "pt-3" : ""}`} key={index}>
                        <div className="fw-medium mb-3">
                            <RdsLabel label={item?.name} ></RdsLabel>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <RdsCheckbox
                                    label="Enabled"
                                    checked={item?.enabled}
                                    onChange={(e) => {
                                        handlerChange(e, e.target.checked, index, "enabled");
                                    }}
                                    dataTestId="google"
                                ></RdsCheckbox>
                            </div>
                            <div className="row">
                                <div className="col-xxl-4 col-xl-4 col-lg-8 col-12 mb-3">
                                    <div className="form-group">
                                        <RdsInput
                                            value={item?.properties[0]?.value || ""}
                                            label="Client Id"
                                            placeholder=""
                                            customClasses="form-control"
                                            onChange={(e) => handlerChange(e, e.target.value, index, "properties")}
                                            dataTestId="site-key-google"
                                        ></RdsInput>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-4 col-lg-8 col-12 mb-3">
                                    <div className="form-group">
                                        <RdsInput
                                            value={item?.secretProperties[0]?.value}
                                            name={item?.secretProperties[0]?.name}
                                            label="Client Secret"
                                            placeholder=""
                                            customClasses="form-control"
                                            inputType="password"
                                            onChange={(e) => handlerChange(e, e.target.value, index, "secretProperties")}
                                            dataTestId="secret-key-google"
                                        ></RdsInput>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )))}
                <div className="mt-xxl-4 pb-4 ps-4 mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-3 bg-transparent fixed-bottem d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons mt-xl-4 mt-lg-4 mt-md-4 mt-0 pt-2 col-xxl-4 col-xl-4 col-lg-6 col-12 position-absolute">
                    <RdsButton
                        label="Save"
                        type="submit"
                        colorVariant="primary"
                        size="small"
                        dataTestId="save"
                    ></RdsButton>
                </div>
            </form>
        </div>

    );
};

export default RdsCompAccountExternalProvider;
