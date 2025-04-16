import React from "react";

import { useSelector } from "react-redux";


const About4 = (props) => {
  const fetchdata1 = useSelector((state) => state.data).mappingdata;

  
  return (
    <section className="wpo-about-section-s4 section-padding">
      <div className="container">
        <div className="wpo-about-inner">
          <div className="row align-items-start justify-content-center">
            <div className="col-xl-4 col-lg-4 col-md-12 col-12">
              <div className="wpo-about-text">
                <h4>
                  {fetchdata1[
                    "d24aad64-da69-4451-8e58-2cc70af7d53e"
                  ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                </h4>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-12 col-12">
              <div className="wpo-about-wrap">
                <div className="wpo-about-img">
                  <div className="abouttext">
                    <p>
                      {fetchdata1[
                        "a6e31f63-9d5d-43ed-ad9c-17e2f007b680"
                      ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About4;
