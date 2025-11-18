import { createContext, use, useEffect, useState } from 'react'
import './App.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import data from './data.js'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import DetailPage from './pages/Detail.jsx'
import MainPage from './pages/Mainpage.jsx';
import Cartpage from './pages/Cart.jsx';
import { useSelector } from 'react-redux';
import LastItem from './components/LastItem.jsx';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


function App() {
  let obj = {name : 'kim'}

  useEffect(()=> {
    let watched = localStorage.getItem('watched')
    
    if (watched == null) {
      localStorage.setItem('watched', JSON.stringify([]))      
    }
  }, [])

  const [count, setCount] = useState(0)
  let [clicknum, setClicknum] = useState(1)
  let [morebutton, setMorebutton] = useState(true)

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  let [stock] = useState([10, 11, 12])
  let cur_cart_num = useSelector(state => state.cart).length
  // 최근본상품 팝업 상태
  let [recentPop, setRecentPop] = useState(false)
  
  // 리액트쿼리 연습
  // let result_data = useQuery({
  //   queryKey: ['getName'],
  //   queryFn: () => axios.get('https://codingapple1.github.io/userdata.json')
  //                   .then(a => a.data)
  // })
  
  return (
    <div className='App'>
              
        {/* Navbar 부분 구현 */}
        <div style={{width: '100%', height:'56px'}}></div>
        <Navbar data-bs-theme="dark" className='navbar-container position-fixed w-100 top-0'>
            <Navbar.Brand as={Link} to="/">ShoesShop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
              {/* <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link> */}
              <Nav.Link style={{display : 'flex'}} onClick={()=>{navigate('/cart')}}>Cart
                {cur_cart_num > 0 && <p className='cur-cart-how'>{cur_cart_num}</p>}
              </Nav.Link>
              <Nav.Link 
              onClick={()=>{setRecentPop(!recentPop)}}
              className='last-item position-absolute end-0'>최근 본 상품</Nav.Link>
            </Nav>
            
        </Navbar>
        {/* 최근 본 상품 팝업 구현*/}
        <LastItem shoes={shoes} setShoes={setShoes} recentPop={recentPop} setRecentPop={setRecentPop}/>
        
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
