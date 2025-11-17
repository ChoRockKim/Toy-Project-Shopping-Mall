import { useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, addAge } from './../store/userSlice';
import { addNum, minusNum, deleteCart } from './../store.js'
 

function CartPage() {
    let cartItems = useSelector(state => state.cart)
    let dispatch = useDispatch()

    return (
        <div className='cartlist-container'>

            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th style={{textAlign: 'center'}}
                    >변경하기</th>
                    </tr>
                </thead>
                {cartItems.map((elem, i)=> 
                    <CartList idx = {i} elem = {elem} key={i}/>    
                    )}


            </Table> 
                {cartItems.length == 0 && <div style={{textAlign: 'center'}}>
                    장바구니에 상품이 없습니다.</div>}
        </div>
    )
}


function CartList(props) {
    let dispatch = useDispatch()
    let cartItems = useSelector(state => state.cart)
    let user = useSelector(state => state.user)
    return (
        <>
            <tbody>
                <tr>
                <td>{props.elem.id}</td>
                <td>{props.elem.name}</td>
                <td>{props.elem.count}</td>
                <td style={{textAlign: 'center'}}>
                    {/* 상품수량추가버튼 구현 */}
                    <button className="cartlist-button"
                     onClick={(e)=>{
                        // console.log(e.target.id)
                        dispatch(addNum(props.elem.id))
                    }}>+</button>
                    {/* 상품수량빼기버튼 구현 */}
                    <button className="cartlist-button" 
                     onClick={()=>{
                        dispatch(minusNum(props.elem.id))
                     }}
                    >-</button>
                    <button
                    onClick={()=>{
                        dispatch(deleteCart(props.elem.id))
                    }}
                    className="cartlist-button">
                        <i class="bi bi-trash3-fill"></i></button>
                </td>
                </tr>
            </tbody>
        </>
)
}











export default CartPage;