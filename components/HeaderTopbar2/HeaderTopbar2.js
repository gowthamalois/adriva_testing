import React from "react";
import { FaPhone } from "react-icons/fa6";

const HeaderTopbar2 = () => {
  return (
    <div className="header_top d-flex justify-content-center align-items-start w-100">
      <div className="header_top_component d-flex gap-3">
        {/* First Contact */}
        <div className="d-flex align-items-center gap-2 header_top_box contact-hover">
          <FaPhone className="headingnumber contact-icon" />
          <p className="mb-0 headingnumber">+1-646-604-4744</p>
        </div>

        {/* Second Contact */}
        <div className="d-flex align-items-center gap-2 header_top_box contact-hover">
          <FaPhone className="headingnumber contact-icon contact-hover" />
          <p className="mb-0 headingnumber">+91-95588 25684</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopbar2;
