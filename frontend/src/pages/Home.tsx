import * as React from 'react';
import ArticleListPage from './ArticlesListPage';
import { Routes, Route } from "react-router-dom";
import Header from '../components/header';


const Home = () => {

  return (
<div>
      <Header />
      <main className="main-container">
      <input className="search-bar" type="text" placeholder="Product search" />
        <Routes>
          <Route path="/" element={<ArticleListPage />} />
        </Routes>
      </main>
    </div>

      )
};

export default Home;


