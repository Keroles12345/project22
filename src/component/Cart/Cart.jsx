import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";

export default function Cart() {
  const { cart, updateCart, deletCart } = useContext(CartContext);
  const [loadingDelete, setLoadingDelete] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(null);
  const [cartData, setCartData] = useState(null);

  // Fetch cart details
  async function fetchCartDetails() {
    const response = await cart();
    if (response.data.status === "success") {
      setCartData(response.data.data);
    }
  }

  // Update product quantity
  async function handleCartUpdate(id, count) {
    if (count <= 0) {
      handleCartDelete(id);
      return;
    }

    setLoadingUpdate(id);
    const response = await updateCart(id, count);
    setCartData(response.data.data);
    setLoadingUpdate(null);
  }

  // Remove product from cart
  async function handleCartDelete(id) {
    setLoadingDelete(id);
    const response = await deletCart(id);
    setCartData(response.data.data);
    setLoadingDelete(null);
  }

  useEffect(() => {
    fetchCartDetails();
  }, []);

  return (
    <>
      {cartData ? (
        <>
          {cartData.totalCartPrice === 0 ? (
            <div className="font-bold text-2xl text-center capitalize my-16 text-red-500">
              No products in cart
            </div>
          ) : (
            <>
              <h1 className="my-10 text-white text-2xl font-bold capitalize rounded-full p-2 bg-emerald-500">
                Total Price: {cartData?.totalCartPrice}
              </h1>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">Product</th>
                      <th scope="col" className="px-6 py-3">Qty</th>
                      <th scope="col" className="px-6 py-3">Price</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData?.products.map((product) => (
                      <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleCartUpdate(product.product.id, product.count - 1)}
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Decrease quantity</span>
                              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                              </svg>
                            </button>
                            <div>
                              {loadingUpdate === product.product.id ? (
                                <div className="h-5 w-5 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
                              ) : (
                                <span>{product.count}</span>
                              )}
                            </div>
                            <button
                              onClick={() => handleCartUpdate(product.product.id, product.count + 1)}
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Increase quantity</span>
                              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price}
                        </td>
                        <td className="px-6 py-4">
                          {loadingDelete === product.product.id ? (
                            <div className="h-5 w-5 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
                          ) : (
                            <span onClick={() => handleCartDelete(product.product.id)} className="cursor-pointer text-red-500 hover:underline">
                              Remove
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="loader-container">
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
        </div>
      )}
    </>
  );
}
