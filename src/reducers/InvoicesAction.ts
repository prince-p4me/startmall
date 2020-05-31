import { LIST_INVOICES } from './Invoices'

export function listInvoices(payload:[]) {
  return {
    type: LIST_INVOICES,
    payload
  };
}
