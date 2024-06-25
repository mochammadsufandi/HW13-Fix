import { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import DetailBook from './page/DetailBook';
import PageNotFound from './page/PageNotFound';
import AddBook from './page/AddBook';
import EditBook from './page/EditBook';
import Navbar from './component/Navbar';

function App() {
  const [isLogin,setIsLogin] = useState(false);

  useEffect(() => {
    if(window.localStorage.getItem('login-token')) {
      setIsLogin(true);
      console.log(isLogin)
    }
  },[window.localStorage.getItem('login-token')]);
  const token = window.localStorage.getItem('login-token');
  console.log(token)

  return (
    <>
      <Router>
      {token ?(
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/book/:id' element={<DetailBook/>}/>
          <Route path='*' element={<PageNotFound/>}/>
          <Route path='/addbook' element={<AddBook/>}/>
          <Route path='/editbook/:id' element={<EditBook/>}/>
       </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/book/:id' element={<DetailBook/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      )
      }

        

      </Router>
    </>
  )
}

export default App
