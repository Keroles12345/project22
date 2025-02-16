
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import toast from 'react-hot-toast';

import useCategry from "../../hook/useProduct.jsx";


export default function ProductApi() {
  let {data,isError,error,isLoading}=useCategry()
 const [loading, setLoading] = useState(false); 
 const [reloading, setreLoading] = useState(false); 
 

let {getCart}=useContext(CartContext)

async function getElemntCart(id){
  setLoading(true)
  setreLoading(id)
 let response= await getCart(id);
  console.log(response.data)
if(response.data.staus=="succes"){

  toast.error(response.data.message)
  setLoading(false)
}else{
 
toast.success(response.data.message)
setLoading(false)
}
}

if(isError){
  return <h3 className="">{error}</h3>
}
if(isLoading){
  return ( <div className="loader-container">
    <div className="sk-cube-grid">
      <div className="sk-cube sk-cube1"></div>
      <div className="sk-cube sk-cube2"></div>
      <div className="sk-cube sk-cube3"></div>
      <div className="sk-cube sk-cube4"></div>
      <div className="sk-cube sk-cube5"></div>
      <div className="sk-cube sk-cube6"></div>
      <div className="sk-cube sk-cube7"></div>
      <div className="sk-cube sk-cube8"></div>
      <div className="sk-cube sk-cube9"></div>
    </div>
  </div>) 
}
  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  //       if (res.data?.data) {
  //         setProducts(res.data.data);
  //       } else {
  //         throw new Error("No products found");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching products:", err);
  //       setError("Failed to load products");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchProducts();
  // }, []);

  return (
   
    <div className="container mx-auto px-4 py-8">
      { <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data?.data?.data.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md p-4 transform hover:scale-105 transition-all duration-300">
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
                {loading &&reloading==product.id?<i className="fas fa-spinner fa-spin"></i>:"App To Cart"}
              </button> 
            </div>
          ))}
        </div>
      }
    </div>
  );
}
