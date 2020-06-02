import React from "react";
import {
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonItem
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { CartWithQty, ItemObj } from "../model/DomainModels";
import {
  addCartAction,
  delCartAction,
  delItemGroup
} from "../reducers/CartAction";
import { useDispatch } from "react-redux";
import { CartState } from "../services/FirebaseIniti";
import CurrencyAmount from "./CurrencyAmount";

const ItemList: React.FC<CartState> = ({ cart }) => {
  const dispatch = useDispatch();
  const cartListWithQty: CartWithQty[] = [];
  const cartListArray: Array<CartWithQty> = [];

  console.log(cart.cartItemList);
  cart.cartItemList.map(cartItem => {
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
      cartListWithQty[cartItem.id].count++;
    }
    return {};
  });
  console.log(cartListWithQty);

  for (var cartlistitemqty in cartListWithQty) {
    cartListArray.push(cartListWithQty[cartlistitemqty]);
    console.log(cartlistitemqty);
  }
  
  const addCart = (cartItem: ItemObj) => {
    dispatch(addCartAction(cartItem, cart.cart.marketId));
  }

  const delCart = (cartItem: ItemObj) => {
    dispatch(delCartAction(cartItem, cart.cart.marketId), );
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="1.7"></IonCol>
        <IonCol size="4"></IonCol>
        <IonCol size="3" style={{ textAlign: "center" }}>Qty</IonCol>
        <IonCol size="3" style={{ textAlign: "right" }}>Total</IonCol>
      </IonRow>
      {cartListArray.map((cartWithQty, index) => {
        return (
          <IonRow key={index}>
            <IonCol size="1.7">
              <IonButton
                size="small"
                fill="clear"
                onClick={() => {
                  dispatch(delItemGroup(cartWithQty.item, cart.cart.marketId));
                }}
              >
                <IonIcon slot="icon-only" color="danger" icon={closeOutline} />
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonItem lines="none">{cartWithQty.item.name}</IonItem>
            </IonCol>
            <IonCol size="3">
              <IonButtons style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <IonButton
                  fill="outline"
                  onClick={() => {
                    delCart(cartWithQty.item);
                  }}
                >
                  -
                </IonButton>
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
            <IonCol size="3" style={{ textAlign: "right", paddingRight: 0 }}>
              <IonItem lines="none" >
                <p style={{ textAlign: "right", width: "100%" }}><CurrencyAmount amount={cartWithQty.item.unit_price} /></p>
              </IonItem>
            </IonCol>
          </IonRow>
        );
      })}
    </IonGrid>
  );
};

export default ItemList;
