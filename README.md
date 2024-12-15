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

