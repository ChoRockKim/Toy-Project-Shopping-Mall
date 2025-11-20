import { use, useContext, useState } from "react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from 'react-bootstrap/Nav';
import { Tab } from "bootstrap";
import { useDispatch } from "react-redux";
import { addCart, newCart } from './../store.js'
import AlertMessage from "./../components/Alert.jsx";
import axios from "axios";
import data from "../data.js";
import TabContent from "../components/TabContent.jsx";


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
  let [alertPop, setAlertPop] = useState(false)
  const alertTimer = useRef(null)

  // 최근 본 상품 로컬스토리지 추가 기능 구현
  useEffect(()=>{
    
    if (!cur_shoes) return;
    
    let watched = JSON.parse(localStorage.getItem('watched'))
    let cur_storage = watched ? watched : [];

    cur_storage.push(cur_shoes.id)
    cur_storage = Array.from(new Set(cur_storage))
    localStorage.setItem('watched', JSON.stringify(cur_storage))
  
  }, [cur_shoes])

  // 만약 shoes 데이터 아직가 없다??

  useEffect(()=>{

  if (cur_shoes) return;

  let data_num

  if (id>2 && id <6) {
    data_num = 2    
  } else if (id>5 && id < 9) {
    data_num = 3
  }

  if (data_num) {  
      axios.get(`https://codingapple1.github.io/shop/data${data_num}.json`)
      .then((result)=>{
        props.setShoes([...props.shoes, ...result.data])
      })
      .catch(()=>{
        console.log('실패')
      })
  }
  }, [])

  if (!cur_shoes) {
    return (<div>로딩중...</div>)
  }

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
              <div className="col-sm-6" style={{maxWidth : '400px'}}>
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
                  ));
                  dispatch(newCart(cur_shoes.title))

                  if (alertTimer.current) {
                    clearTimeout(alertTimer.current)
                  }

                  setAlertPop(true)
                  alertTimer.current = setTimeout(()=>{
                    setAlertPop(false)
                  }, 2000)
                }}
                className="">주문하기</button> <br/><br/>
                <input placeholder="수량을 입력해주세요" type="text" onChange={(e)=>{
                  setText(e.target.value)}} value={text} />
                  
                  
                  <AlertMessage alertPop={alertPop} setAlertPop={setAlertPop}/>
              
              
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


export default DetailPage;