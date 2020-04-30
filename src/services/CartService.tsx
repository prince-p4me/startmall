import { CartWithQty, CartStateType } from "../model/DomainModels";

export function ConvertCartWithQty(cart: CartStateType) {
  const cartListWithQty: CartWithQty[] = [];

  console.log(cart.cartItemList);
  cart.cartItemList.map(cartItem => {
    if (cartItem) {
      if (cartListWithQty[cartItem.id as any] == null) {
        cartListWithQty[cartItem.id as any] = {
          key: cartItem.id,
          item: cartItem,
          count: 0
        };
      }
      if (cartListWithQty[cartItem.id as any].count === 0) {
        cartListWithQty[cartItem.id as any].count = 1;
      } else {
        cartListWithQty[cartItem.id as any].count++;
      }
    }
    return {};
  });
  console.log(cartListWithQty);
  return cartListWithQty;
}
