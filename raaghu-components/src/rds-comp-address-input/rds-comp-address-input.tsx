import React, { useState, useEffect } from "react";

export interface RdsCompAddressInputProps {}

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
            <div >
               </div>

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
                        <select
                            name="country"
                            className="form-control p-2 form-select selectpicker countrypicker"
                            onChange={(e) => handlecountry(e)}
                            data-testid="country"
                        >
                            <option value="">--Select Country--</option>
                            {country.map((getcon: any, index) => (
                                <option key={index} value={getcon.country_id}>
                                    {getcon.country_name}{" "}
                                </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">
							Please select a valid country.
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="state" className="form-label">
							State
                        </label>

                        <select
                            className="form-select"
                            name="state"
                            onChange={(e) => handlestate(e)}
                            data-testid="state"
                        >
                            <option value="">--Select State--</option>
                            {st.map((getst: any, index) => (
                                <option key={index} value={getst.state_id}>
                                    {getst.state_name}{" "}
                                </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">
							Please provide a valid state.
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="state" className="form-label">
							City
                        </label>
                        <select className="form-select" name="city" data-testid="city">
                            <option value="">--Select City--</option>
                            {city.map((gcity: any, index) => (
                                <option key={index} value={gcity.city_id}>
                                    {" "}
                                    {gcity.city_name}{" "}
                                </option>
                            ))}
                        </select>
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
