import { CategoryObj, ItemObj, AddressObj, PaymentObj } from "./DomainModels";

export interface CategoryProps {
  category: CategoryObj;
}

export interface AddressProps {
  id: string;
  address: AddressObj  | undefined;

}

export interface ContainerProps {
  name: string;
}

export interface MainTabsProps {
  name: string;
}

export interface PaymentProps {
  payment: PaymentObj | undefined;
}

export interface CheckoutProps {
  completeHandler: any;
}

export interface ShopItemProps {
  item: ItemObj;
}

export interface MarketItemsProps {
  cname: string;
}

export interface CartProps {
  modal: boolean;
  closehandler: any;
}

export interface OrderDayShopHeaderProps{
  setShowModal: any;
  CartCounter: any;
}
