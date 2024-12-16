const redux = require('redux');
const createStore = redux.createStore;
const axios = require('axios');
const applyMiddleware = redux.applyMiddleware
const { thunk } = require('redux-thunk');

//Action constants
const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

//State
const initialState = {
    error: false,
    loading: false,
    products: []
}

//Action creators
function fetchRequest() {
    return {
        type: FETCH_REQUEST
    }
};
function fetchSuccess(products) {
    return {
        type: FETCH_SUCCESS,
        payload: products
    }
};
function fetchError() {
    return {
        type: FETCH_ERROR
    }
};


//reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            };
        case FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: false
            };
        default:
            return state;
    }
};


//thunk action creator
// const fetchProducts = () => {
//     return function (dispatch) {
//         dispatch(fetchRequest());
//         axios.get('https://fakestoreapi.com/products')
//             .then(response => {
//                 const products = response.data.map((product) => product.title);
//                 dispatch(fetchSuccess(products));
//             }).catch(error => {
//                 dispatch(fetchError());
//             });

//     }
// }
const fetchProducts = () => (dispatch) => {
    dispatch(fetchRequest());
    axios.get('https://fakestoreapi.com/products')
        .then(response => {
            const products = response.data.map((product) => product.title);
            dispatch(fetchSuccess(products));
        }).catch(error => {
            dispatch(fetchError());
        });

}
//creating store
const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));


store.dispatch(fetchProducts());


