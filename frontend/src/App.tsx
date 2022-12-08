import * as React from 'react';
import './App.css'
import Articles from './components/articles';
import Header from './components/header';


interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
<div>
      <Header />
    <Articles /> 
    </div>

      )
};

export default App;


