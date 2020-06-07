import { InvoiceStateType } from '../model/DomainModels';

export const INITIAL_STATE = {
  Invoices: [],
} as InvoiceStateType;

export const LIST_INVOICES = 'LIST_INVOICES';

export const invoiceReducer = (state = INITIAL_STATE, action: any) => {
  if (action.type === LIST_INVOICES) {
    return {
      Invoices: action.payload,
    };
  } else {
    return state;
  }
};
