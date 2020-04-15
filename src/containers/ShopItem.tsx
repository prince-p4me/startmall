import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonFooter
} from "@ionic/react";
import {
  star,
  add,
  bookmarkOutline,
  heart,
  heartCircleOutline,
  heartOutline
} from "ionicons/icons";
import state, { CartItem, CartState } from "../reducers/Cart";
import { connect, useDispatch } from "react-redux";
import { addCartAction } from "../reducers/CartAction";
import Cart from "./Cart";

interface ItemObj {
  market: string;
  itemName: string;
  itemDesc: string;
  itemCost: number;
}

interface ContainerProps {
  item: ItemObj;
}

const ShopItem: React.FC<ContainerProps> = ({ item }) => {
  const [favorites, setFavorites] = useState(heartOutline);
  const dispatch = useDispatch();

  function addFavorites(item: ItemObj) {
    if (favorites == heartOutline) {
      setFavorites(heart);
    } else {
      setFavorites(heartOutline);
    }
  }

  function addCart(item: ItemObj) {
    const cartItem: CartItem = {
      market: item.market,
      name: item.itemName,
      desc: item.itemDesc,
      cost: item.itemCost,
      qty: 10
    };

    dispatch(addCartAction(cartItem));

    console.log("add item to state");
    console.log(state);
    //setFavorites(heart);
  }


  return (
    <IonCard>
      <img src="" />
      <IonCardHeader>
        <IonCardSubtitle>{item.market}</IonCardSubtitle>
        <IonCardTitle>{item.itemName}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent class="ws">
        {item.itemDesc}
        <IonFooter>
          <div className="currency">
            $ {item.itemCost}
            <br />
          </div>
          <IonButton
            color="tertiary"
            fill="clear"
            size="small"
            onClick={() => addCart(item)}
          >
            <IonIcon slot="start" icon={add} />
          </IonButton>
          <IonButton
            color="secondary"
            fill="clear"
            size="small"
            onClick={() => addFavorites(item)}
          >
            <IonIcon slot="end" icon={favorites} />
          </IonButton>
        </IonFooter>
      </IonCardContent>
    </IonCard>
  );
};

export default ShopItem;
