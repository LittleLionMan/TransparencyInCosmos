import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css';

import { Header } from '../components/header/header';
import { Counter } from '../features/counter/Counter';
import { Home } from '../components/home/home';
import { Chain } from '../components/chain/chain';
import { Validator } from '../components/validator/validator';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:chain' element={<Chain />} />
          <Route path='/:chain/:validator' element={<Validator />} />
      </Routes>
      <div className="Counter">
        <Counter />
      </div>
    </Router>
  );
}

export default App;
