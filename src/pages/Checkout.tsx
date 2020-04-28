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
import { AddressObj, PaymentObj, CartStateType } from "../model/DomainModels";
import ShopHeader from "../components/ShopHeader";
import ShopConditionAndOperatingHours from "../components/ShopConditionAndOperatingHours";

const Checkout: React.FC<CheckoutProps> = () => {
  let history = useHistory();
  const [addressObject] = useState<AddressObj>();
  const [paymentOption] = useState<PaymentObj>();
  
  // const { market_id } = useParams<{ market_id: string }>();
  // const { category_id } = useParams<{ category_id: string }>();
  // var shop = {} as Markets;
  // // const { categoryName } = useParams<{ categoryName: string }>();
  // const [showModal, setShowModal] = useState(false);

  // useFirestoreConnect([
  //   { collection: "Markets", doc: market_id },
  //   {
  //     collection: "Markets",
  //     doc: market_id,
  //     subcollections: [
  //       {
  //         collection: "Categories",
  //         doc: category_id,
  //         subcollections: [{ collection: "Items" }]
  //       }
  //     ],
  //     storeAs: "ItemList"
  //   }
  // ]);
  // const dataStore = useSelector<RootState>(
  //   state => state.firestore
  // ) as FirestoreReducer.Reducer;

  // if (dataStore.ordered.Markets && dataStore.ordered.Markets.length > 0) {
  //   dataStore.ordered.Markets.map(tmarket => {
  //     console.log(tmarket.name);
  //     shop = tmarket;
  //     return shop;
  //   });
  // }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  const [cartState, setCartState] = useState<CartStateType>({
    cartItemList: [],
    cart: {
      total: 0.0
    }
  });

  function mapStateToProps(state: CartState) {
    const { firebase, cart } = state;
    setCartState(cart);
    return { firebase, cart };
  }

  const CartItemList = connect(mapStateToProps)(ItemList);

  const handleComplete = async () => {
    history.push("/");
    console.log("Did I go back?");
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
        <ShopHeader image_url=""/>
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
