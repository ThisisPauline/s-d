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

  if (product === undefined) return <p>Loading...</p>;
  console.log(product);

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
      <p className="product-title">{product.title}</p>
      <div className="flexbox-product">
        <div>
          <img className="img-singleProduct" src={product.image} />
        </div>
        <div>
          <p className= "product-description">{product.description}</p>
          <p className="price">{product.price} euros</p>

          <button>Add to cart</button>
          </div>
        </div>
      </div>
      </div>
  );
};

export default SingleProduct;
