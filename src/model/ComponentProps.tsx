import { CategoryObj, ItemObj, AddressObj, PaymentObj, Markets, ShopStateType } from "./DomainModels";

export interface CategoryProps {
  market_id: string;
  category: CategoryObj;
}

export interface AddressProps {
  // id: string;
  address: AddressObj;
  // updateAddress: any;
  onAddressChange: any;
}

export interface ContainerProps {
  name: string;
}

export interface MainTabsProps {
  name: string;
}

export interface PaymentProps {
  payment: string;
  onChange: any
}

export interface CheckoutProps {
  completeHandler: any;
}

export interface ShopItemProps {
  item: ItemObj;
  market_id: string;
}

export interface MarketItemsProps {
  cname: string;
}

export interface CartProps {
  modal: boolean;
  closehandler: any;
}

export interface OrderDayShopHeaderProps {
  setShowModal: any;
  CartCounter: any;
}

export interface ShopHeaderProps {
  shop: ShopStateType;
}

export interface ShopSelectionListProps {
  handleShopClick: (shop: Markets) => void;
  shops: Markets[];
}

export interface CurrencyAmountProps {
  amount: any;
}
