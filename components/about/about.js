import React from "react";
import Link from "next/link";

import Image from "next/image";
import { useSelector } from "react-redux";

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const About = (props) => {
  const fetchdata = useSelector((state) => state.data).mappingdata;
  const findLabelById = (data, targetId, value) => {
    // Helper function to search recursively
    // const search = (items) => {
    //   for (const item of items) {
    //     if (item?.id === targetId) {
    //       return item[value]; // Return label if id matches
    //     }
    //     if (item?.children || item?.collectionarray) {
    //       const result = search(item?.children || item?.collectionarray); // Recursively search in children
    //       if (result) return result; // If found in children, return it
    //     }
    //   }
    //   return null; // Return null if not found
    // };
    // return search(data || []);
    // Start the search with the root data
  };

  return (
    <section className={`wpo-about-section section-padding ${props.abClass}`}>
      <div className="container sectionabout">
        <div className="row align-items-center" style={{ height: "100%" }}>
          <div className="col-lg-6 col-md-12 col-12">
            <div className="wpo-about-wrap">
              <div className="d-flex gap-2 aboutImages">
                <Image
                  loading="lazy"
                  width={100}
                  alt="Analytics by Adriva"
                  height={100}
                  src={
                    fetchdata["af0b1058-ab49-44cc-977f-41572e74bb1f"]?.files[1]
                      ?.url
                  }
                  className="aboutimg1"
                />
                <Image
                  loading="lazy"
                  width={100}
                  height={100}
                  src={
                    fetchdata["af0b1058-ab49-44cc-977f-41572e74bb1f"]?.files[0]
                      ?.url
                  }
                  alt="Analytics by Adriva"
                  className="aboutimg1"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-12">
            <div className="wpo-about-text">
              <h4 className="">
                {fetchdata[
                  "e23e3095-9e42-49d1-8f70-3838b6010c89"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
              </h4>

              <p>
              {fetchdata[
                  "57936bf9-6482-47a2-8db7-2133e3314765"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                
              </p>
              <Link onClick={ClickHandler} href="/about" className="theme-btn">
              {fetchdata[
                  "d36b2d9a-a86f-4054-8386-6fa20fac5964"
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
               
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
