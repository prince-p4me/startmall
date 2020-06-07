import React from 'react';
import { IonCol, IonGrid, IonItem, IonLabel, IonRow, IonSkeletonText, IonText, IonThumbnail } from '@ionic/react';

import { FirestoreIonImg } from '../services/FirebaseStorage';

const ShopHeader: React.FC<any> = ({ Market }) => {
  if (!Market) {
    return (
      <IonGrid className="shop-header">
        <IonRow>
          <IonCol size="4">
            <IonThumbnail class="skeleton-image">
              <IonSkeletonText animated />
            </IonThumbnail>
          </IonCol>
          <IonCol size="7.8" style={{}}>
            <IonLabel className="shop-header-title" color="secondary">
              <IonSkeletonText animated />
            </IonLabel>
            <IonItem lines="none" className="shop-header-free_delivery_conditions">
              <IonSkeletonText animated />
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  }
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="4">
          <FirestoreIonImg src={Market.img_url as string}></FirestoreIonImg>
        </IonCol>
        <IonCol size="7.8" style={{}}>
          <IonLabel className="shop-header-title" color="secondary">
            {Market.name || ''}
          </IonLabel>
          <IonItem className="shop-header-free_delivery_conditions" lines="none">
            <IonText style={{ textAlign: 'right', display: 'block', width: '100%' }}>
              {Market.free_delivery_conditions}
            </IonText>
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ShopHeader;
