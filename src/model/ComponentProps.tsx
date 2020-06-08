import { AddressObj, CategoryObj, Invoice, ItemObj, Markets, ShopStateType } from './DomainModels';

export interface CategoryProps {
  market_id: string;
  category: CategoryObj;
  shop: Markets | null | {};
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
  onChange: any;
}

export interface CheckoutProps {
  completeHandler: any;
}

export interface StripePaymentProps {
  paymentMode: 'applePay' | 'visaCard' | 'all';
  completeHandler: any;
  invoice: Invoice;
}

export interface ShopItemProps {
  item: ItemObj;
  market_id: string;
  category_id: string;
}

export interface MarketItemsProps {
  cname: string;
}

export interface CartProps {
  modal: boolean;
  closeHandler(goBack: boolean): any;
}

export interface LanguageSelectionProps {
  modal: boolean;
  closeHandler(goBack: boolean): any;
}

export interface OrderDayShopHeaderProps {
  setShowModal: any;
  CartCounter: any;
}

export interface ShopHeaderProps {
  shop: ShopStateType;
  marketId?: string;
}

export interface ShopSelectionListProps {
  handleShopClick: (shop: Markets) => void;
  shops: Markets[];
}

export interface CurrencyAmountProps {
  amount: any;
}

export interface ErrorProps {
  type: any;
  message: any;
  showError: boolean;
  autoHide: boolean;
  buttonText: any | null;
}

export interface ErrorDisplayProps {
  errorProps: ErrorProps;
  closeHandler?: any;
  eventHandler?: any | null;
}

export interface MarketHeaderProps {
  setShowModal: any;
  shop: Markets | any;
  CartCounter: any;
  showTerms?: boolean;
}
