import React from "react";
import "./rds-scrollspy.css";

export interface RdsScrollspyProps {
  data: {
    id: string;
    title: string;
    header: string;
    content: string;
  }[];
}

const RdsScrollspy = (props: RdsScrollspyProps) => {
  return (
    <div className="col-md-10 col-10 container">
      <div id="scrollspy">
        <nav className="navbar navbar-light">
          <ul className="nav nav-pills">
            {props.data.map((item) => (
              <li className="nav-item" key={item.id}>
                <a
                  className="nav-link text-uppercase navButton"
                  target="_self"
                  href={`#scrollspyHeading${item.id}`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        {props.data.map((item) => (
          <div id={`scrollspyHeading${item.id}`} className="scrossSpyItem" key={item.id}>
            <div>
              <h4 className="contentHeader">{item.header}</h4>
              <p className="contentParagrph">{item.content}</p>
            </div>
            <div className="d-flex justify-content-end align-items-end">
              <a href="#scrollspy" target="_self" className="text-decoration-none">
                Go Top
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RdsScrollspy;