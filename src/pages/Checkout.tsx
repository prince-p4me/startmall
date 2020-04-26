import {
  IonContent,
  IonPage,
  IonButton,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonItemDivider,
  IonFooter,
  IonImg
} from "@ionic/react";
import React, { useState } from "react";
import { CartState } from "../reducers/Cart";
import { connect } from "react-redux";
import ItemList from "../components/ItemList";
import Address from "../components/Address";
import Payment from "../components/Payment";
import { useHistory } from "react-router-dom";
import { closeOutline } from "ionicons/icons";
import { CheckoutProps } from "../model/ComponentProps";
import { AddressObj, PaymentObj } from "../model/DomainModels";
import ShopHeader from "../components/ShopHeader";
import ShopConditionAndOperatingHours from "../components/ShopConditionAndOperatingHours";

const Checkout: React.FC<CheckoutProps> = () => {
  let history = useHistory();
  const [addressObject] = useState<AddressObj>();
  const [paymentOption] = useState<PaymentObj>();
  const [cartState, setCartState] = useState<CartState>({
    cartItemList: [],
    cart: {
      total: 0.0
    }
  });

  function mapStateToProps(state: CartState) {
    const { cartItemList, cart } = state;
    setCartState(state);
    return { cartItemList, cart };
  }

  const CartItemList = connect(mapStateToProps)(ItemList);

  const handleComplete = async () => {
    history.push("/");
    // setHide(true);
    // if (thisEl != null) {
    //   thisEl.current.remove();
    // }
    console.log("Did I go back?");
    // completeHandler();
  };

  const closehandler = async () => {
    history.goBack();
  };

  return (
    <IonPage id="checkout">
      <IonToolbar color="secondary">
        <IonButtons slot="end">
          <IonButton onClick={closehandler}>
            <IonIcon
              size="large"
              slot="icon-only"
              icon={closeOutline}
            ></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <ShopHeader />
        <CartItemList />
        <IonItem>
          <IonLabel>Total incl GST ${cartState.cart.total}</IonLabel>
        </IonItem>
        <ShopConditionAndOperatingHours />
        <IonLabel>
          <h1>Where to? </h1>
        </IonLabel>
        <Address id="123" address={addressObject} />
        <IonLabel>
          <h1>How to Pay?</h1>
        </IonLabel>
        <Payment payment={paymentOption} />
        <IonItemDivider>Comfirm</IonItemDivider>
        <IonFooter>
        <IonToolbar>
          <IonItem>
            <IonCheckbox></IonCheckbox>
            <IonLabel>I read and understand Terms & Condition</IonLabel>
          </IonItem>
          <IonItem>
            <IonButtons slot="end">
              <IonButton
                color="secondary"
                fill="outline"
                onClick={handleComplete}
              >
                Continue Shopping
              </IonButton>
              <IonButton
                color="primary"
                fill="outline"
                onClick={handleComplete}
              >
                Confirm
              </IonButton>
            </IonButtons>
          </IonItem>
        </IonToolbar>
        <IonItem lines="none">
          <IonImg
            class="footer_pay"
            slot="start"
            src="/assets/icon/1x/payment.png"
          ></IonImg>
          <IonButton slot="end"> Order now </IonButton>
        </IonItem>
      </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
