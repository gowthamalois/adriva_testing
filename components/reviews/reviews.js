import Image from "next/image";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { useState, useEffect } from "react";

const Reviews = () => {
  const fetchdata = useSelector((state) => state.data).mappingdata;
 

  const targetObject = fetchdata["6745a7e164de606caa48f9ed"];

  const data =
    targetObject?.map((i) => ({
      p:
        Object.values(i)
          ?.find((o) => o.id == "d2cfeaf6-dfc7-49e6-a885-c11dff1817a6")
          ?.value?.replace(/<\/?[^>]+(>|$)/g, "") || "No description", // Add fallback for missing data
      img:
        Object.values(i)?.find(
          (o) => o.id == "a2e4ffc0-f633-4b81-b8d5-db51ae9993a8"
        )?.files?.[0]?.url || "",
      companyname:
        Object.values(i)
          ?.find((o) => o.id == "219c0a32-899c-4947-9a22-464fcf390d82")
          ?.value?.replace(/<\/?[^>]+(>|$)/g, "") || "No title", // Add fallback for missing title
    })) || [];

  // State for handling whether slider should be enabled
  const [isSlidingEnabled, setIsSlidingEnabled] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlidesToShow = () => {
      let currentSlides = 3;

      if (window.innerWidth <= 480) {
        currentSlides = 1;
      } else if (window.innerWidth <= 770) {
        currentSlides = 2;
      } else if (window.innerWidth <= 991) {
        currentSlides = 2;
      } else if (window.innerWidth <= 1200) {
        currentSlides = 3;
      } else if (window.innerWidth <= 1400) {
        currentSlides = 3;
      }

      setSlidesToShow(currentSlides);

      // Enable the slider if there are more items than can fit on the screen
      setIsSlidingEnabled(data.length > currentSlides);
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);

    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, [data]);

  const settings = {
    dots: false,
    arrows: true,
    speed: 100,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: isSlidingEnabled,
    infinite: isSlidingEnabled,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: isSlidingEnabled,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: isSlidingEnabled,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: isSlidingEnabled,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: isSlidingEnabled,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: isSlidingEnabled,
        },
      },
    ],
  };

  return (
    <>
      <div className="reviewcontainer">
        {/* Show slider if there are enough items to slide */}
        {isSlidingEnabled && (
          <Slider {...settings}>
            {data.map((item, index) => (
              <div className="reviewbox" key={index}>
                <p id="data-translate" className="d-flex gap-1 text-white reviewcontent ">
                  <img
                    src="/images/quoto-1.png"
                    className="reviewqoute"
                    alt="quote"
                  />
                  {item.p}
                </p>
                <p id="data-translate" className="text-white aboutreviews  px-3">
                  <span>
                    <img src={item.img} alt="company" />
                  </span>
                  {item.companyname}
                </p>
              </div>
            ))}
          </Slider>
        )}

        {/* Display data as a simple list when slider is not enabled */}
        {!isSlidingEnabled && (
          <div className="reviewboxx">
            {data.map((item, index) => (
              <div className="reviewbox" style={{ width: "100%" }} key={index}>
                <p id="data-translate" className="d-flex gap-1 text-white reviewcontent ">
                  <img
                    src="/images/quoto-1.png"
                    className="reviewqoute"
                    alt="quote"
                  />
                  {item.p}
                </p>
                <p id="data-translate" className="text-white aboutreviews  px-3">
                  <span>
                    <img src={item.img} alt="company" />
                  </span>
                  {item.companyname}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
