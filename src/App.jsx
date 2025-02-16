import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Cart from "./component/Cart/Cart";
import Layout from "./component/Layout/Layout";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Gategories from "./component/Gategories/Gategories";
import Navbar from "./component/Navbar/Navbar";
import Notfound from "./component/Notfound/Notfound";
import Register from "./component/Register/Register";
import Footer from "./component/Footer/Footer";
import Products from "./component/Products/Products";
import Barnds from "./component/Barnds/Barnds";
import UserContextProvider, { UserContext } from "./component/Context/UserContext";
import ProtectedRouter from "./component/ProdectedRouter/ProtectedRouter";
import ProductDetiles from "./component/ProductDetiles/ProductDetiles";
import  { Toaster } from 'react-hot-toast';
import CartContextProvider from "./component/CartContext/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

let query=new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRouter><Home /></ProtectedRouter> },
      { path: "cart", element: <ProtectedRouter><Cart /></ProtectedRouter> },
      { path: "footer", element: <Footer /> },
      { path: "gategories", element: <ProtectedRouter><Gategories /></ProtectedRouter> },
      { path: "login", element: <Login /> }, 
      { path: "navbar", element: <Navbar /> },
      { path: "notfound", element: <Notfound /> },
      { path: "register", element: <Register /> }, 
      { path: "products", element: <ProtectedRouter><Products /></ProtectedRouter> },
      { path: "productdetiles/:id/:category", element: <ProtectedRouter><ProductDetiles /></ProtectedRouter> },
      { path: "barnds", element: <ProtectedRouter><Barnds /></ProtectedRouter> }
    ]
  }
]);

function App() {
  return (
    <UserContextProvider>

    <CartContextProvider>
      <QueryClientProvider client={query}>
      <RouterProvider router={router} />
      <ReactQueryDevtools/>
      </QueryClientProvider>

    <Toaster/>
    </CartContextProvider>

    </UserContextProvider>
  );
}

export default App;
