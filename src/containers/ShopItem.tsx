import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonItem
} from "@ionic/react";
import { add, heart, heartOutline } from "ionicons/icons";
import state, { CartItem } from "../reducers/Cart";
import { useDispatch } from "react-redux";
import { addCartAction } from "../reducers/CartAction";

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

  function addFavorites() {
    if (favorites === heartOutline) {
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
      <IonCardHeader>
        <IonCardSubtitle>{item.market}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{item.itemName}</IonCardContent>
      <IonFooter>
        <IonItem>
          <div className="currency">
            $ {item.itemCost} {item.itemDesc}
            <br />
          </div>
        </IonItem>
        <IonItem lines="none">
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
            onClick={() => addFavorites()}
          >
            <IonIcon slot="end" icon={favorites} />
          </IonButton>
        </IonItem>
      </IonFooter>
    </IonCard>
  );
};

export default ShopItem;
