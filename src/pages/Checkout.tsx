import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonSlides,
  IonSlide
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import { CartState } from "../reducers/Cart";
import { connect } from "react-redux";
import ItemList from "../components/ItemList";

interface CartProps {
  modal: boolean;
  closehandler: any;
}

const Checkout: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  function mapStateToProps(state: CartState) {
    const { cartItemList } = state;
    return { cartItemList };
  }

  const CartItemList = connect(mapStateToProps)(ItemList);
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  return (
    <IonPage>
      <IonContent>
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide>
            <h1>Address</h1>
          </IonSlide>
          <IonSlide>
            <h1>Payment</h1>
          </IonSlide>
          <IonSlide>
            <h1>Terms & Condition</h1>
            CartItemList
          </IonSlide>
        </IonSlides>
      </IonContent>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <CartItemList />
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
