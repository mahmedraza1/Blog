import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";


const store = configureStore({
    reducer:{
        // Reducers Go here
        auth: authReducer
    }
})

export default store;