import {createSlice} from "@reduxjs/toolkit";


const filtersSlice = createSlice({
  name:'filters',
  initialState:{
    searchText:''
  },
  reducers:{
    setSearchText:(state, action)=>{
      state.searchText = action.payload
    }
  }
})

export default filtersSlice
