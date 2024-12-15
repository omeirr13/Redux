const redux = require('redux');

const createStore = redux.createStore;

const ORDER_PIZZA = "ORDER_PIZZA";
// we may be using action multiple times, so its better to make constants to avoid spelling mistakes.

// const action = {
//     type: ORDER_PIZZA,
//     shop_name: "Pizza shop"
// }


//Action creator(a function that will returning action)

function orderPizza() {
    return {
        type: ORDER_PIZZA,
        payload: 90

    }
}

// Reducer(initial state and action)
const initialState = {
    pizzaBase: 100,
    toppings: ['cheese', 'capsicum']
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_PIZZA:
            return {
                ...state,
                pizzaBase: state.pizzaBase + action.payload
            }
        default:
            return state
    }
}


//1st responsibility
// Store needs to hold application state

const store = createStore(reducer);

//2 - it exposes a method called getStore which gives your application access to the current state in the store.
console.log('Initial state: ', store.getState());

//3 - Registers listeners via subscribe(listener)
const unsubcribe = store.subscribe(()=>{
    console.log("updated state", store.getState());
});

//4 - Allows state to be updated via dispatch(action)
store.dispatch({
    type: ORDER_PIZZA,
    payload: 90
})
// store.dispatch({
//     type: ORDER_PIZZA,
//     payload: 90
// })
// store.dispatch({
//     type: ORDER_PIZZA,
//     payload: 90
// })

//now if we want to dispatch this multiples places, we have to update payload everywhere...so we just have a action function, single place of modification.

store.dispatch(orderPizza());
unsubcribe();
store.dispatch(orderPizza());