import {conFigureStore} from "@reduxjs/toolkit"
import cartSlice from "./cartSlice";

const store = conFigureStore({
    reducer:{
        cart:cartSlice,
    },

});



export default store;