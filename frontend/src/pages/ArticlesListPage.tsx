import React, { useEffect, useState } from "react";
import axios from "axios";
import "./articles.css"
import { Link } from "react-router-dom";

interface Product {
  image: string;
  title: string;
  price: number;
  category : string;
  id: number;
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
           <Link to={`/products/${product.id}`} key={product.id}>
            <img className="image-product" src={product.image} />
            <p className="product-title">{product.title}</p>
            <p className="product-price">{product.price}€</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
