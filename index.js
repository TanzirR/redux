import * as redux from "redux";

//Deprecated. Use redux toolkit which creates the boilerplate
const createStore = redux.createStore;

//Action
const ORDER_PIZZA = "ORDER_PIZZA";
const ORDER_BURGER = "ORDER_BURGER";

//**Action** creater is a function which returns the action
function orderPizza() {
  return {
    type: ORDER_PIZZA,
  };
}

function orderBurger() {
  return {
    type: ORDER_BURGER,
  };
}

const initialStatePizza = {
  //toppings: ["cheese", "tomato"],
  pizzaBase: 100,
};

const initialStateBurger = {
  burgerBuns: 50,
};

//**Reducer** is a function that changes the state. Need the in
// itial state and action
//Its a pure function thats why it does not change the original state.
const reducerPizza = (state = initialStatePizza, action) => {
  switch (action.type) {
    case ORDER_PIZZA:
      return {
        ...state,
        pizzaBase: state.pizzaBase - 1,
      };
    default:
      return state;
  }
};

const reducerBurger = (state = initialStateBurger, action) => {
  switch (action.type) {
    case ORDER_BURGER:
      return {
        ...state,
        burgerBuns: state.burgerBuns - 1,
      };
    default:
      return state;
  }
};

/*
Store (present in redux library) contains the applications entrie state

1. getState() to get current state
2. Register listeners via subscribe(listener). Listener is a 
   function that is executed anytime the state is changed
3. Update the state via dispatch(action)
4. Unsubscribe the store via function returned by subscribe(listener)



/*
Since there are two separate states, I can combine the reducers
using combineReducers method of redux library which accepts an object
with key as the state name and value as the reducer function
and returns a single reducer function

{ pizza: reducerPizza,
  burger: reducerBurger,
} 
OR if the key and value are same names:
{
  reducerPizza,
  reducerBurger,}

*/

const combinedReducer = redux.combineReducers({
  reducerPizza,
  reducerBurger,
});

//================== Store ===================
//1. store needs to holds the application state. the Reducer has the initialState as the parameter
const store = createStore(combinedReducer);
//2. get the current state using getState()
console.log("Initial State", store.getState());
//3. registers listeners via subscribe method
const unsubscribedPizza = store.subscribe(() =>
  console.log("Updated state", store.getState())
);
// Allow state to be updated via dispatch(action). Output will be in the format of combinedReducer function
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderBurger());
