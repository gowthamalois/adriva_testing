import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const OurServiceSection = () => {
  const router = useRouter();
  const fetchdata = useSelector((state) => state.data).mappingdata;
  // useEffect(() => {
  //   const translateFunction = async () => {
  //     const elements = document.querySelectorAll("#data-translate1");
  //     const innerTextArray = Array.from(elements).map((el) =>
  //       el.textContent.trim()
  //     );

  //     console.log(innerTextArray); // Logs only relevant text
  //     magicJson.endpoint = "translate";
  //     magicJson.executor = "translatetext";
  //     magicJson.data = innerTextArray;
  //     const Data = new FormData();
  //     Data.append("request", JSON.stringify(magicJson));
  //     await services.fetchdata(Data).then((res) => {
  //       console.log(res.data.data[0]);
  //       elements.forEach((el, index) => {
  //         el.textContent = res.data.data[0][index]; // Update the content
  //       });
  //     });
  //   };
  //   translateFunction();
  // }, []);
  const Services =
    fetchdata["67459a55ea93fa6fa0ef81e0"]?.map((i) => ({
      title:
        Object.values(i)
          ?.find((o) => o.id == "ffdddd33-2d50-4a3d-be6f-1433e7e57627")
          ?.value?.replace(/<\/?[^>]+(>|$)/g, "") || "Default Title", // Fallback for missing label
      image:
        Object.values(i)?.find(
          (o) => o.id == "c80da8b2-9f74-44a7-bde2-89287ae8378d"
        )?.files?.[0]?.url || "Default Image",
      url: Object.values(i)
        ?.find((o) => o.id == "e38b7cf9-6108-4495-8dc3-fe1c48aa731e")
        ?.value?.replace(/<\/?[^>]+(>|$)/g, ""),
    })) || [];
  const settings = {
    dots: false,
    arrows: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    autoplay: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="servicescontainer">
        <div className="ourservicesinside">
          <p className="serviceheading">Our Services </p>
          <div className="row-grid  owl-carousel">
            <Slider {...settings}>
              {Services.map((service, srv) => (
                <div
                  onClick={() => router.push(service.url)}
                  className=" servicesboxes"
                  key={srv}
                >
                  <div
                    className="services"
                    style={{
                      background: `url("${service.image}")`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      position: "relative", // Required for positioning the overlay
                    }}
                  >
                    <div className="overlay"></div>
                    <h2 id="data-translate" className="overlay-text">
                      {service.title}
                    </h2>
                  </div>
                  <h2 id="data-translate" className="servicetext">
                    {service.title}
                  </h2>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};
export default OurServiceSection;
