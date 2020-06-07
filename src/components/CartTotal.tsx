import React from 'react';
import { CartState } from '../services/FirebaseIniti';
import { IonItem } from '@ionic/react';
import CurrencyAmount from './CurrencyAmount';
import { useTranslation } from 'react-i18next';

const CartTotal: React.FC<CartState> = ({ cart }) => {
  const { t } = useTranslation();

  return (
    <IonItem>
      {t('total')}: <CurrencyAmount amount={cart.cart.total} />
    </IonItem>
  );
};

export default CartTotal;
