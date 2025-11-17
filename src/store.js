import { configureStore, createSlice, current } from '@reduxjs/toolkit';
import user from './../src/store/userSlice';


let stock = createSlice({
  name : 'stock',
  initialState : [10, 11, 12]
})

let cart = createSlice({
  name : 'cart',
  initialState : [],
  
  reducers : {
    addNum(state, action){
      console.log(action.payload)
      state.find((elem)=>{
        elem.id == action.payload && elem.count++
      })
    },

    addCart(state, action){
      let isExist = state.find((elem)=>{return elem.id == action.payload.id})
      
      if (isExist) {
        isExist.count++
      } else {
        state.push(action.payload)
      }
      console.log(current(state))
    }
  }
})

export let { addNum, addCart } = cart.actions;

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
    },
});