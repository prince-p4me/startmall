import { FirebaseReducer, firebaseReducer } from "react-redux-firebase";
import { combineReducers, Reducer } from "redux";
import { AddressObj } from "../model/DomainModels";

export const INITIAL_STATE = {
  address1: "",
  address2: "",
  suburb: "",
  state: "",
  postcode: "",
  phone: "",
  email: ""
} as AddressObj;

export const ADD_ADDRESS1 = "ADD_ADDRESS1";
export const ADD_ADDRESS2 = "ADD_ADDRESS2";
export const ADD_SUBURB = "ADD_SUBURB";
export const ADD_STATE = "ADD_STATE";
export const ADD_PHONE = "ADD_PHONE";
export const ADD_POSTCODE = "ADD_POSTCODE";
export const ADD_EMAIL = "ADD_EMAIL";

export const addressReducer = (state = INITIAL_STATE, action: any) => {
  // export default function cartReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case ADD_ADDRESS1:
      return {
        ...state,
        address1: action.payload
      };
    case ADD_ADDRESS2:
      return {
        ...state,
        address2: action.payload
      };
    case ADD_SUBURB:
      return {
        ...state,
        suburb: action.payload
      };
    case ADD_STATE:
      return {
        ...state,
        state: action.payload
      };
    case ADD_POSTCODE:
      return {
        ...state,
        postcode: action.payload
      };
    case ADD_PHONE:
      return {
        ...state,
        phone: action.payload
      };
    case ADD_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    default:
      return state;
  }
};

export default addressReducer;
