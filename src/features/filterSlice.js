import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    objFilter: {
        gender: [],
        size: [],
        category: []
    },
    optionFilter:{},
    currentPage: 1
};

const filterSlice = createSlice({
    name: "filterush",
    initialState,
    reducers: {
        setGender: (state, action) => {
            state.objFilter = { gender: action.payload, size: [], category: [] };
            state.currentPage = 1; // איפוס עמוד
        },
        setCategory: (state, action) => {
            state.objFilter = { ...state.objFilter, category: action.payload };
            state.currentPage = 1;
        },
        setSize: (state, action) => {
            state.objFilter = { ...state.objFilter, size: action.payload };
            state.currentPage = 1;
        },
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
       
        setOption: (state, action) => {
            state.optionFilter = action.payload;
            console.log(action.payload, "action.payload");
        },
        setObjFilter:(state,action)=>{
            state.objFilter = action.payload;
            console.log(action.payload, "action.payload");
        },
        // resetObjFilter:(state,action)=>{
        //     return initialState; // מחזיר את ה-state ההתחלתי
        // }
    }
            
});

export const { setSize,setCategory,setGender,setPage ,setOption,setObjFilter } = filterSlice.actions;
export default filterSlice.reducer;
