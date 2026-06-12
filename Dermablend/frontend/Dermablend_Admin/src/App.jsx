import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import Clients from './pages/Clients'
import Employees from './pages/Employees'
import Orders from './pages/Orders'
import Reviews from './pages/Reviews'
import Products from './pages/Products'
 
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/clients' element={<Clients/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/reviews' element={<Reviews/>}/>
        <Route path='/products' element={<Products/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
