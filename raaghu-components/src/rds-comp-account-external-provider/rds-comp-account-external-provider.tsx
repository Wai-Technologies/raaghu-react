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
        setExternalProvider(props.accountExternalProvider); 
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
        <div className="overflow-x-hidden overflow-y-auto ">
            <form onSubmit={handlerSubmit}>
                <div className="custom-content-scroll">
                    {externalProvider?.length !== 0 && (externalProvider?.map((item: any, index: number) => (
                       <div className={` ${index == 0 ? "pt-3" : ""}`} key={index}>
                       <div className="fw-medium mb-3">
                           <RdsLabel label={item?.name} ></RdsLabel>
                       </div>
                       <div className="row">
                           <div className="col-md-12 mb-3">
                               <RdsCheckbox
                                   labelText="Enabled"
                                   checked={item?.enabled}
                                   onChange={(e) => {
                                       handlerChange(e, e.target.checked, index, "enabled");
                                   }}
                                   dataTestId="google"
                               ></RdsCheckbox>
                           </div>
                           <div className="row mb-3">
                               <div className="col-xxl-4 col-xl-4 col-lg-8 col-12">
                                   <div className="form-group">
                                       <RdsInput
                                           value={item?.properties[0]?.value || ""}                                          
                                           name="Client Id"           
                                           label={true}
                                           placeholder="Client Id"
                                           customClasses="form-control"
                                           onChange={(e) => handlerChange(e, e.target.value, index, "properties")}
                                           dataTestId="site-key-google"
                                       ></RdsInput>
                                   </div>
                               </div>
                               <div className="col-xxl-4 col-xl-4 col-lg-8 col-12">
                                   <div className="form-group">
                                       <RdsInput
                                           value={item?.secretProperties[0]?.value}
                                           name={"Client Secret"}                                       
                                           label={true}
                                           placeholder="Client Secret"
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
                </div>
                <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-5">
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