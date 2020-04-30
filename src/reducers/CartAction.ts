import { ADD_ITEM, DEL_ITEM, DEL_ITEM_GROUP } from "./Cart";
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

