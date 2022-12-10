import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  title: string;
}

const SingleProduct = () => {
  const [product, setProduct] = useState<Product[]>();

  const { id } = useParams();

  

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get<Product[]>(`https://fakestoreapi.com/products/${id}`, {
        cancelToken: source.token,
      })
      .then((response) => response.data)
      .then((data) => setProduct(data));

    return () => {
      source.cancel("Component got unmounted");
    };
  }, []);

  console.log(product);


  return <div>Hello</div>
};

export default SingleProduct;
