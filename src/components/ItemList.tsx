import { CartState } from "../reducers/Cart";
import React from "react";
import {
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { CartWithQty, ItemObj } from "../model/DomainModels";
import { addCartAction, delCartAction } from "../reducers/CartAction";
import { useDispatch } from "react-redux";

const ItemList: React.FC<CartState> = ({ cart }) => {
  const dispatch = useDispatch();
  const cartListWithQty: CartWithQty[] = [];
  const cartListArray: Array<CartWithQty> =[];

  console.log(cart.cartItemList);
  cart.cartItemList.map((cartItem) => {
    if (cartListWithQty[cartItem.id] == null) {
      cartListWithQty[cartItem.id] = {
        key: cartItem.id,
        item: cartItem,
        count: 0
      };
    }
    if (cartListWithQty[cartItem.id].count === 0) {
      cartListWithQty[cartItem.id].count = 1;
    } else {
      cartListWithQty[cartItem.id].count ++;
    }
    return {};
  });
  console.log(cartListWithQty);

  for (var cartlistitemqty in cartListWithQty) {
    cartListArray.push(cartListWithQty[cartlistitemqty])
    console.log(cartlistitemqty);
  }
  function addCart(cartItem: ItemObj) {
    dispatch(addCartAction(cartItem));
  }
  function delCart(cartItem: ItemObj) {
    dispatch(delCartAction(cartItem));
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
            <IonCol size="2">
              <IonButton>
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonCol>
            <IonCol size="4">{cartWithQty.item.name}</IonCol>
            <IonCol size="3">
              <IonButtons>
                <IonButton fill="outline"
                onClick={() => {
                  delCart(cartWithQty.item);
                }}
                >-</IonButton>
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
            <IonCol size="2">
              $ {cartWithQty.item.unit_price}
            </IonCol>
          </IonRow>
        );
      })}
    </IonGrid>
  );
};

export default ItemList;
