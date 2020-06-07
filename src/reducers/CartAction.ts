import { ADD_ITEM, BLANK_CART, DEL_ITEM, DEL_ITEM_GROUP } from './Cart';
import { ItemObj } from '../model/DomainModels';

export const addCartAction = (newItem: ItemObj, market_id: string) => {
  return {
    type: ADD_ITEM,
    payload: newItem,
    market_id,
  };
};

export const delCartAction = (newItem: ItemObj, market_id: string) => {
  return {
    type: DEL_ITEM,
    payload: newItem,
    market_id,
  };
};

export const delItemGroup = (newItem: ItemObj, market_id: string) => {
  return {
    type: DEL_ITEM_GROUP,
    payload: newItem,
    market_id,
  };
};

export const blankCart = () => {
  return {
    type: BLANK_CART,
    payload: [],
  };
};
