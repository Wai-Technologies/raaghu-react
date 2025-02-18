import React from "react";
import RdsIcon from "../rds-icon";
import "./rds-popular-page.css";
export interface RdsPopularPageProps {
    itemList: any;
}

const RdsPopularPage = (props: RdsPopularPageProps) => {
    return (
        <>
            <div>
                <label className="text-muted fw-bold">POPULAR PAGES</label>
                <hr className="mt-4 mb-0" />
                <div>
                    {props.itemList.map((item: any, index: any) => (
                        <div className="border-bottom d-flex align-items-center py-2 gap-2" data-testId="container-div">
                            <div className="p-3">
                                <div className="bg-opacity-25 bg-primary border p-2 rounded-3 text-primary-emphasis">
                                <RdsIcon
                                    name={item.icon}
                                    height="18px"
                                    width="18px"
                                    fill={false}
                                    stroke={true}
                                    colorVariant="primary"
                                    isCursorPointer={true}
                                />
                                </div>
                            </div>
                            <div className="w-100">
                                <div className="fw-bold">{item.title}</div>
                                <div className="text-muted">{item.subtitle}</div>
                            </div>
                            <div>
                                <a href="#">
                                    <RdsIcon
                                        name="chevron_right"
                                        height="47px"
                                        width="7px"
                                        fill={false}
                                        stroke={true}
                                        colorVariant="dark"
                                    />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default RdsPopularPage;
