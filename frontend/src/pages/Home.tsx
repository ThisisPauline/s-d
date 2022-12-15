import * as React from 'react';
import ArticleListPage from './ArticlesListPage';
import { Routes, Route } from "react-router-dom";
import Header from '../components/header';
import Searchbar from "../components/searchbar"
import ManCat from "../assets/cat-man-cl.jpg"
import WomanCat from "../assets/cat-woman-cl.jpg"
import JeweleryCat from "../assets/cat-jewelery-cl.jpg"
import './Home.css'


const Home = () => {

  return (
<div>
      <Header />
      <main className="main-container">
     <Searchbar />
     <div className="category">
      <div className='box'>
      <img className="img-cat" src={WomanCat} alt="" />
      <p className="description-cat">Women's wear</p>
      </div>
      <div className='box'>
      <img className="img-cat" src={ManCat} alt="" />
      <p className="description-cat">Men's wear</p>
      </div> 
      <div className='box'>
      <img className="img-cat" src={JeweleryCat} alt="" />
      <p className="description-cat">Jewelery</p>
      </div>
     </div>
        <Routes>
          <Route path="/" element={<ArticleListPage />} />
        </Routes>
      </main>
    </div>

      )
};

export default Home;


