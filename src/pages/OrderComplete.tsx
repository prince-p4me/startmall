import React from "react";
import { CartWithQty } from "../model/DomainModels";
import { ConvertCartWithQty } from "../services/CartService";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem
} from "@ionic/react";
import { CartState } from "../services/FirebaseIniti";
import { connect } from "react-redux";

const OrderComplete: React.FC<CartState> = ({ shop, cart }) => {
  const cartListWithQty: CartWithQty[] = ConvertCartWithQty(cart);
  const cartListArray: Array<CartWithQty> = [];
  var invoice_id = "INV12345";
  for (var cartlistitemqty in cartListWithQty) {
    cartListArray.push(cartListWithQty[cartlistitemqty]);
    console.log(cartlistitemqty);
  }

  return (
    <IonPage>
      <IonHeader>
        {shop.free_delivery_conditions}
        <IonLabel>{invoice_id}</IonLabel>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Order Completed</IonLabel>
        </IonItem>
        <IonItem>
          <p>
            We are processing your order at the moment. You will receieve the
            order confirmation from us shortly.
          </p>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol size="4"></IonCol>
            <IonCol size="3">Qty</IonCol>
            <IonCol size="2">Total</IonCol>
          </IonRow>
          {cartListArray.map(cartWithQty => {
            return (
              <IonRow>
                <IonCol size="4">
                  <IonItem lines="none">{cartWithQty.item.name}</IonItem>
                </IonCol>
                <IonCol size="3">{cartWithQty.count}</IonCol>
                <IonCol size="2">
                  <IonItem lines="none">${cartWithQty.item.unit_price}</IonItem>
                </IonCol>
              </IonRow>
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

function mapStateToProps(state: CartState) {
  const { firebase, cart, shop } = state;
  return { firebase, cart, shop };
}

export default connect(mapStateToProps)(OrderComplete);
