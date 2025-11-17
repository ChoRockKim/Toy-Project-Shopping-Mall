import { createSlice } from '@reduxjs/toolkit';


let user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 20},
  reducers : {
    changeName(state){
      state.name = 'lee'
    },
    addAge(state, action) {
      state.age += action.payload
    }
  }
})

export default user;

export let { changeName, addAge } = user.actions