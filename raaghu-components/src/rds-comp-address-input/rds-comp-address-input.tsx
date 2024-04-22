import React, { useState, useEffect } from "react";
import { RdsDropdownList } from "../rds-elements";
export interface RdsCompAddressInputProps {
    adress?: any;
    address2?: any;
    country?: any;
    state?: any;
    city?: any;
    zip?: any;

}

const RdsCompAddressInput = (props: RdsCompAddressInputProps) => {
    const [country, setCountry] = useState([]);
    const [countryid, setCountryid] = useState("");
    const [st, setSt] = useState([]);
    const [stateid, setStateid] = useState("");
    const [city, setCity] = useState([]);
  

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

    const handlestate = (event: any) => {
        const getstateid = event.target.value;
        setStateid(getstateid);
    };

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
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="1234 Main St"
                            required
                        />
                        <div className="invalid-feedback">
                            Please enter your shipping address.
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="address2" className="form-label">
                            Address 2 <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address2"
                            placeholder="Apartment or suite"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="country" className="form-label">
                            Country
                        </label>
                        <div className="form-group">
                            <RdsDropdownList                                data-testid="country"
                                borderDropdown={true}
                                placeholder="Select Country"
                                labelIconWidth="18px"
                                labelIconHeight="25px"
                                listItems={Array.isArray(props.country) ? props.country : []}
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
                                listItems={Array.isArray(props.state) ? props.state : []}
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
                                listItems={Array.isArray(props.city) ? props.city : []}
                            />
                        
                        </div>
                        <div className="invalid-feedback">
                            Please provide a valid state.
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="zip" className="form-label">
                            Zip
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="zip"
                            placeholder="123456"
                            required
                        />
                        <div className="invalid-feedback">Zip code required.</div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RdsCompAddressInput;
