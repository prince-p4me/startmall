import {LOAD_WISHLIST} from './WishList'

export const loadWishList = (payload: []) => {
  return {
    type: LOAD_WISHLIST,
    payload
  };
};
