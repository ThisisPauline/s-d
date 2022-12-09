import React, { useEffect, useState, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
import "./articles.css";

interface Product {
  image: string;
  title: string;
  price: number;
  category : string;
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

  return (
    <div>
      <div className="category">
        <button className="button-category">Categories</button>
        <div className="sort-by">
          <label className="sort-by-title" htmlFor="sort-by">Sort by:</label>
          <select className="sort-by" id="sort-by">
            <option value="price">Price</option>
            <option value="Rating">Rating</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>
      <div className="product-flexbox">
        {resData
        .filter(product => product.category != "electronics")
        .map((product) => (
          <div className="individual-product">
            <a href="http://www.google.fr"> 
            <img className="image-product" src={product.image} />
            <p className="product-title">{product.title}</p>
            <p className="product-price">{product.price}€</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
