import * as Types from "./Address";

export function addAddress1Action(newItem: string) {
  console.log("Types.ADD_ADDRESS1");
  return {
    type: Types.ADD_ADDRESS1,
    payload: newItem
  };
}

export function addAddress2Action(newItem: string) {
  return {
    type: Types.ADD_ADDRESS2,
    payload: newItem
  };
}

export function addSubUrbAction(newItem: string) {
  return {
    type: Types.ADD_SUBURB,
    payload: newItem
  };
}

export function addStateAction(newItem: string) {
  return {
    type: Types.ADD_STATE,
    payload: newItem
  };
}

export function addPhoneAction(newItem: string) {
  return {
    type: Types.ADD_PHONE,
    payload: newItem
  };
}


export function addEmailAction(newItem: string) {
  return {
    type: Types.ADD_EMAIL,
    payload: newItem
  };
}

export function addPostCodeAction(newItem: string) {
  return {
    type: Types.ADD_POSTCODE,
    payload: newItem
  };
}