import { createContext, use, useState } from 'react'
import './App.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import data from './data.js'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import DetailPage from './pages/Detail.jsx'
import MainPage from './pages/mainpage.jsx';
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


{/* 
          <Route path='/about' element={<About/>}>
            <Route path='member' element={<div>멤버임</div>} />
            <Route path='location' element={<div>위치임</div>} />
          </Route> */}
        </Routes>

  </div>
  );
}

// function About(){
//   return(
//     <div>
//       <h4>회사 정보임</h4>
//       <Outlet></Outlet>
//     </div>
//   )
// }


// function ShoesInfo(props) {
//   return (
//     <>  
//       <div className="col-md-4 product-box">
//         <img src={`https://codingapple1.github.io/shop/shoes${props.index+1}.jpg`} className='product-img'/>
//         <h4>{props.elem.title}</h4>
//         <p>{props.elem.price}</p>
//       </div>
//     </>
//   )
// }

// function MainPage(props) {
//   return (
//       <>
//         <div className='main-bg'></div>
//         <div className='product-container'>
//           <div className="row">
//           {props.shoes.map((elem, i)=>{
//             return (
//               <ShoesInfo key={i} elem={elem} index={elem.id} />
//             )
//           })}
//           </div>
//         </div>
//         <button onClick={()=>{
//           let copied_shoes = [...props.shoes];
//           copied_shoes.sort((a,b)=>{
//               if (a.title > b.title) {
//                 return 1
//               } else {
//                 return -1
//               }
//             })
//           props.setShoes(copied_shoes)}}
//         style={{display:"block", margin: 'auto', borderRadius: '5px'}}>
//           가나다순 정렬</button>
//       </>
//   )
// }



export default App
