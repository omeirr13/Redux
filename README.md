# Redux

- Redux is a predictable state container for javascript apps.
predictable?
In redux all state transitions are explicit, and it is possible to keep track of all of them.
## Why do we need redux?
- React is all about building reusable components, and each components data can be handled using state
- Lets say we have two components User Component, Form Component who are siblings and their parent is App Component
-               App
-           /       \
-       User        Form
-   Form Component we have state: 
`
{
    username: "",
    email: "",
    password: "",
    verified: false
}
`

- User Component we have state
`
    {
        user: []
    }
`
- In react each component will have data and UI logic.
- Whenever any change in data, component will rerender to keep the data in sync with the UI.

## Display username who has logged in inside the user name
- This entire state is in form component, i cannot send data from form component to user component as they are sibling components.
### Solution 1:
- we will have  entire state of form inside our app component, and later on this data can be passed to user component and form component using props drilling. This concept is known **as lifting the state up**
### Solution 2:
- Create a separate container inside which we have inside application state
`
{
    username: "",
    email: "",
    password: "",
    verified: false,
    user: []
}
`
- This container will be holding entire application state, this is called store.
- Now User component can request from store, we dont have to lift the state up as entire central state is managed in one central place.


# Why we actually need redux?
- Lets say we have very nested components, and we want to use data of components at left and right ends..we will need to have that state in top most component and prop drill from there. and we also may need to pass data to components that dont need that data to ultimately make that data reach the target component where its needed,
- If any sibling component needs data, data has to be lifted up to closest parent.

# useContext or Redux?
- useContext:  allows us to consume props within the component tree without prop drilling.
- Redux: used to manage state of our entire application

- Using useContext and useReducer combination will offer same thing as redux, can be alternative.

- useContext is best suited for small to medium sized application, it can be difficult to manage when the app scales or when there are multiple context to handle.
[![useContext or Redux](https://i.imghippo.com/files/UGNe7406CM.png "useContext or Redux")](https://i.imghippo.com/files/UGNe7406CM.png "useContext or Redux")


- Redux has centralized state management, debugging is easier. In context API it can get fragmented accross multiple context providers as the app grows.

- Middleware for sideeffects: Middleware likes redux thunk or redux saga allows us to handle side effects(eg. async operations like API calls) in a structured and scaleable manner. This makes it easier to manage asynchronous logic. Context API does not have this

- Redux comes with redux devtools like tracking state changes, time travel and inspecting dispatched actions. Context API lacks built in developer tools making debugging and tracking changes more difficult, especially when state is complex or deeply nested.

- Separation of concerns: Redux encourages a clear separation between actions(what happens), reducers(how state changes), and the UI(how state is updated), this can make larger apps maintainable. Context API tends to combine the state and logic within the same provider component, which is less separation.

- Consistency and eco-system: has a vast eco-system of tools, middleware and extension(Redux toolkit) that make state management tasks easier, Does not have such an eco system and lacks these advanced integrations.

- Immutability and pure functions: redux enforces strict immutable state structure through reducers, which help to prevent unintended mutations and make state transitions more predictable. Context API we have to manage immutability, which can lead to more mistakes in larger apps.

## So when to use redux?
- We could use in an application where we have considerable number of components that need to share state


## useReducer hook
- is an alternative way of setting and managing state.
`const [state, dispatch] = useReducer(reducer, initialState);`
-- Whenever we want to update the state in a component from an event handler, we create an action..an action is an object that has info how state will be updated, then we will call dispatch we will call the action, once we have called dispatch function the action will be passed inside our reducer function, reducer will take currentState and action as argument and will return the nextState, and then we will rerender our component.

## Mechanism of redux:
-- everything is same except two more things.
- in redux directly we will not dispatch the action to the reducer, instead we will dispatch the action inside our store 

- Each reducer is a pure function that has the single task of calculating the next state based on the action that was dispatched to the store and the current store thats already in the store.
- we should have one reducer per feature.

- entire thing is same only difference is directly we are not dispatching action to the reducer, instead we are dispatching inside the store, where we are having multiple reducers

### In real world(Action Creator)
- whenever we are using redux, directly we will not pass action inside dispatch function, we are going to create an action creator which will be returning action for us.
- **Advantage: ** we will be keeping all our actions in one place, which will be reducing a lot of bugs, as developers dont have to remember exact action type string..this action creator is optional. 
    
## Middleware
- We can extend functionality of redux by using it.
- It is suggested way to extend redux with custom functionality
- lets say i want to make an async api call, we cant write it in reducers...as in reducer we cant write any async operation, as reducers are pure functions, which means we cannot write any code which have some side effect.

- Redux store only knows how to synchronously dispatch actions and update the state

** -- Should we fetch data inside component?**
should we fetch data inside the component and then dispatch an action to the store with that received data?
- yes it is possible, but fetching api data inside component is not ideal solution, we should keep component clean and not write entire async code in component.
- our entire data fetching logic has to be encapsulated all in one place, and not be split throughout the application. 

**middleware is a function that sits between dispatching the action and the store
This allows us to run the code after dispatching, but before reaching the reducer in the store**
- with a middle ware we can do something with the action before that action actually gets into the reducer.

# Redux Thunk
- It is a middleware
- Thunk allows redux to wait before dispatching fetch data inside the store.
- we use thunk in order to defer dispatch into the future, at the point data from api has arrived.

- till now we saw action creator will return action object, but now it will return a function


## Why we are creating thunk action creators?
- Because reducers are pure functions, we can not write any sideeffect code..but using thunk middleware we can create action creator which will be returning function and this function does not have to be pure.