import { InvoiceStateType, ShopStateType } from "../model/DomainModels";

export const INITIAL_STATE = {
  Invoices: [],
} as InvoiceStateType;

export const LIST_INVOICES = "LIST_INVOICES";

export const invoiceReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LIST_INVOICES:
      return {
        Invoices: action.payload
      };

    default:
      return state;
  }
};
