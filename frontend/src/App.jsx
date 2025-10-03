import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {

  const [count, setCount] = useState(0)
  const [isAuth, setIsAuth]= useState(()=>!!localStorage.getItem("token"))

  return (
    <BrowserRouter>
    <NavBar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path='/' element={isAuth ? <Navigate to="/home"/> : <Login setIsAuth={setIsAuth}/>}/>
        <Route path='/home' element={isAuth ? <Home/> : <Navigate to="/"/>}/> 
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
