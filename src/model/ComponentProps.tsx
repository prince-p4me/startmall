import { CategoryObj, ItemObj, AddressObj, PaymentObj } from "./DomainModels";
import { Markets } from "../services/FirebaseIniti";

export interface CategoryProps {
  market_id: string;
  category: CategoryObj;
}

export interface AddressProps {
  id: string;
  address: AddressObj | undefined;
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

export interface OrderDayShopHeaderProps {
  setShowModal: any;
  CartCounter: any;
}

export interface ShopHeaderProps {
  image_url: string;
}

export interface ShopSelectionListProps {
  handleShopClick: (id: string) => void;
  shops: Markets[] ;
}
