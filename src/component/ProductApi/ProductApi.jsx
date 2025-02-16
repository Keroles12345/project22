import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import toast from "react-hot-toast";
import useProduct from "../../hook/useProduct.jsx";

export default function ProductApi() {
  let { data, isError, error, isLoading } = useProduct();
  const [loading, setLoading] = useState(false);
  const [reloading, setreLoading] = useState(false);

  let { getCart } = useContext(CartContext);

  async function getElemntCart(id) {
    setLoading(true);
    setreLoading(id);
    let response = await getCart(id);

    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  }

  if (isError) {
    return <h3 className="text-red-500 font-bold text-center">{error}</h3>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse bg-emerald-500 h-16 w-16 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.data?.data.map((product) => (
          <div
            key={product.id}
            className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-5 transform hover:scale-105 transition-all duration-500"
          >
        
            <div className="absolute -top-3 -right-3 h-10 w-10 bg-emerald-500/20 rounded-full blur-lg"></div>

            <Link to={`/productdetiles/${product.id}/${product.category.name}`}>
              <img
                src={product.imageCover}
                className="w-full h-52 object-contain rounded-xl shadow-md transition-all duration-300 hover:scale-105"
                alt={product.title}
              />
              <h4 className="text-emerald-400 font-semibold mt-3 text-lg uppercase tracking-widest">
                {product.category.name}
              </h4>
              <h4 className="text-white font-bold text-xl mt-1">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h4>
              <div className="flex justify-between items-center mt-3 text-white">
                <span className="font-bold text-lg">{product.price} EGP</span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <i className="fas fa-star"></i> {product.ratingsAverage}
                </span>
              </div>
            </Link>

            <button
              onClick={() => getElemntCart(product.id)}
              className={`w-full mt-4 py-2 rounded-lg font-bold uppercase tracking-wider text-white text-lg transition duration-300 ${
                loading && reloading === product.id
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-emerald-700 hover:scale-105 shadow-lg shadow-emerald-500/50"
              }`}
            >
              {loading && reloading === product.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "🔥 Add To Cart"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
