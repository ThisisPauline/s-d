import { useEffect, useState } from "react";
import axios from "axios";
import "./articles.css";
import { Link } from "react-router-dom";

interface Articles {
  name: string;
  price: number;
  category: string;
  id: number;
  images: string;
}

const ArticlesAdded = () => {
  const [articles, setArticles] = useState<Articles[]>([]);

  useEffect(() => {
    axios
      .get<Articles[]>("http://localhost:5005/articles")
      .then((response) => response.data)
      .then((data) => setArticles(data));
  }, []);

  console.log(articles);
  if (articles === undefined) return <p>Loading...</p>;
  return (
    <div>
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
  );
};

export default ArticlesAdded;
