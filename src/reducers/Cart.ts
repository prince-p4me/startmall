import React from "react";

export const INITIAL_STATE = {
  cartItemList: []  
};

export const ADD_ITEM="ADD_ITEM";
export const DEL_ITEM="DEL_ITEM";

export interface CartItem {
  market: string;
  name: string;
  desc: string;
  cost: number;
  qty: number;
}


const rootReducer =  (state = INITIAL_STATE, action : any ) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        cartItemList: [
          ...state.cartItemList,
          action.payload
        ]
      };
    case DEL_ITEM:
      return {
        cartItemList: [
          ...state.cartItemList,
          action.payload
        ]
      };
    default:
      return state;
  }
};

export type CartState = ReturnType<typeof rootReducer>;


export default rootReducer