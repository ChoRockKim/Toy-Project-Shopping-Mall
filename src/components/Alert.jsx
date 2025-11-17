import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AlertMessage(props) {
    let temp
    let navigate = useNavigate()

    if (props.alertPop) {
        temp = "alert-popup"
    } else {
        temp = ""
    }

    let cartItems = useSelector(state => state.newOne)
    console.log(cartItems)

    return (
        <>
        <div className={`detail-alert-message ${temp}`}
        >{cartItems}를 장바구니에 담았습니다.
        <button
        onClick={()=>{
            navigate('/cart')
        }} 
        className="go-to-cart">장바구니 보기</button>
        </div>
        
        </>
    )
}

export default AlertMessage;