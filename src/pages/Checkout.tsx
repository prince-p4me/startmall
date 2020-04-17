import {
  IonContent,
  IonPage,
  IonSlides,
  IonSlide,
  IonButton,
  IonHeader,
  IonFooter,
  IonItem
} from "@ionic/react";
import React, { useState, useRef } from "react";
import { useParams, Router } from "react-router";
import { CartState } from "../reducers/Cart";
import { connect } from "react-redux";
import ItemList from "../components/ItemList";
import Address from "../components/Address";
import Payment from "../components/Payment";
import { useHistory } from "react-router-dom";
import { thisExpression } from "@babel/types";
import ReactDOM from "react-dom";

interface CheckoutProps {
  completeHandler: any;
}

const Checkout: React.FC<CheckoutProps> = ({ completeHandler }) => {
  let history = useHistory();
  let thisEl = useRef();
  const [hide, setHide] = useState(false);
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

  function handleComplete() {
    history.push("/tabs/market");
    // setHide(true);
    
    console.log(thisEl.current);
    // if (thisEl != null) {
    //   thisEl.current.remove();
    // }
    console.log("Did I go back?");
    // completeHandler();
  }

  return (
    <IonPage id="checkout" >
      <IonContent>
        <IonSlides pager={true} options={slideOpts}>
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
                {" "}
                Complete{" "}
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
