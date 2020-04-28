import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonButton,
  IonTitle
} from "@ionic/react";
import { basket } from "ionicons/icons";
import React, { useState } from "react";
import "./Market.css";
import ShopItem from "./ShopItem";
import Cart from "./Cart";
import { connect, useSelector } from "react-redux";
import { CartState } from "../reducers/Cart";
import { MarketItemsProps } from "../model/ComponentProps";
import GoBack from "../components/GoBack";
import ShopHeader from "../components/ShopHeader";
import { useParams } from "react-router";
import { useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";
import { RootState, Markets } from "../services/FirebaseIniti";

// interface ItemJson {
//   产品: string;
//   售出单价: number;
//   规格: string;

//   [key: string]: string | number | null;
// }

const MarketItems: React.FC<MarketItemsProps> = () => {
  console.log("entering MarketItems");
  const { market_id } = useParams<{ market_id: string }>();
  const { category_id } = useParams<{ category_id: string }>();
  var shop = {} as Markets;
  // const { categoryName } = useParams<{ categoryName: string }>();
  const [showModal, setShowModal] = useState(false);

  useFirestoreConnect([
    { collection: "Markets", doc: market_id },
    {
      collection: "Markets",
      doc: market_id,
      subcollections: [
        {
          collection: "Categories",
          doc: category_id,
          subcollections: [{ collection: "Items" }]
        }
      ],
      storeAs: "ItemList"
    }
  ]);
  const dataStore = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;

  if (dataStore.ordered.Markets && dataStore.ordered.Markets.length > 0) {
    dataStore.ordered.Markets.map(tmarket => {
      console.log(tmarket.name);
      shop = tmarket;
      return shop;
    });
  }


  console.log("datastore");
  console.log(dataStore);

  const CartBadge: React.FC<CartState> = ({ cart }) => {
    const cartSize = cart.cartItemList.length;
    if (cartSize > 0) {
      return <IonBadge color="danger">{cart.cartItemList.length}</IonBadge>;
    } else {
      return <div></div>;
    }
  };

  function mapStateToProps(state: CartState) {
    const { firebase, cart } = state;
    return { firebase, cart };
  }
  const CartCounter = connect(mapStateToProps)(CartBadge);

  // data.禽蛋类.map(item => {
  //   var jsonitem = item as ItemJson;
  //   const itemobj: ItemObj = {
  //     market: "Hi Fresh",
  //     itemName: jsonitem.产品,
  //     itemDesc: jsonitem.规格,
  //     itemCost: jsonitem.售出单价
  //   };
  //   Items.push(itemobj);
  //   return Items;
  // });

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
            {(dataStore.ordered.ItemList && dataStore.ordered.ItemList.length >0) ? (
              dataStore.ordered.ItemList.map(obj => {
              return (
                <IonCol key={obj.id}>
                  <ShopItem item={obj} />
                </IonCol>
              );
            })) : (<p></p>)
          }
          </IonRow>
        </IonGrid>
        <Cart modal={showModal} closehandler={() => setShowModal(false)} />
      </IonContent>
    </IonPage>
  );
};

export default MarketItems;
