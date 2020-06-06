import React, { useState } from 'react';
import {
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonFooter,
  IonTitle,
} from '@ionic/react';
import { connect, useSelector } from 'react-redux';
import { closeOutline } from 'ionicons/icons';
import ItemList from '../components/ItemList';
import { useHistory } from 'react-router-dom';
import { CartProps, ErrorProps } from '../model/ComponentProps';
import { CartState } from '../services/FirebaseIniti';
import CartTotal from '../components/CartTotal';
import { isLoaded, isEmpty, FirestoreReducer } from 'react-redux-firebase';
import { CartStateType, RootState } from '../model/DomainModels';
import ErrorDisplay from '../components/ErrorDisplay';

const CartModal: React.FC<CartProps> = ({ modal, closeHandler }) => {
  const history = useHistory();
  const auth = useSelector<RootState>((state) => state.firebase.auth);
  const cartStore = useSelector<RootState>((state) => state.cart) as CartStateType;
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);

  function mapStateToProps(state: CartState) {
    const { firebase, cart, shop } = state;
    return { firebase, cart, shop };
  }

  const handleCheckOut = () => {
    // history.push("/page/checkout");
    if (isLoaded(auth) && !isEmpty(auth)) {
      history.push('/page/checkout');
      closeHandler(false);
    } else {
      setErrorProps({
        autoHide: false,
        buttonText: 'LOG IN',
        message: 'Please Login to checkout',
        showError: true,
        type: 2,
      });
    }
  };

  const [CartItemList] = useState<React.ElementType>(connect(mapStateToProps)(ItemList));
  const [EnhancedCartTotal] = useState<React.ElementType>(connect(mapStateToProps)(CartTotal));

  return (
    <IonModal isOpen={modal}>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="end">
            <IonButton onClick={() => closeHandler(true)}>
              <IonIcon size="large" slot="icon-only" icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle text-center>
            <b>SHOPPING CART</b>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="checkout_page">
        <CartItemList />
        <ErrorDisplay
          errorProps={errorProps}
          closeHandler={() => setErrorProps({ ...errorProps, showError: false })}
          eventHandler={() => {
            history.push('/login');
            setErrorProps({ ...errorProps, showError: false });
            closeHandler(true);
          }}
        />
      </IonContent>
      <IonFooter className="checkout_page_footer">
        <EnhancedCartTotal />
        <IonButton expand="full" onClick={handleCheckOut} disabled={cartStore.cartItemList.length === 0}>
          Check Out
        </IonButton>
      </IonFooter>
    </IonModal>
  );
};

export default CartModal;
