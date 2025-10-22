import * as redux from "redux"

//Deprecated. Use redux toolkit which creates the boilerplate
const createStore = redux.createStore;
//Action
const ORDER_PIZZA = 'ORDER_PIZZA'

// const action = {
//   type: ORDER_PIZZA,
//   shop_name: "pizza shop"
// }

//**Action** creater is a function which returns the action
function orderPizza(){
  return {
    type: ORDER_PIZZA,
    shop_name: "pizza shop"
  }
}
//**Reducer** is a function that changes the state. Need the initial state and action
//Its a pure function thats why it does not change the original state.
const initialState = {
  toppings: ["cheese", "tomato"],
  pizzaBase: 100
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case ORDER_PIZZA:
      return {
        ...state,
        pizzaBase : state.pizzaBase - 1
      }
    default:
      return state
  }
}

/*
Store (present in redux library) contains the applications entrie state

1. getState() to get current state
2. Register listeners via subscribe(listener). Listener is a 
   function that is executed anytime the state is changed
3. Update the state via dispatch(action)
4. Unsubscribe the store via function returned by subscribe(listener)
*/

//1. store needs to holds the application state. the Reducer has the initialState as the parameter
const store = createStore(reducer)
//2. get the current state using getState()
console.log("Initial State", store.getState())
//3. registers listeners via subscribe method 
const unsubscribe = store.subscribe(()=>console.log("Updated state", store.getState()))
// Allow state to be updated via dispatch(action)
store.dispatch(orderPizza())
store.dispatch(orderPizza())
console.log("After unsubscribing")
unsubscribe()
store.dispatch(orderPizza())
