import { SET_CURRENT_SHOP } from './Cart';
import { ShopStateType } from '../model/DomainModels';

export function setCurrentShop(shop: ShopStateType) {
  return {
    type: SET_CURRENT_SHOP,
    payload: shop,
  };
}
