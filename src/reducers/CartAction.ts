import { ADD_ITEM } from "./Cart";
import { CartItem } from "../model/DomainModels";

export function addCartAction(newItem: CartItem) {
  return {
    type: ADD_ITEM,
    payload: newItem
  };
}
