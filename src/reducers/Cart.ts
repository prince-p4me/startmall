import { FirebaseReducer, firebaseReducer } from "react-redux-firebase";
import { combineReducers, Reducer } from "redux";
import { CartStateType, ShopStateType } from "../model/DomainModels";
import addressReducer from "./Address";

export const INITIAL_STATE = {
  cartItemList: [],
  cart: {
    total: 0.0
  }
} as CartStateType;

export const ADD_ITEM = "ADD_ITEM";
export const DEL_ITEM = "DEL_ITEM";
export const DEL_ITEM_GROUP = "DEL_ITEM_GROUP";
export const SET_CURRENT_SHOP = "SET_CURRENT_SHOP";

export const cartReducer = (state = INITIAL_STATE, action: any) => {
  var x = 0;
  // export default function cartReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case ADD_ITEM:
      // console.log("adding");
      return {
        cartItemList: [...state.cartItemList, action.payload],
        cart: {
          total: (parseFloat(state.cart.total.toString()) +
            parseFloat(action.payload.unit_price))
        }
      };
    case DEL_ITEM:
      return {
        cartItemList: [
          ...state.cartItemList
            .map(obj => {
              if (x === 0 && obj.id === action.payload.id) {
                x = 1;
                return null;
              }
              return obj;
            })
            .filter(obj => obj != null)
        ],
        cart: {
          total: (parseFloat(state.cart.total.toString()) +
            parseFloat(action.payload.unit_price))
        }
      };
    case DEL_ITEM_GROUP:
      var total = 0;
      var newlist = state.cartItemList
        .map(obj => {
          if (obj.id === action.payload.id) {
            return null;
          }
          total += obj.unit_price ? (parseFloat(obj.unit_price.toString())) : 0;
          return obj;
        })
        .filter(obj => obj != null);
      return {
        cartItemList: [...newlist],
        cart: {
          total: total
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
  shop: Reducer<ShopStateType>;
}

export const shopReducer = (state = { shop: {} }, action: any) => {
  switch (action.type) {
    case SET_CURRENT_SHOP:
      return action.payload;
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  cart: cartReducer,
  shop: shopReducer,
  address: addressReducer
});

export default rootReducer;
