import React from 'react';
import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
import { basket } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import GoBack from './GoBack';
import { MarketHeaderProps } from '../model/ComponentProps';

import './MarketHeader.css';

const MarketHeader: React.FC<MarketHeaderProps> = ({ setShowModal, shop, CartCounter, showTerms = true }) => {
  const { t } = useTranslation();

  return (
    <IonHeader>
      <IonToolbar color="secondary">
        <IonButtons slot="end">
          <IonButton onClick={() => setShowModal(true)} slot="start" className={'cart-button'}>
            <IonIcon size="medium" slot="icon-only" icon={basket}></IonIcon>
            <CartCounter />
          </IonButton>
          <IonMenuToggle>
            <IonButton>
              <IonIcon slot="start" src="assets/icon/logo_small.svg"></IonIcon>
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        <IonButtons slot="start">
          <GoBack />
        </IonButtons>
        {showTerms && (
          <IonTitle class="shop_header_condition" size="large">
            <p className={'terms'}>
              {t('cutOff')} : {shop.cut_off_terms}
            </p>
            <p className={'terms'}>
              {t('delivery')} : {shop.delivery_terms}
            </p>
          </IonTitle>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default MarketHeader;
