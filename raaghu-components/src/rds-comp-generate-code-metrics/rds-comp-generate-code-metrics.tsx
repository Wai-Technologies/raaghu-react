import React, { useState, useRef, useEffect } from "react";
import { RdsCarousel, RdsIcon } from "../rds-elements";
import "./rds-comp-generate-code-metrics.css";

export interface RdsCompGenerateCodeMetricsProps { }

const RdsCompGenerateCodeMetrics = (props: RdsCompGenerateCodeMetricsProps) => {
    const [isMetricsOpen, setIsMetricsOpen] = useState(false);
    const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMetrics = () => {
        setIsMetricsOpen(!isMetricsOpen);
    };

    const toggleDropdown = () => {
        setIsShareDropdownOpen(!isShareDropdownOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsShareDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="d-flex metrics-container metrics-layout">
                <div className="d-flex justify-content-center px-2">
                    <RdsIcon
                        name={isMetricsOpen ? "chevron_up" : "chevron_down"}
                        height="16px"
                        width="16px"
                        fill={false}
                        stroke={true}
                        onClick={toggleMetrics}
                        isCursorPointer={true}
                    />
                </div>
                <div className="">
                    <div className="typography">20</div>
                    <div className="text-center">Pages Created</div>
                </div>
                <div className="">
                    <div className="typography">86</div>
                    <div className="text-center">Components Generated</div>
                </div>
                <div className="">
                    <div className="typography">4050</div>
                    <div className="text-center">Lines of code Generated</div>
                </div>
                <div className="">
                    <div className="typography">200</div>
                    <div className="text-center">Development Hours Saved</div>
                </div>
            </div>
            <div className={`metrics-open-outer ${isMetricsOpen ? "show" : "hide"}`}>
                <div className="metrics-open">
                    <div className="d-flex justify-content-between metrics-open-header">
                        <div className="metrics-open-heading">Summary</div>
                        <div className="position-relative" ref={dropdownRef}>
                            <RdsIcon
                                name="share_color"
                                height="15px"
                                width="15px"
                                fill={false}
                                stroke={false}
                                tooltip
                                tooltipPlacement="bottom"
                                tooltipTitle="Share"
                                onClick={toggleDropdown}
                                isCursorPointer={true}
                            />
                            {isShareDropdownOpen && (
                                <div className="dropdown-menu show">
                                    <div
                                        className="dropdown-item"
                                        onClick={() => {
                                            setIsShareDropdownOpen(false);
                                        }}
                                    >
                                        Share code metrics and design
                                    </div>
                                    <div
                                        className="dropdown-item"
                                        onClick={() => {
                                            setIsShareDropdownOpen(false);
                                        }}
                                    >
                                        Share metrics, design & code
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="metrics-open-body">
                        <div className="">
                            <div className="metrics-img-container">
                                <RdsCarousel
                                    Indicators
                                    carouselItems={[
                                        {
                                            id: 1,
                                            imgUrl: 'https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg',
                                            name: 'Sam Smith',
                                            subTitle: 'Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum.'
                                        },
                                        {
                                            id: 2,
                                            imgUrl: 'https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE',
                                            name: 'king John',
                                            subTitle: 'this is the caption section were u can add the caption for the image'
                                        },
                                        {
                                            id: 3,
                                            imgUrl: 'https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg',
                                            name: 'John Doe',
                                            subTitle: 'Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum.'
                                        },
                                        {
                                            id: 4,
                                            imgUrl: 'https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE',
                                            name: 'User',
                                            subTitle: 'Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum.'
                                        }
                                    ]}
                                    state="2"
                                    style="Default"
                                    type="Circle"
                                    controls={true}
                                    chevronColor="primary"
                                    chevronHeight="18px"
                                    chevronWidth="18px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RdsCompGenerateCodeMetrics;