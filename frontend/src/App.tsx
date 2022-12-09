import * as React from 'react';
import './App.css'
import Articles from './components/articles';
import Footer from './components/footer';
import Header from './components/header';


interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
<div>
      <Header />
    <Articles /> 
    <Footer />
    </div>

      )
};

export default App;


