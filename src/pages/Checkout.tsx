import {
  IonContent,
  IonPage,
  IonSlides,
  IonSlide,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { CartState } from "../reducers/Cart";
import { connect } from "react-redux";
import ItemList from "../components/ItemList";
import Address from "../components/Address";
import Payment from "../components/Payment";
import { useHistory } from "react-router-dom";
import { closeOutline } from "ionicons/icons";
import { CheckoutProps } from "../model/ComponentProps";
import { AddressObj, PaymentObj } from "../model/DomainModels";


const Checkout: React.FC<CheckoutProps> = () => {
  let history = useHistory();
  let slideRef = useRef<HTMLIonSlidesElement>(null);
  const [addressObject] = useState<AddressObj>();
  const [paymentOption] = useState<PaymentObj>();
  
  function mapStateToProps(state: CartState) {
    const { cartItemList } = state;
    return { cartItemList };
  }


  const CartItemList = connect(mapStateToProps)(ItemList);
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  const slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  const handleComplete = async () => {
    history.push("/tabs/dashboard");
    // setHide(true);
    // if (thisEl != null) {
    //   thisEl.current.remove();
    // }
    console.log("Did I go back?");
    // completeHandler();
  };

  const closehandler = async() => {
    history.goBack();
  }

  return (
    <IonPage id="checkout">
      <IonToolbar>
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
        <IonSlides ref={slideRef} pager={true} options={slideOpts}>
          <IonSlide>
            <IonContent>
              <IonHeader>
                <h1>Where to? </h1>
              </IonHeader>
              <Address id="123" address={addressObject}/>
            </IonContent>
          </IonSlide>
          <IonSlide >
            <IonContent>
              <IonHeader>
                <h1>How to Pay?</h1>
              </IonHeader>
              <Payment payment={paymentOption} />
            </IonContent>
          </IonSlide>
          <IonSlide >
            <IonContent>
              <IonHeader>
                <h1>Review</h1>
              </IonHeader>
              <IonButton
                color="primary"
                fill="outline"
                onClick={handleComplete}
              >
                Complete
              </IonButton>
              <CartItemList />
            </IonContent>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
