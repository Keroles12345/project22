import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import style from "./ProductDetiles.module.css";
import Slider from "react-slick";
import { CartContext } from "../CartContext/CartContext";
import toast from 'react-hot-toast';
export default function ProductDetiles() {
  let {getCart}=useContext(CartContext)
  async function getElemntCart(id){
   let response= await getCart(id);
    console.log(response.data)
  if(response.data.staus=="succes"){
  toast.error(response.data.message)
  }else{
  toast.success(response.data.message)
  }
  }
  let { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const [getAllproduct, setgetAllproduct] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  function getelements() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/`)
      .then((res) => {
        let s = res.data.data.filter((p) => p.category.name === category);
        setgetAllproduct(s);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    getProduct(id);
    getelements();
  }, [id]);

  return (
    <>
      <div className={style.wrapper}>
        {product ? (  
          
          <div className="flex items-center gap-6 bg-white p-6 shadow-md rounded-lg mt-10">
         <div className="w-1/4">
         <Slider {...settings}>
          {product?.images.map((src)=><img src={src} className="w-full"/>)}
          {product?.images.map((src)=><img src={src} className="w-full"/>)}
          </Slider>
          </div>
          
            <div className="w-2/3">
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p className="text-gray-600 my-2">{product.description}</p>
              <p className="text-gray-600 my-2">{product.category.name}</p>
              <h3 className="text-green-600 text-2xl font-bold my-2">
                {product.price} EGP
              </h3>
              <h4 className="flex items-center text-yellow-500 text-lg font-medium">
                <i className="fas fa-star mr-1"></i> {product.ratingsAverage}
              </h4>
              <button onClick={()=>{getElemntCart(product.id)}} className="w-full mt-3 bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition duration-300">
                Add to Cart
              </button> 
            </div>
          </div>
        ) : (
          <p className="text-center text-lg font-medium">Loading...</p>
        )}
      </div>

      <div className="mt-10">
        {getAllproduct.length > 0 ? (
          <>
            <h3 className="text-xl font-bold text-center mb-6">Similar Products</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {getAllproduct.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md p-4 transform hover:scale-105 transition-all duration-300 flex flex-col justify-between min-h-[350px]"
                >
                  <Link to={`/productdetiles/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} className="w-full h-40 object-contain rounded-md" alt={product.title} />
                <h4 className="text-emerald-500 font-medium mt-2">{product.category.name}</h4>
                <h4 className="text-gray-800 font-semibold">{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                <p className="text-gray-600 my-2">{product.category.name}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600 font-semibold">{product.price} EGP</span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <i className="fas fa-star"></i>{product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button onClick={()=>{getElemntCart(product.id)}} className="w-full mt-3 bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition duration-300">
                Add to Cart
              </button> 
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
