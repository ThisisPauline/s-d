import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopMenu from "../components/top-menu";
import "./SingleProduct.css"

type Object = {
  id: number;
  category: string;
  description: string;
  image: string;
  title: string;
  price: number
  images: string;
  name: string;
};

const SingleProduct = () => {
  const [product, setProduct] = useState<Object | any>();
  const [alsoLike, setAlsoLike] = useState<Object[]>();
  const [alsoLikeAdded, setAlsoLikeAdded] = useState<Object[]>();

  const { id } = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get<Object[]>(`https://fakestoreapi.com/products/${id}`, {
        cancelToken: source.token,
      })
      .then((response) => response.data)
      .then((data) => setProduct(data));

          axios
      .get<Object[]>(`https://fakestoreapi.com/products`, {
        cancelToken: source.token,
      })
      .then((response) => response.data)
      .then((data) => setAlsoLike(data));

      axios
      .get<Object[]>("http://localhost:5005/articles")
      .then((response) => response.data)
      .then((data) => setAlsoLikeAdded(data));

    return () => {
      source.cancel("Component got unmounted");
    };
  }, []);

    function refreshPage() {
    window.location.reload();
  }

  if (product === undefined) return <p>Loading...</p>;
  console.log(product);
  if (alsoLike == undefined) return <p>Loading...</p>;
  if (alsoLikeAdded == undefined) return <p>Loading...</p>;

  return (
    <div>
      <TopMenu />
      <div className="go-back">
      <Link to={`/`} key={product}>
        <img src="" alt=""/>
        <p>Go back to all</p>
      </Link>
      </div>
    <div className="product-mobile">
      <p className="product-title-indiv">{product.title}</p>
      <div className="flexbox-product">
        <div>
          <img className="img-singleProduct" src={product.image} />
        </div>
        <div>
          <p className= "product-description-indiv">{product.description}</p>
          <p className="price-indiv">{product.price} euros</p>

          <button className="addToCart">Add to cart</button>
          </div>
        </div>
        <div>
        <h1 className="you-might-like-title">You might also like</h1>
          <section className="you-might-like">
          
          {alsoLike
        .filter(otherProduct => otherProduct.category == product.category && otherProduct.id != product.id).sort((a, b) => 0.5 - Math.random()).slice(0, 2)
        .map((otherProduct) => (
          <div onClick={refreshPage} className="individual-product">
           <Link to={`/products/${otherProduct.id}`} key={otherProduct.id}>
            <img className="image-productAdded" src={otherProduct.image} />
            <p className="product-titleAdded">{otherProduct.title}</p>
            <p className="product-priceAdded">{otherProduct.price}€</p>
            </Link>
            
          </div>
        ))}
        {alsoLikeAdded
        .filter(otherProduct => otherProduct.category == product.category && otherProduct.id != product.id).sort((a, b) => 0.5 - Math.random()).slice(0, 2)
        .map((otherProduct) => (
          <div onClick={refreshPage} className="individual-product">
           <Link to={`/products/${otherProduct.id}`} key={otherProduct.id}>
            <img className="image-productAdded" src={otherProduct.images} />
            <p className="product-titleAdded">{otherProduct.name}</p>
            <p className="product-priceAdded">{otherProduct.price}€</p>
            </Link>
            
          </div>
        ))}
        </section>
        </div>
        
      </div>
      </div>
  );
};

export default SingleProduct;
