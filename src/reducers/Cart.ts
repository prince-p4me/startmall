import { FirebaseReducer, firebaseReducer } from "react-redux-firebase";
import { combineReducers, Reducer } from "redux";
import { CartStateType } from "../model/DomainModels";

export const INITIAL_STATE = {
  cartItemList: [],
  cart: {
    total: 0.0
  }
} as CartStateType;

export const ADD_ITEM = "ADD_ITEM";
export const DEL_ITEM = "DEL_ITEM";

export const cartReducer = (state = INITIAL_STATE, action: any) => {
  // export default function cartReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        cartItemList: [...state.cartItemList, action.payload],
        cart: {
          total: ((state.cart.total as number) +
            action.payload.unit_price) as number
        }
      };
    case DEL_ITEM:
      return {
        cartItemList: [
          ...state.cartItemList.map((obj, x=0) => {
            if (x===0 && obj.id === action.payload.id) {
              x=1;
              return null;
            }
            return obj;
          }).filter(obj => obj != null)
        ],
        cart: {
          total: ((state.cart.total as number) -
            action.payload.unit_price) as number
        }
      };
    default:
      return state;
  }
};

// Optional: If you use the user profile option
interface Profile {
  name: string;
  email: string;
}

// Optional: You can define the schema of your Firebase Redux store.
// This will give you type-checking for state.firebase.data.todos and state.firebase.ordered.todos
interface Schema {
  markets: Market;
}

// If you have a todos collection, you might have this type
interface Market {
  id: string;
  name: string;
}

// with both reducer types
interface RootState {
  firebase: FirebaseReducer.Reducer<Profile, Schema>;
  cart: Reducer<CartStateType>;
}

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  cart: cartReducer
});

export type CartState = ReturnType<typeof rootReducer>;

export default rootReducer;
