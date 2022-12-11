import * as React from 'react';
import './App.css'
import Footer from './components/footer';
import Header from './components/header';
import ArticleListPage from './pages/ArticlesListPage';
import SingleProduct from './pages/SingleProduct';
import { Routes, Route } from "react-router-dom";


interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
<div>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<ArticleListPage />} />
          <Route path="/products/:id" element={<SingleProduct />} />
        </Routes>
      </main>
    <Footer />
    </div>

      )
};

export default App;


