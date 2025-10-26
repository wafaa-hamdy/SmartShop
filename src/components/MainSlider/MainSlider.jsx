import React from "react";
import Slide1 from "../../assets/slider-image-1.jpeg";
import Slide2 from "../../assets/slider-image-2.jpeg";
import Slide3 from "../../assets/slider-image-3.jpeg";
import Slide4 from "../../assets/grocery-banner.png";
import Slide5 from "../../assets/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="container mx-auto my-5 px-1 p-11 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
        <div className="md:col-span-3">
          <Slider {...settings}>
            <img src={Slide1} className="w-full h-[300px] md:h-[400px] object-cover rounded-lg" alt="" />
            <img src={Slide4} className="w-full h-[300px] md:h-[400px] object-cover rounded-lg" alt="" />
            <img src={Slide5} className="w-full h-[300px] md:h-[400px] object-cover rounded-lg" alt="" />
          </Slider>
        </div>

        <div className="flex flex-col gap-1">
          <img src={Slide2} className="w-full h-[140px] md:h-[200px] object-cover rounded-lg" alt="" />
          <img src={Slide3} className="w-full h-[140px] md:h-[200px] object-cover rounded-lg" alt="" />
        </div>
      </div>
    </div>
  );
}
