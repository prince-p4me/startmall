import React from 'react';
import { IonCol, IonGrid, IonHeader, IonIcon, IonRow } from '@ionic/react';
import { ellipsisHorizontalCircleOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

const OrderDayShopHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonHeader>
      <IonGrid class="orderDayShopHeader">
        <IonRow>
          <IonCol size="8">
            <IonGrid>
              <IonRow>
                <IonCol size="6">{t('cutoffOrder')}</IonCol>
                <IonCol size="5">12pm </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">{t('deliveryDay')}</IonCol>
                <IonCol size="5">9am-3pm </IonCol>
              </IonRow>
            </IonGrid>
          </IonCol>
          <IonCol size="2">
            <IonIcon size="large" icon={ellipsisHorizontalCircleOutline}></IonIcon>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonHeader>
  );
};

export default OrderDayShopHeader;
