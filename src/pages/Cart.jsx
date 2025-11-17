import { useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, addAge } from './../store/userSlice';
import { addNum } from './../store.js'
 

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
                    <th>변경하기</th>
                    </tr>
                </thead>

                {cartItems.map((elem, i)=> 
                    <CartList idx = {i} elem = {elem} key={i}/>    
                    )}


            </Table> 

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
                <td>
                    <button id={props.elem.id} onClick={(e)=>{
                        // console.log(e.target.id)
                        
                        dispatch(addNum(Number(e.target.id)))

                    }}>+</button>
                </td>
                </tr>
            </tbody>
        </>
)
}











export default CartPage;