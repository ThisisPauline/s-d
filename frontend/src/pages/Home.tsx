import * as React from "react";
import ArticleListPage from "./ArticlesListPage";
import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Searchbar from "../components/searchbar";
import ManCat from "../assets/cat-man-cl.jpg";
import WomanCat from "../assets/cat-woman-cl.jpg";
import JeweleryCat from "../assets/cat-jewelery-cl.jpg";
import "./Home.css";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>();

  const handleOnClickCategory: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const newCategory = (event.target as HTMLButtonElement).dataset.category;
    setSelectedCategory(newCategory);
  };

  return (
    <div>
      <Header />
      <main className="main-container">
        <Searchbar />
        <div className="category">
          <div className="box">
            <button
              className="fakebutton"
              onClick={handleOnClickCategory}
              data-category="women's clothing"
            >
              femme look
            </button>
          </div>
          <div className="box">
            <button
              className="fakebuttonMen"
              onClick={handleOnClickCategory}
              data-category="men's clothing"
            >
      Masc look
            </button>
          </div>
          <div className="box">
            <button
              className="fakebuttonJewelery"
              onClick={handleOnClickCategory}
              data-category="jewelery"
            >
            Jewelery
            </button>
          </div>
        </div>
        <div className="buttonSeeAll">
        <button className="sell" onClick={handleOnClickCategory}
              data-category="showAll" style={{padding: "0.7em 1.2em"}}>See all</button>
              </div>
        <Routes>
          <Route
            path="/"
            element={<ArticleListPage {...{ selectedCategory }} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default Home;
