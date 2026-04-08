import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import BookList from './BookList';


function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/books' element={<BookList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
