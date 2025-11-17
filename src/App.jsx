import { createContext, use, useState } from 'react'
import './App.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import data from './data.js'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import DetailPage from './pages/Detail.jsx'
import MainPage from './pages/Mainpage.jsx';
import Cartpage from './pages/Cart.jsx';


function App() {
  const [count, setCount] = useState(0)
  let [clicknum, setClicknum] = useState(1)
  let [morebutton, setMorebutton] = useState(true)

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  let [stock] = useState([10, 11, 12])


  return (
    <div className='App'>
              
        {/* Navbar 부분 구현 */}
        <Navbar data-bs-theme="dark" className='navbar-container'>
            <Navbar.Brand as={Link} to="/">Shoes Shop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
              {/* <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link> */}
              <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
            </Nav>
        </Navbar>
        
        {/* 라우터 부분 구현 */}
        <Routes>
          {/* 메인페이지 */}
          <Route path='/' element={        
            <MainPage clicknum={clicknum} setClicknum={setClicknum}
            morebutton={morebutton} setMorebutton={setMorebutton}
            shoes={shoes} setShoes={setShoes}/>
          }/>

          {/* 상세페이지 */}
          {/* Detail페이지 */}
          <Route path='/detail/:id' element={
            <DetailPage navigate={navigate} shoes={shoes} setShoes={setShoes}/>
            } />
          <Route path='/cart' element = {
            <Cartpage/>
          }/>
          <Route path='*' element={<div>404 Page Error</div>} />       



        </Routes>

  </div>
  );
}


export default App
