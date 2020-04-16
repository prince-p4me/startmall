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
  IonButton} from "@ionic/react";
import { pauseCircleOutline, basket } from "ionicons/icons";
import React, { useState } from "react";
import "./Market.css";
import ShopItem from "./ShopItem";
import Cart from "./Cart";
import { connect } from "react-redux";
import { CartState } from "../reducers/Cart";

interface ItemObj {
  market: string;
  itemName: string;
  itemDesc: string;
  itemCost: number;
}

const Items: ItemObj[] = [
  {
    market: "Jason's Market",
    itemName: "Wagu beef",
    itemDesc: "* 200g\n* A Grade Meat",
    itemCost: 20.5
  },
  {
    market: "Jason's Market",
    itemName: "Coca Cola",
    itemDesc: "* 350ml\n* Zero",
    itemCost: 2
  },
  {
    market: "Jason's Market",
    itemName: "US Pork",
    itemDesc: "* 200g\n* A Grade Meat",
    itemCost: 30
  },
  {
    market: "Jason's Market",
    itemName: "Japan Spring Egg",
    itemDesc: "* 200g\n* pack of 20",
    itemCost: 5
  },
  {
    market: "Jason's Market",
    itemName: "Wagu beef",
    itemDesc: "* 500g\n* A Grade Meat",
    itemCost: 40.5
  },
  {
    market: "Jason's Market",
    itemName: "Wagu beef",
    itemDesc: "* 100g\n* A Grade Meat",
    itemCost: 8.88
  }
];

const Market: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const CartBadge: React.FC<CartState> = ({ cartItemList }) => {
    const cartSize = cartItemList.length;
    if (cartSize > 0) {
      return <IonBadge color="danger">{cartItemList.length}</IonBadge>;
    } else {
      return <div></div>;
    }
  };

  function mapStateToProps(state: CartState) {
    const { cartItemList } = state;
    console.log(state);
    return { cartItemList };
  }
  const CartCounter = connect(mapStateToProps)(CartBadge);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowModal(true)} slot="start">
              <IonIcon size="large" slot="icon-only" icon={basket}></IonIcon>
              <CartCounter />
            </IonButton>
            <IonMenuButton />
          </IonButtons>
          <IonTitle size="large">
            <IonIcon icon={pauseCircleOutline}></IonIcon>
            StartMall
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {Items.map((obj) => {
              return (
                <IonCol>
                  <ShopItem item={obj} />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
        <Cart modal={showModal} closehandler={() => setShowModal(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Market;
