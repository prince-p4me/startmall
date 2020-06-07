import { WishListStateType } from '../model/DomainModels';

export const INITIAL_STATE = {
  data: [],
} as WishListStateType;

export const LOAD_WISHLIST = 'LOAD_WISHLIST';

export const wishListReducer = (state = INITIAL_STATE, action: any) => {
  if (action.type === LOAD_WISHLIST) {
    return {
      data: action.payload,
    };
  } else {
    return state;
  }
};
