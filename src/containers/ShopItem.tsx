import React, { useState, useEffect } from "react";
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
import state from "../reducers/Address";
import { useDispatch, useSelector } from "react-redux";
import { addCartAction } from "../reducers/CartAction";
import { ItemObj, RootState, WishList } from "../model/DomainModels";
import { ShopItemProps } from "../model/ComponentProps";
import { FirestoreIonImg } from "../services/FirebaseStorage";
import { async } from "@firebase/util";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import CurrencyAmount from "../components/CurrencyAmount";


const ShopItem: React.FC<ShopItemProps> = ({ item, market_id }) => {
  const [logined, setLogin] = useState(false);
  const [favorites, setFavorites] = useState(heartOutline);
  const [wishlist, setWishlist] = useState<WishList>({} as WishList);
  const dispatch = useDispatch();
  const db = useFirebase().firestore();
  const auth = useSelector<RootState>(state => state.firebase.auth);

  function addFavorites() {
    console.log("adding favorites");
    const json_auth = JSON.parse(JSON.stringify(auth));
    var docRef = db.collection("WishLists").doc(json_auth.uid).collection("List");
    let obj: WishList = {
      item_id: item.id,
      market_id: market_id
    };
    writeData(obj, json_auth.uid);
  }

  async function writeData(data: WishList, user_id: string) {
    await db.collection("WishLists").doc(user_id).collection("List").add(data);
    // updateFavorite();
    setFavorites(heart);
  }

  function addCart(item: ItemObj) {
    dispatch(addCartAction(item));
  }

  function checkFavorite(writing: boolean) {
    if (!logined) {
      return
    }
    console.log("updating favorite");
    const json_auth = JSON.parse(JSON.stringify(auth));
    var docRef = db.collection("WishLists").doc(json_auth.uid).collection("List");

    docRef.where('item_id', '==', item.id).get().then(function (snapshot) {
      if (snapshot.empty) {
        console.log("No such document!");
        if (writing) {
          addFavorites();
        } else setFavorites(heartOutline);
      } else {
        if (writing) {
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            // deleteFavorite(doc.id, docRef);
            docRef.doc(doc.id).delete().then(() => {
              console.log(doc.id + " deleted");
            })
          });
          setFavorites(heartOutline);
        } else setFavorites(heart);
      }
    }).catch(function (error) {
      setFavorites(heartOutline);
      console.log("Error getting document:", error);
    });
  }

  useEffect(function () {
    if (isLoaded(auth) && !isEmpty(auth)) {
      console.log("User Logged in");
      setLogin(true);
      checkFavorite(false);
    }
  }, []);

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
                  if (isLoaded(auth) && !isEmpty(auth)) {
                    checkFavorite(true);
                  }else{
                    alert("Please login to add item in wishlist");
                  }
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
    </IonCard>
  );
};

export default ShopItem;
