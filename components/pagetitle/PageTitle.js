import React from "react";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

import { useSelector } from "react-redux";

const PageTitle = (props) => {
  const fetchdata1 = useSelector((state) => state.data).mappingdata;
  
  return (
    <section className="page-title">
      <div className="page-inner-wrap">
        <div className="container breadgrum">
          <div className="row">
            <div className="col col-xs-12 pageheader">
              <h2>{fetchdata1[
                  props.id1
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}</h2>
              <ol className="breadcrumb">
                <li>
                  <Link href="/"> {fetchdata1[
                  props.id2
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}</Link>
                </li>
                <p style={{ padding: 0 }}>
                  <FaAngleRight />
                </p>
                {(props?.isblog||props?.isjobs)?(
                  <>
                  <li>
                  <Link href={props?.isjobs?"/jobs":"/blogs"||"#"}> {fetchdata1[
                  props.id1
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}</Link>
                </li>
                <p style={{ padding: 0 }}>
                  <FaAngleRight />
                </p>
                  </>
                ):<></>}
                <li>
                  <span className="pagesub">
                    {fetchdata1[
                  props.id3
                ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
