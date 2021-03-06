import { FirebaseReducer, firebaseReducer } from 'react-redux-firebase';
import { combineReducers, Reducer } from 'redux';
import { CartStateType, ShopStateType } from '../model/DomainModels';
import { filter, sumBy } from 'lodash';

export const INITIAL_STATE = {
  cartItemList: [],
  cart: {
    total: 0.0,
    marketId: '',
  },
} as CartStateType;

export const ADD_ITEM = 'ADD_ITEM';
export const DEL_ITEM = 'DEL_ITEM';
export const DEL_ITEM_GROUP = 'DEL_ITEM_GROUP';
export const SET_CURRENT_SHOP = 'SET_CURRENT_SHOP';
export const BLANK_CART = 'BLANK_CART';

const format = (num: any, minDecimals: number, maxDecimals: number) =>
  num.toLocaleString('en-US', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });

export const cartReducer = (state = INITIAL_STATE, action: any) => {
  let x = 0;
  switch (action.type) {
    case ADD_ITEM:
      if (action.market_id !== state.cart.marketId) {
        state = INITIAL_STATE;
      }
      return {
        cartItemList: [...state.cartItemList, action.payload],
        cart: {
          total: format(
            parseFloat(state.cart.total.toString()) +
              parseFloat(action.payload.unit_price ? action.payload.unit_price : 0),
            2,
            2,
          ),
          marketId: action.market_id,
        },
      };
    case DEL_ITEM:
      if (action.market_id !== state.cart.marketId) {
        state = INITIAL_STATE;
      }
      return {
        cartItemList: [
          ...state.cartItemList
            .map((obj) => {
              if (x === 0 && obj.id === action.payload.id) {
                x = 1;
                return null;
              }
              return obj;
            })
            .filter((obj) => obj != null),
        ],
        cart: {
          total: format(
            parseFloat(state.cart.total.toString()) -
              parseFloat(action.payload.unit_price ? action.payload.unit_price : 0),
            2,
            2,
          ),
          marketId: action.market_id,
        },
      };
    case DEL_ITEM_GROUP:
      if (action.market_id !== state.cart.marketId) {
        state = INITIAL_STATE;
      }
      const newList = filter(state.cartItemList || [], (i) => i.id !== action.payload.id);
      const total = sumBy(newList, (i) => parseFloat(i.unit_price as string));
      return {
        cartItemList: [...newList],
        cart: {
          total: total,
          marketId: action.market_id,
        },
      };
    case BLANK_CART:
      return {
        cartItemList: [],
        cart: {
          total: 0,
          marketId: action.market_id,
        },
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
  if (action.type === SET_CURRENT_SHOP) {
    return action.payload;
  } else {
    return state;
  }
};
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  cart: cartReducer,
  shop: shopReducer,
});

export default rootReducer;
