import { FirebaseReducer, FirestoreReducer } from "react-redux-firebase";
import { Reducer } from "redux";
import Market from "../containers/Market";
import { Address } from "cluster";
import { AddressInfo } from "net";

export interface CategoryObj {
  id: number;
  market: string;
  categoryName: string;
  imageUrl: string;
  [key: string]: string | number | null;
}

export interface ItemObj {
  market: string;
  itemName: string;
  itemDesc: string;
  itemCost: number;
  [key: string]: string | number | null;
}

export interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

export interface IFeed {
  description: string;
  title: string;
  pubDate: string;
}

export interface AddressObj {
  name: string;
  address1: string;
  address2: string;
  suburb: string;
  state: string;
  country: string;
  postcode: string;
  phone: string;
  email: string;
}

export interface PaymentObj {
  directDebit: boolean;
  cashOnDelivery: boolean;
  paypal: boolean;
  visaMaster: boolean;
}

export interface CartStateType {
  cartItemList: ItemObj[];
  cart: {
    total: number;
  };
}

export interface ShopStateType {
  shop: Markets;
}

export interface CartItem {
  [key: string]: string | number | [] | any | null;
  market: string;
  name: string;
  desc: string;
  cost: number;
  qty: number;
  category_id: string;
  category_name: string;
}

export interface CartWithQty {
  [key: string]: string | number | ItemObj | null;
  item: ItemObj;
  count: number;
}

// Optional: If you use the user profile option
export interface Profile {
  name: string;
  email: string;
}

// Optional: You can define the schema of your Firebase Redux store.
// This will give you type-checking for state.firebase.data.todos and state.firebase.ordered.todos
export interface Schema {
  markets: Market;
}

// If you have a todos collection, you might have this type
export interface Market {
  id: string;
  name: string;
}

// with both reducer types
export interface RootState {
  firebase: FirebaseReducer.Reducer<Profile, Schema>;
  firestore: Reducer<FirestoreReducer.Reducer>;
  cart: CartStateType;
  shop: ShopStateType;
  address: AddressObj
}

export interface Categories {
  img_url: string;
  name: string;
  id: number;
  load_order: number;
}
export interface Markets {
  [key: string]: string | number | [] | null;
  id: string;
  name: string;
  opening_hour: [];
  // imageUrl:string;
  // serviceOffering: string;
  // terms: string;
  free_delivery_conditions: string;
  img_url: string;
  store_address: string;
  support_postcodes: [];
  cut_off_terms: string;
  service_offering: string;
}

export interface Cart {
  [key: string]: string | number | [] | any | null;
  market: Markets,
  cart_items: ItemObj[];
}

export interface Invoice {
  [key: string]: string | number | [] | any | null;
  id: string;
  cart_items: CartItem[];
  user_id: string;
  address: AddressObj | {} | string | null | undefined;
  market_name: string;
  cart_total_cost_inc_GST: number;
  platform_charges: number;
  cut_off_terms: string | number | [] | null;
  batch_id: string;
  status: string; // open, close, cancelled
  payment_status: string; //pending, success
  order_date: string;
  delivery_date: string;
  // address_one_line: string;
  payment_type: string
}

export interface ProfileData {
  providerId: string | null | any;
  display_name: string;
  payment_detail: string;
  contact_mobile: string;
  address: AddressObj | any | {};
  photo_url: string;
  id: string;
  email: string;
}

export const ORDER_STATUS = { open: "open", close: "close", cancelled: "cancelled" };