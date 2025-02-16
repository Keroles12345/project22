import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function Navbar() {
  let navigate=useNavigate();
  let {userLogin,setUserLogin}=useContext(UserContext);
  function signout(){
    localStorage.removeItem("usertoken");
    setUserLogin(null)
    navigate("/login")
  }
  return (
    
    <nav className="bg-gray-800 fixed top-0 left-0 right-0  border-gray-200 dark:bg-gray-900 z-50 shadow-md">

      <div className="flex flex-wrap justify-center gap-y-2  text-white  md:justify-between items-center mx-auto max-w-screen-xl p-4">
        <div className="flex items-center gap-5 ">
        <div className="flex items-center gap-5">
  <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
    <img src={logo} 
         className="h-8 sm:size-min filter brightness-0 invert dark:invert-0"  
         width={150} 
         alt="Logo" />
  </a>
</div>

          {userLogin != null ?<ul className="flex gap-3 text-slate-600">
            <li><Link className="text-white hover:text-blue-500" to="/">Home</Link></li>
            <li><Link className="text-white hover:text-blue-500" to="/cart">Cart</Link></li>
            <li><Link className="text-white hover:text-blue-500" to="/products">Products</Link></li>
            <li><Link className="text-white hover:text-blue-500" to="/gategories">Gategories</Link></li>
            <li><Link className="text-white hover:text-blue-500" to="/barnds">Barnds</Link></li>
          </ul>
        :null}

         
        </div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse ">
         <div className=" flex gap-3">
           <i className="fa-brands fa-facebook "></i>
           <i className="fa-brands fa-linkedin"></i>
           <i className="fa-brands fa-instagram"></i>
           <i className="fa-brands fa-x-twitter"></i>
           <i className="fa-brands fa-twitter"></i>
          </div>
        
          <div className="flex gap-3 list-none">
            {userLogin ? (
              <li>
                <Link
                  onClick={signout}
                  className="hover:text-red-500 hover:bg-black bg-green-500  p-2 px-7 rounded-full text-black"
                  to="#"
                >
                  Sign Out
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  className="hover:text-white bg-green-500 p-2 px-7 rounded-full text-black list-none"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
   