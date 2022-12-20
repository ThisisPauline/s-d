import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./articleListPage.css";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: Rating;
  image: string;
}

type Props = {
  selectedCategory?: string;
};

const Articles: React.FC<Props> = ({ selectedCategory }) => {
  //All the states for fetching data
  const [products, setProducts] = useState<Product[]>([]);
  const [productsAPI, setProductsAPI] = useState<Product[]>([]);

  //All the states for organising the data
  const [priceRating, setPriceRating] = useState<boolean>(false);
  const [popularityRating, SetPopularityRating] = useState<boolean>(false);
  const [rateRating, setRateRating] = useState<boolean>(false);

  //fecthing data from DB and from API with a rerender everytime the state is updated
  useEffect(() => {
    axios
      .get<
        {
          category: string;
          description: string;
          id: number;
          image: string;
          price: number;
          rating: {
            rate: number;
            count: number;
          };
          title: string;
        }[]
      >("https://fakestoreapi.com/products")
      .then((response) => response.data)
      .then((data) => {
        //console.log(data);
        const additionalProducts: Product[] = data.map<Product>((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          price: item.price,
          rating: {
            rate: item.rating.rate,
            count: item.rating.count,
          },
          image: item.image,
        }));
        setProductsAPI(data);
      });
  }, [priceRating, popularityRating, rateRating]);

  useEffect(() => {
    axios
      .get<
        {
          category: string;
          description: string;
          id: number;
          image: string;
          price: number;
          rate: number;
          count: number;
          title: string;
        }[]
      >("http://localhost:5005/articles")
      .then((response) => response.data)
      .then((data) => {
        //console.log(data);
        const additionalProducts: Product[] = data.map<Product>((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          price: item.price,
          rating: {
            rate: item.rate,
            count: item.count
          },
          image: item.image,
        }));
        setProducts(additionalProducts);
      });
  }, [priceRating, popularityRating, rateRating]);

  let mergedProducts= products.concat(productsAPI)

  console.log(mergedProducts)

  // the handles on click for sorting out the products
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
    SetPopularityRating(false);
    setRateRating(true);
    setPriceRating(false);
  };

  const handleSortingByPopularity: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setRateRating(false);
    SetPopularityRating(true);
    setPriceRating(false);
  };

  if (mergedProducts.length < 20) return <p className="product-title">Loading...</p>;

  const ProductEntry = ({ product }: { product: Product }) => (
    <div className="individual-product">
      <Link to={`/products/${product.id}`} key={product.id}>
        <img className="image-product" src={product.image} />
        <p className="product-title">{product.title}</p>
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
            <button className="button-sorting" onClick={handleSortingByPrice}>Price</button>
            <button  className="button-sorting" onClick={handleSortingByRating}>Rating</button>
            <button  className="button-sorting" onClick={handleSortingByPopularity}>Popularity</button>
          </div>
        </div>
        <div className="product-flexbox">
          <>
            {selectedCategory === "showAll"
              ? priceRating
                ? mergedProducts
                    .filter((product) => product.category != "electronics")
                    .sort((a, b) => (a.price > b.price ? 1 : -1))
                    .map((product) => <ProductEntry {...{ product }} />)
                : popularityRating
                ? mergedProducts
                    .filter((product) => product.category != "electronics")
                    .sort((a, b) =>
                      a.rating.count > b.rating.count 
                        ? -1
                        : 1
                    )
                    .map((product) => <ProductEntry {...{ product }} />)
                : rateRating
                ? mergedProducts
                    .filter((product) => product.category != "electronics")
                    .sort((a, b) => (a.rating.rate > b.rating.rate ? -1 : 1))
                    .map((product) => <ProductEntry {...{ product }} />)
                : mergedProducts
                    .filter((product) => product.category != "electronics")
                    .map((product) => <ProductEntry {...{ product }} />)
              : priceRating
              ? mergedProducts
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
              ? mergedProducts
                  .filter((product) => product.category != "electronics")
                  .filter(
                    (product) =>
                      selectedCategory == null ||
                      product.category === selectedCategory
                  )
                  .sort((a, b) => (a.rating.count > b.rating.count ? -1 : 1))
                  .map((product) => <ProductEntry {...{ product }} />)
              : rateRating
              ? mergedProducts
                  .filter((product) => product.category != "electronics")
                  .filter(
                    (product) =>
                      selectedCategory == null ||
                      product.category === selectedCategory
                  )
                  .sort((a, b) => (a.rating.rate > b.rating.rate ? -1 : 1))
                  .map((product) => <ProductEntry {...{ product }} />)
              : mergedProducts
                  .filter((product) => product.category != "electronics")
                  .map((product) => <ProductEntry {...{ product }} />)}
          </>
        </div>
      </div>
    </>
  );
};
export default Articles;
