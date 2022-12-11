import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Object = {
  id: number;
  category: string;
  description: string;
  image:string;
  title: string;
};

const SingleProduct = () => {
  const [product, setProduct] = useState<Object | any>();

  const { id } = useParams();

  

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get<Object[]>(`https://fakestoreapi.com/products/${id}`, {
        cancelToken: source.token,
      })
      .then((response) => response.data)
      .then((data) => setProduct(data));

    return () => {
      source.cancel("Component got unmounted");
    };
  }, []);

  
if(product === undefined) return <p>"Loading..."</p>
  console.log(product);


  return <div>
   
  <p>{product.title}</p>
  <img src={product.image} /> 
  <p>{product.description}</p>
  <p>{product.price} euros</p>

  <button>Add to cart</button>
  
  </div>
};

export default SingleProduct;
