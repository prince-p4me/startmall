import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge
} from "@ionic/react";
import React, { useState } from "react";
import "./Market.css";
import ShopItem from "./ShopItem";
import Cart from "./Cart";
import { connect, useSelector } from "react-redux";
import { MarketItemsProps } from "../model/ComponentProps";
import ShopHeader from "../components/ShopHeader";
import { useParams } from "react-router";
import { useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";
import { RootState, Markets } from "../model/DomainModels";
import { CartState } from "../services/FirebaseIniti";
import MarketHeader from "../components/MarketHeader";

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
    { collection: "Markets", doc: market_id, storeAs: "Market" },
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

  if (dataStore.ordered.Market && dataStore.ordered.Market.length > 0) {
    dataStore.ordered.Market.map(tmarket => {
      console.log(tmarket.name);
      shop = tmarket;
      return shop;
    });
  }

  const CartBadge: React.FC<CartState> = ({ cart }) => {
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

  return (
    <IonPage>
      <MarketHeader setShowModal={setShowModal} shop={shop} CartCounter={CartCounter} />
      <IonContent className="shope_item_listing" fullscreen>
        <ShopHeaderWithShop
        />
        <IonGrid>
          <IonRow>
            {dataStore.ordered.ItemList &&
              dataStore.ordered.ItemList.length > 0 ? (
                dataStore.ordered.ItemList.map(obj => {
                  if (obj.is_deleted) {
                    return;
                  }
                  return (
                    <IonCol key={obj.id}>
                      <ShopItem item={obj} market_id={market_id} category_id={category_id} />
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

export default MarketItems;
