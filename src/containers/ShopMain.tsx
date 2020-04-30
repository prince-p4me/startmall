import {
  IonButtons,
  IonContent,
  IonPage,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonButton,
  IonItem
} from "@ionic/react";
import { basket } from "ionicons/icons";
import React, { useState } from "react";
import "./Market.css";
import Cart from "./Cart";
import { connect } from "react-redux";
import data from "../data/hmarketitems.json";
import CategoryItem from "./CategoryItem";
import { CategoryObj } from "../model/DomainModels";
import OrderDayShopHeader from "../components/OrderDayShopHeader";
import ShopHeader from "../components/ShopHeader";
import { CartState } from "../services/FirebaseIniti";

const ShopMain: React.FC = () => {
  console.log("entering market");
  const [showModal, setShowModal] = useState(false);
  const Categories: CategoryObj[] = [];
  const CartBadge: React.FC<CartState> = ({ firebase, cart}) => {
    const cartSize = cart.cartItemList.length;
    if (cartSize > 0) {
      return <IonBadge color="danger">{cart.cartItemList.length}</IonBadge>;
    } else {
      return <div></div>;
    }
  };

  function mapStateToProps(state: CartState) {
    const { firebase, cart, shop } = state;
    return { firebase, cart, shop };
  }
  const CartCounter = connect(mapStateToProps)(CartBadge);
  const ShopHeaderWithShop = connect(mapStateToProps)(ShopHeader);


  var index = 0;
  for (var x in data) {
    // console.log("how many category " + index + " : " + x);
    index++;
    const obj: CategoryObj = {
      id: index,
      categoryName: x.toString(),
      market: "Hi Fresh",
      imageUrl: "./assets/img/veg-stock2.jpg",
      key: index
    };
    Categories.push(obj);
  }

  // mItems.json().
  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="end">
          <IonButton onClick={() => setShowModal(true)} slot="start">
            <IonIcon size="large" slot="icon-only" icon={basket}></IonIcon>
            <CartCounter />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <OrderDayShopHeader />
      <IonContent fullscreen>
      <ShopHeaderWithShop
        />
        <IonGrid>
          <IonRow>
            {Categories.map(obj => {
              return (
                <IonCol key={obj.id}>
                  <CategoryItem market_id="" category={obj} />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
        <IonItem hidden={showModal}>
          <Cart modal={showModal} closehandler={() => setShowModal(false)} />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default ShopMain;
