import React, { useState, useEffect, useCallback } from "react";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonRow, IonCol,
  IonItem,
  IonLabel
} from "@ionic/react";
import { add, heart, heartOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { addCartAction } from "../reducers/CartAction";
import { ItemObj, RootState, WishList } from "../model/DomainModels";
import { ShopItemProps, ErrorProps } from "../model/ComponentProps";
import { FirestoreIonImg } from "../services/FirebaseStorage";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import CurrencyAmount from "../components/CurrencyAmount";
import ErrorDisplay from "../components/ErrorDisplay";

const ShopItem: React.FC<ShopItemProps> = ({ item, market_id, category_id }) => {
  console.log({
    item
  })
  const [favorites, setFavorites] = useState(heartOutline);
  // const [] = useState<WishList>({} as WishList);
  const dispatch = useDispatch();
  const db = useFirebase().firestore();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const shop = useSelector<RootState>(state => state.shop);
  const history = useHistory();
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);

  function addFavorites() {
    const json_auth = JSON.parse(JSON.stringify(auth));
    let obj: WishList = {
      item_id: item.id,
      market_id: market_id,
      category_id: category_id,
      item: item
    };
    writeData(obj, json_auth.uid);
  }

  async function writeData(data: WishList, user_id: string) {
    var json_shop = JSON.parse(JSON.stringify(shop));
    console.log(JSON.stringify(shop));
    var items = await db.collection("WishLists")
      .doc(user_id)
      .collection("Markets")
      .doc(market_id).collection("Items").get();
    if (items.empty) {
      await db.collection("WishLists")
        .doc(user_id)
        .collection("Markets")
        .doc(market_id).set(json_shop.shop);
      await db.collection("WishLists")
        .doc(user_id)
        .collection("Markets")
        .doc(market_id)
        .collection("Items")
        .add(data);
      // updateFavorite();
    } else {
      var itemList: any = [];
      items.forEach(doc => {
        var doc1 = doc.data();
        itemList.push(doc1);
      })
      await db.collection("WishLists")
        .doc(user_id)
        .collection("Markets")
        .doc(market_id).collection("Items").doc(data.item_id).set(data);
    }
    setFavorites(heart);
  }

  function addCart(item: ItemObj) {
    dispatch(addCartAction(item));
  }

  const checkFavorite = (writing: boolean) => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      // setFavorites(heart);
      const json_auth = JSON.parse(JSON.stringify(auth));
      const docRef = db.collection("WishLists").doc(json_auth.uid).collection("Markets").doc(market_id).collection("Items");
      docRef.where('item_id', '==', item.id).get().then(function (snapshot) {
        if (snapshot.empty) {
          setFavorites(heartOutline);
          if (writing) {
            addFavorites();
          }
        } else {
          if (writing) {
            snapshot.forEach(doc => {
              // deleteFavorite(doc.id, docRef);
              docRef.doc(doc.id).delete().then(() => {
                console.log(doc.id + " deleted");
              })
            });
            setFavorites(heartOutline);
          } else {
            setFavorites(heart);
          }
        }
      }).catch(function (error) {
        setFavorites(heartOutline);
        console.log("Error getting document:", error);
      });
    } else {
      if (writing) {
        setErrorProps({
          message: "Please login to add item in your wishlist",
          showError: true,
          type: 2,
          autoHide: false,
          buttonText: "LOG IN"
        })
        // history.push("/login");
      }
    }
    // eslint-disable-next-line
  };

  useEffect(() => {
    if (favorites === heartOutline) {
      console.log("use Effect Set Favorites");
      checkFavorite(false);
    }
  }, []);

  if (!item.unit_price || item.unit_price == "" || item.unit_price == null ||
    !item.unit || item.unit == "" || item.unit == null) {
    return null
  }

  return (
    <IonCard>
      <IonCardContent style={{ padding: 10 }}>
        <IonRow>
          <IonCol size="4">
            <FirestoreIonImg src={item.img_url as string} />
          </IonCol>
          <IonCol size="7.8">
            <IonLabel >
              <p>{item.name}</p>
              <br />
              <p className="currency">
                {/* $ {item.unit_price} {item.unit} */}
                <CurrencyAmount amount={item.unit_price} /> {item.unit}
              </p>
            </IonLabel>
            <br />
            <IonItem lines="none" style={{ float: "right" }} >
              <IonButton
                color="tertiary"
                fill="outline"
                size="small"
                onClick={() => addCart(item)}
              >
                <IonIcon slot="start" icon={add} />
                Add to Cart
                </IonButton>
              <IonButton
                color="secondary"
                fill="clear"
                size="small"
                onClick={() => {
                  checkFavorite(true);
                }}
              >
                <IonIcon icon={favorites} />
              </IonButton>
            </IonItem>
            <IonItem lines="none" style={{ float: "right" }} className="shop_item_min_order" >
              <IonLabel>Minimum order: Nil</IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonCardContent>
      <ErrorDisplay errorProps={errorProps} closeHandler={() => { setErrorProps({ ...errorProps, showError: false }) }} eventHandler={() => { history.push("/login"); setErrorProps({ ...errorProps, showError: false }); }} />
    </IonCard>
  );
};

export default ShopItem;
