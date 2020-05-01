import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonItem,
  IonLabel} from "@ionic/react";
import { add, heart, heartOutline } from "ionicons/icons";
import state from "../reducers/Cart";
import { useDispatch } from "react-redux";
import { addCartAction } from "../reducers/CartAction";
import { ItemObj } from "../model/DomainModels";
import { ShopItemProps } from "../model/ComponentProps";
import { FirestoreIonImg } from "../services/FirebaseStorage";

const ShopItem: React.FC<ShopItemProps> = ({ item }) => {
  const [favorites, setFavorites] = useState(heartOutline);
  const dispatch = useDispatch();

  function addFavorites() {
    if (favorites === heartOutline) {
      setFavorites(heart);
    } else {
      setFavorites(heartOutline);
    }
  }

  function addCart(item: ItemObj) {
    // const cartItem: CartItem = {
    //   market: item.market,
    //   name: item.itemName,
    //   desc: item.itemDesc,
    //   cost: item.itemCost,
    //   item_key: 1,
    //   cart_key: 0,
    //   qty: 1
    // };

    dispatch(addCartAction(item));

    console.log("add item to state");
    console.log(state);
    //setFavorites(heart);
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonItem lines="none">{item.name}</IonItem>
      </IonCardHeader>
      <IonCardContent>
        <IonItem lines="none">
          <FirestoreIonImg src={item.img_url as string} />
          {/* <IonImg src={item.img_url as string}></IonImg> */}
        </IonItem>
      </IonCardContent>
      <IonFooter>
        <IonItem lines="none">
          <div className="currency">
            $ {item.unit_price} {item.unit}
            <br />
          </div>
          <IonItem lines="none" slot="end">
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
              onClick={() => addFavorites()}
            >
              <IonIcon slot="end" icon={favorites} />
            </IonButton>
          </IonItem>
        </IonItem>
        <IonItem lines="none" className="shop_item_min_order">
          <IonLabel color="tertiary">Minimum order: Nil</IonLabel>
        </IonItem>
      </IonFooter>
    </IonCard>
  );
};

export default ShopItem;
