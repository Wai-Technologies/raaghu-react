import React from "react";
import "./rds-scrollspy.css";

export interface RdsScrollspyProps { }

const RdsScrollspy = (props: RdsScrollspyProps) => {
    return (

        <div className="col-md-10 col-10 container">
            <div id="scrollspy">
                <nav className="navbar navbar-light">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <a
                                className="nav-link text-uppercase navButton"
                                target="_self"
                                href="#scrollspyHeading1"
                            >
                First
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link text-uppercase navButton"
                                target="_self"
                                href="#scrollspyHeading2"
                            >
                Second
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link text-uppercase navButton"
                                target="_self"
                                href="#scrollspyHeading3"
                            >
                Third
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                <div id="scrollspyHeading1" className="scrossSpyItem">
                    <div>
                        <h4 className="contentHeader">First header</h4>
                        <p className="contentParagrph">
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It's repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting
                        </p>
                    </div>
                    <div className="d-flex justify-content-end align-items-end">
                        <a
                            href="#scrollspy"
                            target="_self"
                            className="text-decoration-none">
              Go Top
                        </a>
                    </div>
                </div>

                <div id="scrollspyHeading2" className="scrossSpyItem">
                    <div>
                        <h4 className="contentHeader">First header</h4>
                        <p className="contentParagrph">
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It's repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting
                        </p>
                    </div>
                    <div className="d-flex justify-content-end align-items-end">
                        <a
                            href="#scrollspy"
                            target="_self"
                            className="text-decoration-none">
              Go Top
                        </a>
                    </div>
                </div>

                <div id="scrollspyHeading3" className="scrossSpyItem">
                    <div>
                        <h4 className="contentHeader">First header</h4>
                        <p className="contentParagrph">
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It's repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting
                        </p>
                    </div>
                    <div className="d-flex justify-content-end align-items-end">
                        <a
                            href="#scrollspy"
                            target="_self"
                            className="text-decoration-none">
              Go Top
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RdsScrollspy;
