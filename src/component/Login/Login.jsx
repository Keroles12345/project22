import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";


export default function Register() {
  let navigate=useNavigate();
  let {setUserLogin}=useContext(UserContext);
  let [product,setproduct]=useState("");
  let [relode,setrelode]=useState(false);


  function  handleLogin(values) {
setrelode(true)
   axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
   .then((res)=>{
    setrelode(false)
    if(res.data.message==="success"){
      localStorage.setItem("usertoken", res.data.token);


      setUserLogin( res.data.token);
      navigate("/");
    }
   })
   .catch((res)=>{
    setrelode(false)
    setproduct(res.response.data.message)})
  }

  let myValidation = yup.object().shape({
     
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  
  });

  let formik = useFormik({
    initialValues: {  email: "", password: "" },
    validationSchema: myValidation,
    onSubmit: handleLogin,
  });

  return (
  <>
  {product ?<div className="w-1/3 mx-auto bg-red-500 text-white font-bold rounded-3xl p-3 mt-8">{product}</div>:null}
   <div className="flex items-center justify-center pt-8 ">
    
      <form 
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl border-t-4 border-emerald-500"
        onSubmit={formik.handleSubmit}
      >
      
        <h1 className="text-2xl font-bold text-center text-emerald-600 mb-6">Login</h1>

   
       
 
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border rounded-lg focus:border-emerald-500 focus:ring focus:ring-emerald-300 outline-none"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-2 border rounded-lg focus:border-emerald-500 focus:ring focus:ring-emerald-300 outline-none"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>}
        </div>

   
       

  <div>
        <button 
          type="submit" 
          className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-all focus:ring focus:ring-emerald-300"
        >
        {relode?<i className="fas fa-spinner fa-spin"></i>:"Login"}
        </button>
<Link to="/register" className="text-blue-600 under">If you do not have an account, click here</Link>
     </div>
      </form>
    </div>
    </>
  );
}
