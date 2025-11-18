import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useActionState, useState } from "react";

function MainPage(props) {
    let [morebutton, setMorebutton] = useState(true)

  return (
      <>
        <div className='main-bg'></div>
        <div className='product-container'>
          <div className="row">
          {props.shoes.map((elem, i)=>{
            return (
              <ShoesInfo key={i} elem={elem} index={elem.id} />
            )
          })}
          </div>
        </div>

        {/* 가나다순 정렬 버튼 구현 */}
        <button 
        className="shoes-detail-button center-box"
        onClick={()=>{
          let copied_shoes = [...props.shoes];
          copied_shoes.sort((a,b)=>{
              if (a.title > b.title) {
                return 1
              } else {
                return -1
              }
            })
          props.setShoes(copied_shoes)}}>
          가나다순 정렬</button>

          {/* 더보기 버튼 구현 */}
          {props.morebutton &&
            <button 
          className="shoes-detail-button center-box"
          onClick={()=>{
                if (props.clicknum >=2) {
                    props.setMorebutton(false)
                }
                axios.get(`https://codingapple1.github.io/shop/data${props.clicknum+1}.json`)
                .then((result)=>{
                    props.setClicknum(props.clicknum+1)
                    let copied_data = [...props.shoes, ...result.data]
                    let unique_data = [...new Map(copied_data.map(elem=>[elem.id, elem])).values()]

                    props.setShoes(unique_data)
                })
                .catch(()=>{
                    console.log('실패')
                })
          }}>더 보기</button>}
      </>
  )
}

function ShoesInfo(props) {
    let navigate = useNavigate();

    return (
    <>  
      <div className="col-sm-6 col-md-4 product-box">
        <img src={`https://codingapple1.github.io/shop/shoes${props.index+1}.jpg`} className='product-img'/>
        <h4>{props.elem.title}</h4>
        <p>{props.elem.price}</p>
        <button className="shoes-detail-button under" onClick={()=>{
            navigate(`/detail/${props.index}`)

        }}>상세페이지</button>
      </div>
    </>
  )
}


export default MainPage;