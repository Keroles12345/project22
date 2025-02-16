import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Register() {

  let [product,setproduct]=useState("");
  let [relode,setrelode]=useState(false);
 let navigate=useNavigate();
  function handleRegister(values) {
setrelode(true)
   axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
   .then((res)=>{
    setrelode(false)
    if(res.data.message==="success"){
      localStorage.setItem("usertoken", res.data.token);

      setTimeout(() => navigate("/login"), 500); //
    }
   })
   .catch((res)=>{
    setrelode(false)
    setproduct(res.response.data.message)})
  }

  let myValidation = yup.object().shape({
    name: yup.string().min(3, "Minimum 3 characters").max(10, "Maximum 10 characters").required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    rePassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm password is required"),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid phone number").required("Phone is required"),
  });

  let formik = useFormik({
    initialValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    validationSchema: myValidation,
    onSubmit: handleRegister,
  });

  return (
  <>
  {product ?<div className="w-1/3 mx-auto bg-red-500 text-white font-bold rounded-3xl p-3 mt-8">{product}</div>:null}
   <div className="flex items-center justify-center pt-8  ">
    
      <form 
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl border-t-4 border-emerald-500"
        onSubmit={formik.handleSubmit}
      >
      
        <h1 className="text-2xl font-bold text-center text-emerald-600 mb-6">Register</h1>

   
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>

          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-2 border rounded-lg focus:border-emerald-500 focus:ring focus:ring-emerald-300 outline-none"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>}
        </div>

 
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

   
        <div className="mb-4">
          <label htmlFor="rePassword" className="block text-gray-700 font-medium">Confirm Password</label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            className="w-full p-2 border rounded-lg focus:border-emerald-500 focus:ring focus:ring-emerald-300 outline-none"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rePassword && formik.errors.rePassword && <p className="text-red-500 text-sm mt-1">{formik.errors.rePassword}</p>}
        </div>

      
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="w-full p-2 border rounded-lg focus:border-emerald-500 focus:ring focus:ring-emerald-300 outline-none"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>}
        </div>

  
        <button 
          type="submit" 
          className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-all focus:ring focus:ring-emerald-300"
        >
        {relode?<i className="fas fa-spinner fa-spin"></i>:"Register"}
        </button>
      </form>
    </div>
    </>
  );
}
