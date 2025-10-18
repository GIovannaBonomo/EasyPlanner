import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Register from './components/Register';
import Client from './pages/Client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Service from './pages/Service';
import AddService from './components/AddService';
import GoogleLogin from './components/GoogleLogin.jsx';


function App() {

  const [count, setCount] = useState(0)
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem("token"))

  return (
    <BrowserRouter>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path='/' element={isAuth ? <Navigate to="/home" /> : <Login setIsAuth={setIsAuth} />} />
        <Route path='/home' element={isAuth ? <Home /> : <Navigate to="/" />} />
        <Route path='/login' element={isAuth ? <Navigate to="/home" /> : <Login setIsAuth={setIsAuth} />} />
        <Route path='/register' element={<Register />} />
        <Route path="/login/success" element={<GoogleLogin />}/>
        <Route path='/client' element={<Client />} />
        <Route path='/service' element={<Service />} />
        <Route path='/service/addService' element={<AddService />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
