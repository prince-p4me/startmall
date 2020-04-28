import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonButton
} from "@ionic/react";
import { basket } from "ionicons/icons";
import React, { useState } from "react";
import "./Market.css";
import Cart from "./Cart";
import { connect, useSelector } from "react-redux";
import { CartState } from "../reducers/Cart";
import CategoryItem from "./CategoryItem";
import ShopHeader from "../components/ShopHeader";
import GoBack from "../components/GoBack";
import { useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";
import { RootState, Markets } from "../services/FirebaseIniti";
import { useParams } from "react-router";

const Market: React.FC = () => {
  const { market_id } = useParams<{ market_id: string }>();
  var shop = {} as Markets;
  const [showModal, setShowModal] = useState(false);
  const CartBadge: React.FC<CartState> = ({ cart }) => {
    const cartSize = cart.cartItemList.length;
    if (cartSize > 0) {
      return <IonBadge color="danger">{cart.cartItemList.length}</IonBadge>;
    } else {
      return <div></div>;
    }
  };

  useFirestoreConnect([
    { collection: "Markets", doc: market_id },
    {
      collection: "Markets",
      doc: market_id,
      subcollections: [
        {
          collection: "Categories"
        }
      ],
      storeAs: "Categories"
    }
  ]);

  const stateStore = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;

  if (stateStore.ordered.Markets && stateStore.ordered.Markets.length > 0) {
    stateStore.ordered.Markets.map(tmarket => {
      console.log(tmarket.name);
      shop = tmarket;
      return shop;
    });
  }

  function mapStateToProps(state: CartState) {
    const { firebase, cart } = state;
    return { firebase, cart };
  }
  const CartCounter = connect(mapStateToProps)(CartBadge);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(true)} slot="start">
              <IonIcon size="large" slot="icon-only" icon={basket}></IonIcon>
              <CartCounter />
            </IonButton>
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="start">
            <GoBack />
          </IonButtons>
          <IonTitle size="large">
            <p>{shop.terms_condition}</p>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ShopHeader image_url={shop.img_url as string} />
        <IonGrid>
          <IonRow>
            {stateStore.ordered.Categories &&
            stateStore.ordered.Categories.length > 0 ? (
              stateStore.ordered.Categories.map(obj => {
                return (
                  <IonCol key={obj.id}>
                    <CategoryItem market_id={market_id} category={obj} />
                  </IonCol>
                );
              })
            ) : (
              <p></p>
            )}
          </IonRow>
        </IonGrid>
        <Cart modal={showModal} closehandler={() => setShowModal(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Market;
