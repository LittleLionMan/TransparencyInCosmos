import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css';

import { Header } from '../components/header/header';
import { Home } from '../pages/home/home';
import { Chain } from '../pages/chain/chain';
import { Validator } from '../pages/validator/validator';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:chain' element={<Chain />} />
          <Route path='/:chain/:validator' element={<Validator />} />
      </Routes>
    </Router>
  );
}

export default App;
