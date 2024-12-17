import { createStore } from "redux";
import pizzaReducer from "./pizza/pizzaReducers";


const store = createStore(pizzaReducer); 

export default store;