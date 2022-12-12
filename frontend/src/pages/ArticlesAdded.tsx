import React, { useEffect, useState } from "react";
import axios from "axios";
import "./articles.css"


interface Articles{
    name: string;
    price: number;
    category : string;
    id: number;
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
        {articles.length != 0?
 <ul>
 {articles.map((article) => {
 console.log(article);
 return (
 <li>
 {article.name}
 </li>
 );
 })}
 </ul>
    : <p>Loading...</p>}</div>
)};

export default ArticlesAdded;
