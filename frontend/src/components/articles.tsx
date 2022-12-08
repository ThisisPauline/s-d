import React, { useEffect, useState, Fragment } from "react";
import axios, { AxiosResponse } from "axios";

interface Product {
  image: string;
  title: string;
}

const Articles = () => {
  const [resData, setResData] = useState<Product[]>();

  useEffect(() => {
    axios
      .get<Product[]>("https://fakestoreapi.com/products")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setResData(data);
      });
  }, []);

  if (resData == null) return <p>Loading...</p>;

  return( 
  <div>
    <img src={resData[0].image} />
    <p>{resData[0].title}</p>
  </div>
  );
};

export default Articles;
