export const INITIAL_STATE = {
  cartItemList: []
  // cart: {
  //   total: 0.0
  // }
};

export const ADD_ITEM = "ADD_ITEM";
export const DEL_ITEM = "DEL_ITEM";

export interface CartItem {
  market: string;
  name: string;
  desc: string;
  cost: number;
  qty: number;
}

const rootReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        cartItemList: [...state.cartItemList, action.payload]
        // cart: {
        //   total: state.cart.total + (action.payload.cost * action.payload.qty)
        // }
      };
    case DEL_ITEM:
      return {
        cartItemList: [...state.cartItemList, action.payload]
        // cart: {
        //   total: state.cart.total
        // }
      };
    default:
      return state;
  }
};

export type CartState = ReturnType<typeof rootReducer>;

export default rootReducer;