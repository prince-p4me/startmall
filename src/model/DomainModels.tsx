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
  address1: string;
  address2: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
}

export interface PaymentObj {
  cashOnDelivery: boolean;
  paypal: boolean;
  visaMaster: boolean;
}
