import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function SliderProduct() {
  const [categoriesget, setCategoriesGet] = useState([]); 

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay:true,
    autoplaySpeed:1000,
  };

  function getCategories() {
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCategoriesGet(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Slider {...settings}>
        {categoriesget.map((category) => (
          <div key={category.id}> 
            {category.image ? (  
              <img src={category.image} className="w-full h-[200px] object-cover" />
            ) : (
              <p>No image available</p>  
            )}
            <h1 className="text-white">{category.name}</h1>
          </div>
        ))}
      </Slider>
    </>
  );
}
