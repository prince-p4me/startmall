import React, { useState } from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonFooter,
  IonTitle
} from "@ionic/react";
import { connect, useSelector } from "react-redux";
import { closeOutline } from "ionicons/icons";
import ItemList from "../components/ItemList";
import { useHistory } from "react-router-dom";
import { CartProps, ErrorProps } from "../model/ComponentProps";
import { CartState } from "../services/FirebaseIniti";
import CartTotal from "../components/CartTotal";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { RootState } from "../model/DomainModels";
import ErrorDisplay from "../components/ErrorDisplay";

const Cart: React.FC<CartProps> = ({ modal, closehandler }) => {
  let history = useHistory();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);

  function mapStateToProps(state: CartState) {
    const { firebase, cart, shop, address } = state;
    return { firebase, cart, shop, address };
  }
  function handleCheckOut() {
    // history.push("/page/checkout");
    if (isLoaded(auth) && !isEmpty(auth)) {
      history.push("/page/checkout");
      closehandler();
    } else {
      setErrorProps({
        autoHide: false,
        buttonText: "LOG IN",
        message: "Please Login to checkout",
        showError: true,
        type: 2
      })
    }

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
          <IonTitle text-center>
            <b>SHOPPING CART</b>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="checkout_page">
        <CartItemList />
        <ErrorDisplay errorProps={errorProps} closeHandler={() => setErrorProps({...errorProps, showError: false})} eventHandler={() => { history.push("/login"); setErrorProps({...errorProps, showError: false}); closehandler(); }}/>
      </IonContent>
      <IonFooter className="checkout_page_footer">
        <EnhancedCartTotal />
        <IonButton expand="full" onClick={handleCheckOut}>
          Check Out
          </IonButton>
      </IonFooter>
    </IonModal>
  );
};

export default Cart;
