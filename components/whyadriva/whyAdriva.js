import { useSelector } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import apiServices from "../../services/api";
import magicJson from "../../magicJson/magicJson";

const WhyAdriva = () => {
  const services = new apiServices();

  const fetchdata = useSelector((state) => state.data).mappingdata;

  const targetObject = fetchdata["674598a6ea93fa6fa0ef81db"];
  const whyDataALtdata = [
    "Experienced Professsionals by Adriva",
    "Data-driven Market Research by Adriva",
    "Latest Tools & Technologies by Adriva",
    "Process Oriented by Adriva",
  ];
  const whydata =
    targetObject?.map((i, index) => {
      return {
        p:
          Object.values(i)
            .find((o) => o.id == "664bb88b-cb0b-470f-9bc7-abecd87302d3")
            ?.value?.replace(/<\/?[^>]+(>|$)/g, "") || "No description", // Add fallback for missing data
        title:
          Object.values(i)
            .find((o) => o.id == "f44ffb2b-b9bc-4456-af31-44bf21095dd4")
            ?.value?.replace(/<\/?[^>]+(>|$)/g, "") || "No title", // Add fallback for missing title
        img:
          Object.values(i).find(
            (o) => o.id == "0ccf1a6b-27fa-425c-b519-e468ba645a26"
          )?.files?.[0]?.url || "", // Handle nested property safely

        alt: whyDataALtdata[index],
      };
    }) || [];

  return (
    <>
      <div className="row ">
        <div
          className=" p-5 whycontainer2 col-4"
          style={{ background: "#6e6a66" }}
        >
          <p id="data-translate1" className=" fw-bold headingtext text-white">
            {fetchdata["77624b21-b858-489f-9168-4f90db3dfff3"]?.value?.replace(
              /<\/?[^>]+(>|$)/g,
              ""
            )}
          </p>
          <p id="data-translate1" className="whyadrivadesc text-white">
            {fetchdata["53bc42a8-20ac-4020-9eba-e17dd71a88b7"]?.value?.replace(
              /<\/?[^>]+(>|$)/g,
              ""
            )}
          </p>
          <p id="data-translate1" className="whyadrivadesc1">
            {fetchdata["7a825fa2-e92f-4b67-ad24-f5239e70d7f5"]?.value?.replace(
              /<\/?[^>]+(>|$)/g,
              ""
            )}
          </p>
        </div>
        <div className="col-8  whycontainer1">
          <div className="whycontainer">
            {whydata.map((item, index) => (
              <div key={index} className="whybox">
                <Image
                  height={100}
                  width={100}
                  alt={item.alt}
                  loading="lazy"
                  src={item.img}
                  className="whyimages"
                />
                <div>
                  <p id="data-translate1" className="adrivaheading">
                    {item.title}
                  </p>
                  <p
                    id="data-translate1"
                    className="whydatap m-0 p-0 text-gray adrivadesc"
                  >
                    {item.p}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default WhyAdriva;
