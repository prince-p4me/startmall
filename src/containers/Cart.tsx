import React, { useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { connect, useSelector } from 'react-redux';
import { closeOutline } from 'ionicons/icons';
import ItemList from '../components/ItemList';
import { useHistory } from 'react-router-dom';
import { CartProps, ErrorProps } from '../model/ComponentProps';
import { CartState } from '../services/FirebaseIniti';
import CartTotal from '../components/CartTotal';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { CartStateType, RootState } from '../model/DomainModels';
import ErrorDisplay from '../components/ErrorDisplay';
import { useTranslation } from 'react-i18next';

const CartModal: React.FC<CartProps> = ({ modal, closeHandler }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const auth = useSelector<RootState>((state) => state.firebase.auth);
  const cartStore = useSelector<RootState>((state) => state.cart) as CartStateType;
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);

  const mapStateToProps = (state: CartState) => {
    const { firebase, cart, shop } = state;
    return { firebase, cart, shop };
  };

  const handleCheckOut = () => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      history.push('/page/checkout');
      closeHandler(false);
    } else {
      setErrorProps({
        autoHide: false,
        buttonText: t('logIn'),
        message: t('loginToContinue'),
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
            <b>{t('shoppingCart')}</b>
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
          {t('checkOut')}
        </IonButton>
      </IonFooter>
    </IonModal>
  );
};

export default CartModal;
