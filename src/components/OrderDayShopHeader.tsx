import React from 'react';
import { IonHeader, IonGrid, IonCol, IonRow, IonIcon } from '@ionic/react';
import { ellipsisHorizontalCircleOutline } from 'ionicons/icons';

const OrderDayShopHeader: React.FC = () => {
  return (
    <IonHeader>
      <IonGrid class="orderDayShopHeader">
        <IonRow>
          <IonCol size="8">
            <IonGrid>
              <IonRow>
                <IonCol size="6">Cutoff Order</IonCol>
                <IonCol size="5">12pm </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">Delivery Day</IonCol>
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
