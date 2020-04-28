import React from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonLabel,
  IonFooter
} from "@ionic/react";
import { CartState } from "../reducers/Cart";
import { connect } from "react-redux";
import { closeOutline } from "ionicons/icons";
import ItemList from "../components/ItemList";
import { useHistory } from "react-router-dom";
import { CartProps } from "../model/ComponentProps";

const Cart: React.FC<CartProps> = ({ modal, closehandler }) => {
  let history = useHistory();
  function mapStateToProps(state: CartState) {
    const { firebase, cart } = state;
    return { firebase, cart };
  }
  function handleCheckOut() {
    history.push("/page/checkout");
    closehandler();
  }

  const CartItemList = connect(mapStateToProps)(ItemList);
  
  return (
      <IonModal isOpen={modal}>
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
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <CartItemList  />
        </IonContent>
        <IonFooter>
          <IonLabel>Total: $0</IonLabel>
          <IonButton expand="full" onClick={handleCheckOut}>
            Check Out
          </IonButton>
        </IonFooter>
      </IonModal>
  );
};

export default Cart;
