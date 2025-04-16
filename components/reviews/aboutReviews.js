import { useSelector } from "react-redux";
import Slider from "react-slick";
import { useState, useEffect } from "react";

const ABoutReviews = () => {
  const fetchdata = useSelector((state) => state.data).mappingdata;

  const targetObject = fetchdata?.["6747f2325ed284abd5b22229"];

  const data =
    targetObject?.map((i) => ({
      p:
        Object.values(i)
          .find((o) => o.id === "ac4a7dd8-6278-4dd5-8fd3-8b4e05fc7bb6")
          ?.value?.replace(/<\/?[^>]+(>|$)/g, "") || "No description",
      companyname:
        Object.values(i)
          .find((o) => o.id === "e1a9be37-b765-46b8-86ed-8a96e533ab7e")
          ?.value?.replace(/<\/?[^>]+(>|$)/g, "") || "No title",
      img: Object.values(i).find(
        (o) => o.id === "13d776e2-c4ea-4ffd-b992-c509b8e958ee"
      )?.files[0]?.url,
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
    arrows: false,
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
                <p className="d-flex gap-1 text-white reviewcontent ">
                  <img
                    src="/images/quoto-1.png"
                    className="reviewqoute"
                    alt="quote"
                  />
                  {item.p}
                </p>
                <p className="text-white aboutreviews  px-3">
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
                <p className="d-flex gap-1 text-white reviewcontent ">
                  <img
                    src="/images/quoto-1.png"
                    className="reviewqoute"
                    alt="quote"
                  />
                  {item.p}
                </p>
                <p className="text-white aboutreviews  px-3">
                  <span>
                    <img
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                      src={item.img}
                      alt="company"
                    />
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

export default ABoutReviews;
