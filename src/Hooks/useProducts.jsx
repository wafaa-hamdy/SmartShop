import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';


export default function useProducts() {
    function getProduct() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
      }
      let productInfo = useQuery({
        queryKey: ["recentProduct"],
        queryFn: getProduct,
        staleTime: 7000,
      });
    
      return productInfo; 
    }