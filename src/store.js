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
    },

    minusNum(state, action) {
      let index = state.findIndex((elem)=>{return elem.id == action.payload})
      
      if (state[index].count > 1) {
        state[index].count--
      } else {
        state.splice(index, 1)
      }
    },

    deleteCart(state, action) {
      let index = state.findIndex((elem)=>{return elem.id == action.payload})
      state.splice(index, 1)
    }
  }
})

let newOne = createSlice({
  name : 'new',
  initialState : '',
  reducers : {
    newCart(state, action){
      return action.payload
    }
  }
})

const productLikes = localStorage.getItem('productLike')

let like = createSlice({
  name : 'like',
  initialState : productLikes ? JSON.parse(productLikes) : {},
  
  reducers : {
    addLike(state, action) {
      const productId = action.payload;

      if (state[productId] == undefined ||
        state[productId] == 0
      ) {
        state[productId] = 1
      } else {
        state[productId] = 0;
      }

      localStorage.setItem('productLike', JSON.stringify(state))

    }
  }
})

export let { addLike } = like.actions;
export let { newCart } = newOne.actions;
export let { addNum, addCart, minusNum, deleteCart } = cart.actions;

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer,
    newOne : newOne.reducer,
    like : like.reducer
    },
});