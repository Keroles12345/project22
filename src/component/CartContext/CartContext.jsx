import axios from "axios";
import { createContext } from "react";
export let CartContext=createContext();
let headers={token:localStorage.getItem("usertoken")
  ,
}
export default function CartContextProvider(props) {
function getCart(id){
return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
  productId:id
},
{
  headers
}
).then(res=>res) 
.catch(err=>err)
}
function cart(){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
  .then(res=>res).catch(err=>err)
}
 function updateCart(id ,newCount){
 return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:newCount},{
  headers
 })
  .then(res=>res).catch(err=>err)
}
 function deletCart(id ){
 return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
  headers
 })
  .then(res=>res).catch(err=>err)
}


  return (
    <CartContext.Provider value={{getCart,cart , updateCart,deletCart}} >{props.children}</CartContext.Provider>
  );
}
