import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function LastItem(props) {
    let [recentProduct, setRecentProduct] = useState([])


    let navigate = useNavigate()
    useEffect(()=>{

        let watched = JSON.parse(localStorage.getItem('watched'))
        watched == undefined ? watched = [] : watched = watched
        // console.log("스토리지 불러옴:", watched)

        let watched_data = watched.map((id)=>{
            return props.shoes.find((data)=>{return data.id == id})
        })
        
        let final_data = watched_data.filter(item => item != undefined);
        setRecentProduct(final_data)
        
    }, [props.recentPop])


    return(
        <div className={`last-item-list ${props.recentPop ? '' : 'inactive'}`}>
            {recentProduct.length != 0 ?
            recentProduct.map((data)=>{
                return(
                    <div key={data.id}
                    className="currentProducts" 
                    onClick={()=>{navigate(`/detail/${data.id}`)}}>{data.title}</div>
                )
            }) : <div>조회한 상품이 없습니다.</div>
        }</div>
    )
}

export default LastItem;