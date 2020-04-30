import React from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonFooter
} from "@ionic/react";
import { connect } from "react-redux";
import { closeOutline } from "ionicons/icons";
import ItemList from "../components/ItemList";
import { useHistory } from "react-router-dom";
import { CartProps } from "../model/ComponentProps";
import { CartState } from "../services/FirebaseIniti";
import CartTotal from "../components/CartTotal";

const Cart: React.FC<CartProps> = ({ modal, closehandler }) => {
  let history = useHistory();
  function mapStateToProps(state: CartState) {
    const { firebase, cart, shop } = state;
    return { firebase, cart, shop };
  }
  function handleCheckOut() {
    history.push("/page/checkout");
    closehandler();
  }

  const CartItemList = connect(mapStateToProps)(ItemList);
  const EnhancedCartTotal = connect(mapStateToProps)(CartTotal);

  return (
      <IonModal  isOpen={modal}>
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
        <IonContent className="checkout_page">
          <CartItemList  />
        </IonContent>
        <IonFooter>
          <EnhancedCartTotal />
          <IonButton expand="full" onClick={handleCheckOut}>
            Check Out
          </IonButton>
        </IonFooter>
      </IonModal>
  );
};

export default Cart;
