import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cartSlice.js"
import  userReducer  from "../features/userSlice.js";
import  drawerReducer  from "../features/drawerSlice.js";
import filterReducer from "../features/filterSlice.js"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        user:userReducer,
        drawer:drawerReducer,
        filter:filterReducer
      }
})

export default store;

