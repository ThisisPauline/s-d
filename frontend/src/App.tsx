import * as React from 'react';
import './App.css'
import Footer from './components/footer';
import Header from './components/header';
import Home from "./pages/Home";
import SingleProduct from './pages/SingleProduct';
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = () => {
  const [articles, setArticles] = useState([]);
  const backendURL = "http://localhost:5005";
  const source = axios.CancelToken.source();
  
  useEffect(() => {
    axios
    .get(`${backendURL}/articles`, { cancelToken: source.token })
    .then((response: any) => response.data)
    .then((data: any) => {
      console.log(data)
      setArticles(data)});
  
    return () => {
      source.cancel("Component got unmounted");
    };
    }, [])

  return (
<div>
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<SingleProduct />} />
        </Routes>
      </main>
    
    <Footer />
    </div>
      )
};

export default App;


