const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const ORDER_PIZZA = "ORDER_PIZZA";
const ORDER_BURGER = "ORDER_BURGER";
function orderPizza() {
    return {
        type: ORDER_PIZZA,
        payload: 90
    }
}

function orderBurger() {
    return {
        type: ORDER_BURGER,
    }
}

// Reducer(initial state and action)
const initialStatePizza = {
    pizzaBase: 100,
    toppings: ['cheese', 'capsicum']
};
const initialStateBurger = {
    burgerBase: 100,
    toppings: ['cheese', 'capsicum', 'tomato']
};



const reducerPizza = (state = initialStatePizza, action) => {
    switch (action.type) {
        case ORDER_PIZZA:
            return {
                ...state,
                pizzaBase: state.pizzaBase - 1
            }
        default:
            return state
    }
}
const reducerBurger = (state = initialStateBurger, action) => {
    switch (action.type) {
        case ORDER_BURGER:
            return {
                ...state,
                burgerBase: state.burgerBase - 1
            }
        default:
            return state
    }
}


const rootReducer = combineReducers({
    pizza: reducerPizza,
    burger: reducerBurger
});

const store = createStore(rootReducer);
console.log('Initial state: ', store.getState());

const unsubcribe = store.subscribe(() => {
    console.log("updated state", store.getState());
});

store.dispatch({
    type: ORDER_PIZZA,
    payload: 90
});

//both reducers will take the action, one will accept one will reject
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderBurger());