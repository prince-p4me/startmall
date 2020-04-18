import { CategoryObj, ItemObj } from "./DomainModels";

export interface CategoryProps {
  category: CategoryObj;
}

export interface AddressProps {
  id: string;
}

export interface ContainerProps {
  name: string;
}

export interface MainTabsProps {
  name: string;
}

export interface PaymentProps {}

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
