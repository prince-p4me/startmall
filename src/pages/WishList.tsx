import React, { useEffect, useState } from "react";
import {
  IonRow, IonCol,
  IonPage,
  IonBadge,
  IonGrid,
  IonContent
} from "@ionic/react";
import ShopItem from "../containers/ShopItem";
import { useSelector, connect } from "react-redux";
import { useFirestoreConnect, useFirebase } from "react-redux-firebase";
import { RootState, WishList, Markets, } from "../model/DomainModels";
import { useParams } from "react-router";
import { CartState } from "../services/FirebaseIniti";
import MarketHeader from "../components/MarketHeader";
import Cart from "../containers/Cart";

const WishListPage: React.FC = () => {
  console.log("entering WishListPage");
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const json_auth = JSON.parse(JSON.stringify(auth));
  const { market_id } = useParams<{ market_id: string }>();
  const db = useFirebase().firestore();
  const [items, setItems] = useState<Array<WishList>>([]);
  const [showModal, setShowModal] = useState(false);
  const [shop, setShop] = useState({} as Markets);

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

  // function fetchData() {
  //   db.collection("WishLists")
  //     .doc(json_auth.uid)
  //     .collection("Markets")
  //     .doc(market_id).get().then(res => {
  //       var shop1: any = res.data();
  //       setShop(shop1 as Markets);
  //     });
  //   db.collection("WishLists")
  //     .doc(json_auth.uid)
  //     .collection("Markets")
  //     .doc(market_id)
  //     .collection("Items")
  //     .get().then((snapshot) => {
  //       var data: Array<WishList> = [];
  //       if (!snapshot.empty) {
  //         snapshot.forEach(doc => {
  //           var item = doc.data();
  //           data.push(item as WishList);
  //         });
  //       }
  //       setItems(data);
  //     })
  // }

  useFirestoreConnect([
    {
      collection: "WishLists",
      doc: json_auth.uid,
      subcollections: [
        {
          collection: "Markets",
          doc: market_id
        }
      ],
      storeAs: "shop"
    }
  ]);


  useEffect(() => {
    db.collection("WishLists")
      .doc(json_auth.uid)
      .collection("Markets")
      .doc(market_id).get().then(res => {
        var shop1: any = res.data();
        setShop(shop1 as Markets);
      });
    db.collection("WishLists")
      .doc(json_auth.uid)
      .collection("Markets")
      .doc(market_id)
      .collection("Items")
      .get().then((snapshot) => {
        var data: Array<WishList> = [];
        if (!snapshot.empty) {
          snapshot.forEach(doc => {
            var item = doc.data();
            data.push(item as WishList);
          });
        }
        setItems(data);
      })
  }, [db, json_auth.uid, market_id]);

  return (
    <IonPage>
      <MarketHeader setShowModal={setShowModal} shop={shop} CartCounter={CartCounter} />
      <IonContent className="shope_item_listing" fullscreen>
        {/* <ShopHeaderWithShop /> */}
        <IonGrid>
          <IonRow>
            {items &&
              items.length > 0 ? (
                items.map((obj, index) => {
                  return (
                    <IonCol key={index}>
                      <ShopItem item={obj.item} market_id={obj.market_id} category_id={obj.category_id} />
                    </IonCol>
                  );
                })
              ) : (
                <p></p>
              )}
          </IonRow>
        </IonGrid>
        <Cart modal={showModal} closehandler={() => setShowModal(!showModal)} />
      </IonContent>
    </IonPage >
  );
};

export default WishListPage;