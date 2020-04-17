import React from 'react'
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
import { useHistory } from 'react-router-dom';


interface CartProps {
  modal: boolean;
  closehandler: any;
}

const Cart: React.FC<CartProps> = ({ modal, closehandler }) => {
  let history = useHistory(); 
  function mapStateToProps(state: CartState) {
    const { cartItemList } = state;
    return { cartItemList };
  }
  function handleCheckOut () {
    history.push("/page/checkout");
    closehandler();
  }

  const CartItemList = connect(mapStateToProps)(ItemList);

  return (
    <IonContent>
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
          <CartItemList />
        </IonContent>
        <IonFooter>
          <IonLabel >Total: $00.00</IonLabel>
          <IonButton expand="full"  onClick={handleCheckOut}
                  >
            Check Out
          </IonButton>
        </IonFooter>
      </IonModal>
    </IonContent>
  );
};

export default Cart;
