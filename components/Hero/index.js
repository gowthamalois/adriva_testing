import React, { useState } from "react";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"));
import Link from "next/link";

import { useSelector } from "react-redux";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const slide = [
    {
      backgroundImage: "url('/images/slider-1.webp')",
    },
    {
      backgroundImage: "url('/images/slider-2.webp')",
    },
  ];

  const settings = {
    dots: false,
    arrows: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    fade: true,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(oldIndex);
    },
    nextArrow: (
      <CustomNextArrow nextBackground={slide[currentSlide]?.backgroundImage} />
    ), // Custom Next Arrow
    prevArrow: (
      <CustomPrevArrow prevBackground={slide[currentSlide]?.backgroundImage} />
    ),
  };
  slide[currentSlide + 1]?.backgroundImage;
  const fetchdata = useSelector((state) => state.data).mappingdata;
 
  return (
    <div style={{ position: "relative" }}>
      <section className="hero hero-slider-wrapper hero-style-1">
        <div className="hero-slider slider-container">
          <Slider {...settings}>
            <div className="slide slide1image">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-8 col-md-8 col-sm-12 slide-caption">
                    <div className="slide-title">
                      <h2>
                        {fetchdata[
                          "f6849658-ad0b-4df4-b979-4ad76be2166f"
                        ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                      </h2>
                    </div>
                    <div className="slide-subtitle">
                      <p>
                        {fetchdata[
                          "78d67569-5a89-4b60-aa81-858c6f9e5f3f"
                        ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                      </p>
                    </div>
                    <div className="btns">
                      <Link href="/contact" className="theme-btn">
                        {fetchdata[
                          "8be98603-f923-4bdf-8223-a4f95c447cbb"
                        ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide slide2Imgae">
              <div className="container">
                <div className="row">
                  <div className="col col-lg-6 col-md-8 col-sm-12 slide-caption">
                    <div className="slide-title">
                      <h2 className="slide2text">
                        {fetchdata[
                          "6c04ee08-73cf-4149-977a-506aab483e7e"
                        ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                      </h2>
                    </div>
                    <div className="slide-subtitle">
                      <p className="slide2text">
                        {fetchdata[
                          "9f18750a-80d1-4055-b0c5-a314f54d23b5"
                        ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                      </p>
                    </div>
                    <div className="btns">
                      <Link href="/contact" className="theme-btn">
                        {fetchdata[
                          "ba723fd1-e225-45a8-95eb-648b44c4e736"
                        ]?.value?.replace(/<\/?[^>]+(>|$)/g, "")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </div>
  );
};

const CustomNextArrow = ({ nextBackground, onClick }) => {
  return (
    <div className="circle-button next" onClick={onClick}>
      <div
        className="circle-bg"
        style={{
          backgroundImage: nextBackground,
        }}
      >
        <span className="arrow-icon">→</span>
      </div>
    </div>
  );
};

const CustomPrevArrow = ({ prevBackground, onClick }) => {
  return (
    <div className="circle-button prev" onClick={onClick}>
      <div
        className="circle-bg"
        style={{
          backgroundImage: prevBackground,
        }}
      >
        {" "}
        <span className="arrow-icon">←</span>
      </div>
    </div>
  );
};

export default Hero;
