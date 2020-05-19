import { ADD_ITEM, DEL_ITEM, DEL_ITEM_GROUP, BLANK_CART } from "./Cart";
import { ItemObj } from "../model/DomainModels";

export function addCartAction(newItem: ItemObj) {
  return {
    type: ADD_ITEM,
    payload: newItem
  };
}

export function delCartAction(newItem: ItemObj) {
  return {
    type: DEL_ITEM,
    payload: newItem
  };
}

export function delItemGroup(newItem: ItemObj) {
  return {
    type: DEL_ITEM_GROUP,
    payload: newItem
  };
}

export function blankCart() {
  return {
    type: BLANK_CART,
    payload: []
  };
}