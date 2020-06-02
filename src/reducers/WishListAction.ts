import { LOAD_WISHLIST } from './WishList'

export function loadWishList(payload:[]) {
  return {
    type: LOAD_WISHLIST,
    payload
  };
}
