import {
  IonContent,
  IonPage,
  IonSlides,
  IonSlide,
  IonButton,
  IonHeader
} from "@ionic/react";
import React, { useRef } from "react";
import { CartState } from "../reducers/Cart";
import { connect } from "react-redux";
import ItemList from "../components/ItemList";
import Address from "../components/Address";
import Payment from "../components/Payment";
import { useHistory } from "react-router-dom";

interface CheckoutProps {
  completeHandler: any;
}

const Checkout: React.FC<CheckoutProps> = () => {
  let history = useHistory();
  let slideRef = useRef<HTMLIonSlidesElement>(null);
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

  const handleComplete = async() => {
    history.push('/tabs/dashboard');
    // setHide(true);
    // if (thisEl != null) {
    //   thisEl.current.remove();
    // }
    console.log("Did I go back?");
    // completeHandler();
  }

  return (
    <IonPage id="checkout">
    <IonHeader></IonHeader>
      <IonContent>
        <IonSlides ref={slideRef} pager={true} options={slideOpts}>
          <IonSlide>
            <IonContent>
              <IonHeader>
                <h1>Where to? </h1>
              </IonHeader>
              <Address id="123" />
            </IonContent>
          </IonSlide>
          <IonSlide>
            <IonContent>
              <IonHeader>
                <h1>How to Pay?</h1>
              </IonHeader>
              <Payment />
            </IonContent>
          </IonSlide>
          <IonSlide>
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
