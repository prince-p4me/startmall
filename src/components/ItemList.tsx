import { CartState } from "../reducers/Cart";
import React from "react";
import {
  IonLabel,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { CartItem, CartWithQty } from "../model/DomainModels";
import { addCartAction } from "../reducers/CartAction";
import { useDispatch } from "react-redux";

const ItemList: React.FC<CartState> = ({ cartItemList, cart }) => {
  const dispatch = useDispatch();
  const cartListWithQty: CartWithQty[] = [];
  const cartListArray: Array<CartWithQty> =[];
  cartItemList.map((cartItem, index) => {
    if (cartListWithQty[cartItem.name] == null) {
      cartListWithQty[cartItem.name] = {
        key: cartItem.name,
        item: cartItem,
        count: 0
      };
    }
    if (cartListWithQty[cartItem.name].count === 0) {
      cartListWithQty[cartItem.name].count = 1;
    } else {
      cartListWithQty[cartItem.name].count =
        cartListWithQty[cartItem.name].count + 1;
    }
    return {};
  });
  console.log(cartListWithQty);

  for (var cartlistitemqty in cartListWithQty) {
    cartListArray.push(cartListWithQty[cartlistitemqty])
    console.log(cartlistitemqty);
  }
  function addCart(cartItem: CartItem) {
    const tempItem: CartItem = {
      market: cartItem.market,
      name: cartItem.name,
      desc: cartItem.desc,
      cost: cartItem.cost,
      qty: 1,
      item_key: cartItem.item_key,
      cart_key: cartItem.cart_key
    };

    dispatch(addCartAction(tempItem));
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="2"></IonCol>
        <IonCol size="4"></IonCol>
        <IonCol size="3">Qty</IonCol>
        <IonCol size="2">Total</IonCol>
      </IonRow>
      {cartListArray.map(cartWithQty => {
        return (
          <IonRow>
            <IonCol>
              <IonButton>
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonCol>
            <IonCol>{cartWithQty.item.name}</IonCol>
            <IonCol>
              <IonButtons>
                <IonButton fill="outline">-</IonButton>
                {cartWithQty.count}
                <IonButton
                  fill="outline"
                  onClick={() => {
                    addCart(cartWithQty.item);
                  }}
                >
                  +
                </IonButton>
              </IonButtons>
            </IonCol>
            <IonCol>
              <IonLabel slot="end">$ {cartWithQty.item.cost}</IonLabel>
            </IonCol>
          </IonRow>
        );
      })}
    </IonGrid>
  );
};

export default ItemList;
