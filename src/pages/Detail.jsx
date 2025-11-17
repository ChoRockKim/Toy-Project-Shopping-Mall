import { use, useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from 'react-bootstrap/Nav';
import { Tab } from "bootstrap";
import { useDispatch } from "react-redux";
import { addCart } from './../store.js'

function DetailPage(props) {


  let {id} = useParams();
  let [text, setText] = useState('')


  useEffect(()=>{
    console.log(isNaN(Number(text)))
    if (isNaN(Number(text))) {
      alert('숫자를 입력해주세요')
      setText('')
    }
  }, [text])

  // find 함수를 위한 콜백함수 정의
  function isSame(element) {
    if (element.id == id) {
      return true;
    }
  }
  let [count, setCount] = useState(0);

  // find 함수를 이용해 실제 제품 id = url 파라미터인 객체 반환
  const cur_shoes = props.shoes.find(isSame)
  // console.log(cur_shoes)

  // 페이지 로드시 opacity 변경 애니메이션 구현
  let [detailFade, setDetailFade] = useState('')
  
  useEffect(()=>{
    setTimeout(()=>{
      setDetailFade('end')
    }, 10)
  }, [])

  let [tabs, setTabs] = useState(0)
  let dispatch = useDispatch()


  return (
          // 뒤로가기 버튼 구현
          <div className={`container detail-container start ${detailFade}`}>
            {/* <BackButton>하위</BackButton> */}
            <button className="shoes-detail-button"
            onClick={()=>{
              props.navigate(-1)
            }}
            >뒤로가기</button>

            {/* 상품 정보 구현 */}
            <div className="row">
              <div className="col-sm-6">
                <img src={`https://codingapple1.github.io/shop/shoes${Number(cur_shoes.id)+1}.jpg`} width="100%" />
              </div>
              <div className="col-sm-6">
                <h4 className="pt-5">{cur_shoes.title}</h4>
                <p>{cur_shoes.content}</p>
                <p>{cur_shoes.price}</p>
                
                {/* 장바구니 담기 기능 추가 */}
                <button
                onClick={()=>{
                  dispatch(addCart(
                    {id : cur_shoes.id,
                    name : cur_shoes.title,
                    count : 1}
                  ))
                }}
                
                className="btn btn-danger">주문하기</button> <br/><br/>
                <input type="text" onChange={(e)=>{
                  setText(e.target.value)}} value={text} />
              </div>
            </div>

            {/* 탭 기능 구현 */}
            <br></br>
            <Nav variant="tabs" defaultActiveKey="link-1">
                  <Nav.Item>
                    <Nav.Link onClick={()=>{setTabs(0)}}
                     eventKey="link-1">상세정보</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={()=>{setTabs(1)}}
                     eventKey="link-2">구매후기</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={()=>{setTabs(2)}}
                     eventKey="link-3">상품 Q&A</Nav.Link>
                  </Nav.Item>
            </Nav>

            {/* 탭 내용 구현 */}
            <TabContent tabs={tabs} shoes = {props.shoes}/>
            
          </div> 
  )

}

// function TabContent(props){
//   return( 
//             [<div>내용1</div>,
//             <div>내용2</div>,
//             <div>내용3</div>][props.tabs]
//         )
// }



function TabContent({ tabs, shoes }) {
  let [fade, setFade] = useState('')
  useEffect(()=>{
    let a = setTimeout(()=>{setFade('end')}, 10)

    return ()=> {
      clearTimeout(a)
      setFade('')
    }

  }, [tabs])

  // 1. 탭 내용을 배열에 순서대로 담습니다.
  let tabContents = [
    
    // [0번째 탭] : 상세 정보
    (
      <div style={{ paddingTop: '20px' }}>
        <h4>상품 상세 정보</h4>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li><strong>모델명:</strong> {`SH-${Math.floor(Math.random() * 10000)}`}</li>
          <li><strong>소재:</strong> 겉감(캔버스), 안감(면), 밑창(고무)</li>
          <li><strong>제조국:</strong> 베트남</li>
          <li><strong>제조사:</strong> (주)리액트신발</li>
          <li><strong>굽 높이:</strong> 약 2.5cm</li>
          <li style={{ marginTop: '10px' }}>
            <strong>세탁 방법:</strong><br />
            오염된 부분만 중성세제를 묻힌 천으로 가볍게 닦아주세요.<br />
            물세탁 및 드라이클리닝은 피해주세요.
          </li>
        </ul>
      </div>
    ),
    
    // [1번째 탭] : 구매 후기
    (
      <div style={{ paddingTop: '20px' }}>
        <h4>구매 후기 (총 3건)</h4>
        
        <div style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
          <strong>김*수 (★★★★★)</strong>
          <p style={{ margin: '5px 0 0 0' }}>
            정사이즈로 샀는데 아주 편안하게 잘 맞습니다. 배송도 빨랐어요!
          </p>
        </div>
        <div style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
          <strong>박*영 (★★★★☆)</strong>
          <p style={{ margin: '5px 0 0 0' }}>
            디자인은 화면이랑 똑같이 예쁜데, 발볼이 넓으신 분은 한 사이즈 업 하시는 걸 추천합니다.
          </p>
        </div>
        <div style={{ padding: '10px 0' }}>
          <strong>이*훈 (★★★★★)</strong>
          <p style={{ margin: '5px 0 0 0' }}>
            데일리로 신기 너무 좋아요. 쿠션감이 생각보다 좋네요.
          </p>
        </div>
      </div>
    ),
    
    // [2번째 탭] : 배송/환불 안내
    (
      <div style={{ paddingTop: '20px' }}>
        <h4>배송 및 교환/환불 안내</h4>
        
        <h5 style={{ marginTop: '15px' }}>[배송 안내]</h5>
        <p>
          - CJ대한통운 (1588-1255)을 통해 배송됩니다.<br />
          - 평일 오후 3시 이전 결제 완료 건은 당일 발송을 원칙으로 합니다.<br />
          - 배송 기간은 발송일로부터 평균 1~3일 소요됩니다. (주말/공휴일 제외)
        </p>
        
        <h5 style={{ marginTop: '15px' }}>[교환 및 환불]</h5>
        <p>
          - 상품 수령일로부터 7일 이내에 본사 고객센터로 신청 가능합니다.<br />
          - 고객 단순 변심으로 인한 교환/환불 시 왕복 배송비(6,000원)가 부과됩니다.<br />
          - 상품 택(Tag) 제거, 구성품 분실, 사용 흔적이 있는 경우 교환/환불이 불가합니다.
        </p>
      </div>
    )
  ];

  // 2. props로 받은 tabs (0, 1, 2)를 배열의 index로 사용
  return (
    <div className={`start ${fade}`}>
      {tabContents[tabs]}
    </div>
  )
}

export default DetailPage;