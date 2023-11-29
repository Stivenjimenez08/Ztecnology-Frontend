import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
// import rootReducer from './reducers'

const store = configureStore({
    reducer:{
        auth: authSlice
    }
})

export default store