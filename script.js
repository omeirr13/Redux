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
        shop_name: "Pizza shop"
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
                pizzaBase: pizzaBase - 1
            }
        default:
            return state
    }
}