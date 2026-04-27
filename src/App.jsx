import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import BookList from './BookList';
import Home from './Home';
import UserEdit from './UserEdit';
import Logout from './Logout';
import NewReview from './NewReview';
import Detail from './Detail';
import EditReview from './EditReview';


function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/books' element={<BookList />} />
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<UserEdit />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/newreview' element={<NewReview />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/edit/:id' element={<EditReview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
