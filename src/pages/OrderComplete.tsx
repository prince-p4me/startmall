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
  IonItem,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonFooter
} from "@ionic/react";
import { CartState } from "../services/FirebaseIniti";
import { connect } from "react-redux";
import { closeOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const OrderComplete: React.FC<CartState> = ({ shop, cart }) => {
  const cartListWithQty: CartWithQty[] = ConvertCartWithQty(cart);
  const cartListArray: Array<CartWithQty> = [];
  let history = useHistory();
  var invoice_id = "INV12345";
  for (var cartlistitemqty in cartListWithQty) {
    cartListArray.push(cartListWithQty[cartlistitemqty]);
    console.log(cartlistitemqty);
  }
  function closehandler() {
    history.push("/");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={closehandler}>
              <IonIcon
                size="large"
                slot="icon-only"
                icon={closeOutline}
              ></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="start"></IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonItem className="order_completed" lines="none">
          {shop.free_delivery_conditions}
          <IonLabel>
            <b>{invoice_id}</b>
          </IonLabel>
        </IonItem>
        <IonItem className="order_completed" lines="none">
          <IonLabel>
            <b>Order Completed</b>
          </IonLabel>
        </IonItem>
        <IonItem className="order_completed">
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
        <IonItem></IonItem>
        <IonItem className="total_cart" lines="none">Total incl GST ${cart.cart.total}</IonItem>
      </IonContent>
      <IonFooter>
        <IonButton expand="full" onClick={()=>history.push("/")}>Continue Shopping</IonButton>
      </IonFooter>
    </IonPage>
  );
};

function mapStateToProps(state: CartState) {
  const { firebase, cart, shop } = state;
  return { firebase, cart, shop };
}

export default connect(mapStateToProps)(OrderComplete);
