import { Navigate } from "react-router-dom"
import React from "react"
export default function ProtectedRouter(props) {
if(localStorage.getItem("usertoken")){
return props.children
}else{
return<Navigate to={"/login"}/>
}
}
