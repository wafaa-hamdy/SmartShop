import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // الوضع الافتراضي لعدد العناصر الظاهرة
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // للأجهزة اللوحية
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // للجوال
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // للأجهزة الأصغر
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 my-4">
      <h2 className="text-xl font-bold text-gray-600 font-mono mb-4">
        Shop Popular Categories:
      </h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="text-center ">
            <img
              src={category.image}
              className="w-full h-[180px] md:h-[200px] object-cover rounded-lg shadow-md"
              alt={category.name}
            />
            <h4 className="text-gray-700 capitalize font-medium font-mono mt-2">
              {category.name}
            </h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}
