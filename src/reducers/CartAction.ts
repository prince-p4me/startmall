import { CartItem, ADD_ITEM } from "./Cart";

export function addCartAction(newItem: CartItem) {
  return {
    type: ADD_ITEM,
    payload: newItem
  };
}
