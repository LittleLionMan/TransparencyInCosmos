import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css';

import { NavBar } from '../components/NavBar/navBar'
import { Home } from '../pages/home/home';
import { Chain } from '../pages/chain/chain';
import { Validator } from '../pages/validator/validator';
//import { BlogEntry } from '../pages/blogEntry/blogEntry';
import { BlogEntry } from '../pages/blogEntry/singleBlog';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<BlogEntry />} exact></Route>
        <Route path='/:chain' element={<Chain />} />
          <Route path='/:chain/:validator' element={<Validator />} />
      </Routes>
    </Router>
  );
}

export default App;
