import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./articleListPage.css"

interface Product {
  image: string;
  title: string;
  price: number;
  category : string;
  id: number;
}

interface Articles {
  name: string;
  price: number;
  category: string;
  id: number;
  images: string;
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

  const [articles, setArticles] = useState<Articles[]>([]);

  useEffect(() => {
    axios
      .get<Articles[]>("http://localhost:5005/articles")
      .then((response) => response.data)
      .then((data) => setArticles(data));
  }, []);


  if (resData == null) return <p>Loading...</p>;
  console.log(articles);
  if (articles === undefined) return <p>Loading...</p>;

  return (
    <div>
      <div className="category">
        <div className="sort-by">
          <p>Sort by:</p>
            <p>Price</p>
            <p>Rating</p>
            <p>Popularity</p>
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
         {articles.length != 0 ? (
        articles.map((article) => (
          <div className="individual-product">
            <img className="image-product" src={article.images} />
            <p className="product-title">{article.name}</p>
            <p className="product-price">{article.price}€</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </div>
  );
};

export default Articles;
