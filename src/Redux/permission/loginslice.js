import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginList:localStorage.getItem("loginList")? JSON.parse(localStorage.getItem("loginList")):[],
   
}


export const loginslice = createSlice({
  
  name: 'loginReducer',
initialState:initialState,
  reducers: {
    loadlogindata:(state,action)=>{
          
        state.loginList.push(action.payload)
       
        localStorage.setItem("loginList",JSON.stringify(state.loginList))
    },
    removelogin:(state,action)=>{
        state.loginList = []
    localStorage.setItem("loginList",JSON.stringify(state.loginList))
       
    }


 
    
  },
})

// Action creators are generated for each case reducer function
export const { loadlogindata,removelogin} = loginslice.actions

export default loginslice.reducer