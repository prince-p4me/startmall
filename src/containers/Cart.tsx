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
import { connect,useSelector } from "react-redux";
import { closeOutline } from "ionicons/icons";
import ItemList from "../components/ItemList";
import { useHistory } from "react-router-dom";
import { CartProps } from "../model/ComponentProps";
import { CartState } from "../services/FirebaseIniti";
import CartTotal from "../components/CartTotal";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { RootState } from "../model/DomainModels";

const Cart: React.FC<CartProps> = ({ modal, closehandler }) => {
  let history = useHistory();
  const auth = useSelector<RootState>(state => state.firebase.auth);

  function mapStateToProps(state: CartState) {
    const { firebase, cart, shop, address } = state;
    return { firebase, cart, shop, address };
  }
  function handleCheckOut() {
    // history.push("/page/checkout");
    if (isLoaded(auth) && !isEmpty(auth)) {
      history.push("/page/checkout");
    } else {
      history.push("/login");
    }
    closehandler();
  }

  const CartItemList = connect(mapStateToProps)(ItemList);
  const EnhancedCartTotal = connect(mapStateToProps)(CartTotal);

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
      <IonContent className="checkout_page">
        <CartItemList />
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
