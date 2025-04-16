import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaArrowUp } from "react-icons/fa6";

const Scrollbar = () => {
  return (
    <div className="col-lg-12">
      <div className="header-menu">
        <ul className="smothscroll">
          <li>
            <AnchorLink href="#__next">
              <FaArrowUp />
            </AnchorLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Scrollbar;
