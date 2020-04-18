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
import { pauseCircleOutline, basket } from "ionicons/icons";
import React, { useState } from "react";
import "./Market.css";
import Cart from "./Cart";
import { connect } from "react-redux";
import { CartState } from "../reducers/Cart";
import data from "../data/hmarketitems.json";
import CategoryItem from "./CategoryItem";
import { CategoryObj } from "../model/DomainModels";

// const mItems = fetch("../data/hmarketitems.json")
//   .then(response => {
//     console.log(response);
//     var res = response.json();
//     for (var x in res) {
//       console.log(x);
//     }
//     return res;
//   })
//   .then(data => {
//     console.log(data);
//     for (var x in data) {
//       console.log(x);
//     }
//     return data;
//   });

const Market: React.FC = () => {
  console.log("entering market");
  const [showModal, setShowModal] = useState(false);
  const Categories: CategoryObj[] = [];
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
    // console.log("mapping state to cart state");
    return { cartItemList };
  }
  const CartCounter = connect(mapStateToProps)(CartBadge);

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
            {Categories.map(obj => {
              return (
                <IonCol key={obj.id}>
                  <CategoryItem category={obj} />
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
