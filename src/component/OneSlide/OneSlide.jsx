import Slider from "react-slick";
import style from "./OneSlide.module.css";

export default function OneSlide() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,
  };
  return (
    <div className={style.wrapper}>
      <div className="row">
        <div className="w-3/4">
        <Slider {...settings}>
<img src="../src/assets/slider-image-1.jpeg" className="w-full h-[400px] object-cover " alt="" />
<img src="../src/assets/slider-image-2.jpeg" className="w-full h-[400px] object-cover " alt="" />
<img src="../src/assets/slider-image-3.jpeg" className="w-full h-[400px] object-cover " alt="" />
</Slider>
        </div>
        <div className="w-1/4">
        <img src="../src/assets/slider-image-2.jpeg" className="w-full h-[200px]" alt="" />
        <img src="../src/assets/slider-image-3.jpeg" className="w-full h-[200px]" alt="" />
        </div>
      </div>
      
    </div>
  );
}
