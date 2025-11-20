import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addLike } from "../store";

function ShoesInfo(props) {
    let navigate = useNavigate();
    
    let like = useSelector(state => state.like[props.elem.id]) || 0;
    let dispatch = useDispatch()

    return (
    <>  
      <div className="col-sm-6 col-md-4 product-box">
        <img src={`https://codingapple1.github.io/shop/shoes${props.index+1}.jpg`} className='product-img'/>
        <h4>{props.elem.title}</h4>
        <p>{props.elem.price}</p>
        <button className="shoes-detail-button under" onClick={()=>{
            navigate(`/detail/${props.index}`)

        }}>상세페이지</button>
        <button onClick={()=>{dispatch(addLike(props.elem.id))}} className="heart-button">
          {like} {like == 0 ? <i className="bi bi-heart"></i>
          :<i className="bi bi-heart-fill"></i>}
        </button>
      </div>
    </>
  )
}

export default ShoesInfo;