import { ADD_ITEM, DEL_ITEM, DEL_ITEM_GROUP, BLANK_CART } from "./Cart";
import { ItemObj } from "../model/DomainModels";

export function addCartAction(newItem: ItemObj, market_id: string) {
  return {
    type: ADD_ITEM,
    payload: newItem,
    market_id
  };
}

export function delCartAction(newItem: ItemObj, market_id: string) {
  return {
    type: DEL_ITEM,
    payload: newItem,
    market_id
  };
}

export function delItemGroup(newItem: ItemObj, market_id: string) {
  return {
    type: DEL_ITEM_GROUP,
    payload: newItem,
    market_id
  };
}

export function blankCart() {
  return {
    type: BLANK_CART,
    payload: []
  };
}
