import React, { useState } from "react";
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
                $ {item.unit_price} {item.unit}
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
                onClick={() => addFavorites()}
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
