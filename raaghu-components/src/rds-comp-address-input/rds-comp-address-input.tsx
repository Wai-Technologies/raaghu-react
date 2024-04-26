import React, { useState, useEffect } from "react";
import { RdsDropdownList, RdsInput } from "../rds-elements";
export interface RdsCompAddressInputProps {
    adress?: any;
    address2?: any;
    statesList?: any;
    city?: any;
    zip?: any;
    countriesList?: any;
    citiesList: any;
    AddressData?: any;
    reset?: boolean;
    label: React.ReactNode;
}

const RdsCompAddressInput = (props: RdsCompAddressInputProps) => {
    const [country, setCountry] = useState([]);
    const [countryid, setCountryid] = useState("");
    const [st, setSt] = useState([]);
    const [stateid, setStateid] = useState("");
    const [city, setCity] = useState([]);
    const [inputReset, setInputReset] = useState(props.reset)
    const [AddressData, setAddressData] = useState(props.AddressData);

    useEffect(() => {
        const getcountry = async () => {
            const rescountry = await fetch("");
            const rescon = await rescountry.json();
            return rescon;
        };
        getcountry().then((res) => console.log("res", res));
    }, []);

    const handlecountry = (event: any) => {
        const getcountryid = event.target.value;
        setCountryid(getcountryid);
    };
    const handlerInputChange = (value: any, key: any) => {
        setAddressData({ ...AddressData, [key]: value });
    }

    useEffect(() => {
        const getstate = async () => {
            const resstate = await fetch(
                `http://localhost/devopsdeveloper/state/getstate/${countryid}`
            );
            const resst = await resstate.json();
            setSt(await resst);
        };
        getstate();
    }, [countryid]);

    useEffect(() => {
        const getcity = async () => {
            const rescity = await fetch(
                `http://localhost/devopsdeveloper/city/getcity/${stateid}`
            );
            const rcity = await rescity.json();
            setCity(await rcity);
        };
        getcity();
    }, [stateid]);

    return (
        <div className="mfe-outline p-3">
            <form className="needs-validation" >
                <div className="row g-3">
                    <div className="col-md-6">
                        <RdsInput
                            label="Address"
                            reset={inputReset}
                            placeholder="Enter Address"
                            inputType="text"
                            onChange={e => handlerInputChange(e.target.value, "address")}
                            value={AddressData?.address}
                        ></RdsInput>
                        <div className="invalid-feedback">
                            Please enter your shipping address.
                        </div>
                    </div>

                    <div className="col-md-6">
            
                        <RdsInput
                            label="Address 2 (Optional)"
                            reset={inputReset}
                            placeholder="Enter Address"
                            inputType="text"
                            onChange={e => handlerInputChange(e.target.value, "address2")}
                            value={AddressData?.address2}
                        ></RdsInput>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="country" className="form-label">
                            Country
                        </label>
                        <div className="form-group">
                            <RdsDropdownList
                                data-testid="country"
                                borderDropdown={true}
                                placeholder="Select Country"
                                labelIconWidth="18px"
                                labelIconHeight="25px"
                                listItems={props.countriesList}
                                isPlaceholder={true}
                            />

                        </div>
                        <div className="invalid-feedback">
                            Please select a valid country.
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="state" className="form-label">
                            State
                        </label>
                        <div className="form-group">
                            <RdsDropdownList
                                data-testid="state"
                                borderDropdown={true}
                                placeholder="Select State"
                                labelIconWidth="18px"
                                labelIconHeight="25px"
                                isPlaceholder={true}
                                listItems={props.statesList}
                            />

                        </div>
                        <div className="invalid-feedback">
                            Please provide a valid state.
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <label htmlFor="state" className="form-label">
                            City
                        </label>
                        <div className="form-group">
                            <RdsDropdownList
                                data-testid="city"
                                borderDropdown={true}
                                placeholder="Select City"
                                labelIconWidth="18px"
                                labelIconHeight="55px"
                                isPlaceholder={true}
                                listItems={props.citiesList}
                            />

                        </div>
                        <div className="invalid-feedback">
                            Please provide a valid state.
                        </div>
                    </div>
                    <div className="col-md-6">

                        <RdsInput
                            label="Zip"
                            reset={inputReset}
                            placeholder="Enter Zip code"
                            inputType="text"
                            onChange={e => handlerInputChange(e.target.value, "zip")}
                            value={AddressData?.zip}
                        ></RdsInput>
                        <div className="invalid-feedback">Zip code required.</div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RdsCompAddressInput;
