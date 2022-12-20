import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./articleListPage.css";

interface Product {
  image: string;
  title: string;
  price: number;
  category: string;
  id: number;
  rating: object;
  children?: React.ReactNode;
  rate: number;
}

interface Articles {
  name: string;
  price: number;
  category: string;
  id: number;
  images: string;
  children?: React.ReactNode;
}

type Props = {
  selectedCategory?: string;
};

const Articles: React.FC<Props> = ({ selectedCategory }) => {
  const [resData, setResData] = useState<Product[]>();
  const [priceRating, setPriceRating] = useState<boolean>(false);
  const [popularityRating, SetPopularityRating] = useState<boolean>(false);
  const [rateRating, setRateRating] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Product[]>("https://fakestoreapi.com/products")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setResData(data);
      });
  }, [priceRating, popularityRating, rateRating]);

  const [articles, setArticles] = useState<Articles[]>([]);

  useEffect(() => {
    axios
      .get<Articles[]>("http://localhost:5005/articles")
      .then((response) => response.data)
      .then((data) => setArticles(data));
  }, [priceRating, popularityRating, rateRating]);

  const handleSortingByPrice: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setPriceRating(true);
    SetPopularityRating(false);
    setRateRating(false);
  };

  const handleSortingByRating: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    SetPopularityRating(true);
    setRateRating(false);
    setPriceRating(false);
  };

  const handleSortingByPopularity: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setRateRating(true);
    SetPopularityRating(false);
    setPriceRating(false);
  };

  if (resData == null) return <p className="product-title">Loading...</p>;
  console.log(articles);
  if (articles === undefined)
    return <p className="product-title">Loading...</p>;

  const ProductEntry = ({ product }: { product: Product | Articles }) => (
    <div className="individual-product">
      <Link to={`/products/${product.id}`} key={product.id}>
        <img
          className="image-product"
          src={(product as Product).image ?? (product as Articles).images}
        />
        <p className="product-title">
          {(product as Product).title ?? (product as Articles).name}
        </p>
        <p className="product-price">{product.price}€</p>
      </Link>
    </div>
  );

  return (
    <>
      <div>
        <div className="category">
          <div className="sort-by">
            <p>Sort by:</p>
            <button onClick={handleSortingByPrice}>Price</button>
            <button onClick={handleSortingByRating}>Rating</button>
            <button onClick={handleSortingByPopularity}>Popularity</button>
          </div>
        </div>
        <div className="product-flexbox">
          <>
            {selectedCategory === "showAll"
              ? priceRating
                ? resData
                    .filter((product) => product.category != "electronics")
                    .sort((a, b) => (a.price > b.price ? 1 : -1))
                    .map((product) => <ProductEntry {...{ product }} />)
                : popularityRating
                ? resData
                    .filter((product) => product.category != "electronics")
                    .sort((a, b) => (a.rating.count > b.rating.count ? -1 : 1))
                    .map((product) => <ProductEntry {...{ product }} />)
                : rateRating
                ? resData
                    .filter((product) => product.category != "electronics")
                    .sort((a, b) => (a.rating.rate > b.rating.rate ? -1 : 1))
                    .map((product) => <ProductEntry {...{ product }} />)
                : resData
                    .filter((product) => product.category != "electronics")
                    .map((product) => <ProductEntry {...{ product }} />)
              : priceRating
              ? resData
                  .filter((product) => product.category != "electronics")
                  .filter(
                    (product) =>
                      selectedCategory == null ||
                      product.category === selectedCategory
                  )
                  .filter((product) => product.category != "electronics")
                  .sort((a, b) => (a.price > b.price ? 1 : -1))
                  .map((product) => <ProductEntry {...{ product }} />)
              : popularityRating
              ? resData
                  .filter((product) => product.category != "electronics")
                  .filter(
                    (product) =>
                      selectedCategory == null ||
                      product.category === selectedCategory
                  )
                  .sort((a, b) => (a.rating.count > b.rating.count ? -1 : 1))
                  .map((product) => <ProductEntry {...{ product }} />)
              : rateRating
              ? resData
                  .filter((product) => product.category != "electronics")
                  .filter(
                    (product) =>
                      selectedCategory == null ||
                      product.category === selectedCategory
                  )
                  .sort((a, b) => (a.rating.rate > b.rating.rate ? -1 : 1))
                  .map((product) => <ProductEntry {...{ product }} />)
              : resData
                  .filter((product) => product.category != "electronics")
                  .map((product) => <ProductEntry {...{ product }} />)}

            {articles.length != 0 &&
              (selectedCategory === "showAll"
                ? articles.map((product) => <ProductEntry {...{ product }} />)
                : articles
                    .filter(
                      (product) =>
                        selectedCategory == null ||
                        product.category === selectedCategory
                    )
                    .map((product) => <ProductEntry {...{ product }} />))}
          </>
        </div>
      </div>
    </>
  );
};
export default Articles;
