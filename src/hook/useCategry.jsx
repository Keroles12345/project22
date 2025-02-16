import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


export default function useProduct() {
    function getApi(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
     
     }
     let productQuery=useQuery({
       queryKey:["PeroductApi"],
         queryFn:getApi,
     staleTime:5000,
     retry:5,
     refetchInterval:100000,
     retryDelay:5000,
     refetchOnWindowFocus:true,
     gcTime:5000,
     })
     return productQuery;
    }