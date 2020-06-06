import React from 'react';
import './ExploreContainer.css';
import { IonItem, IonCol, IonRow, IonGrid, IonText } from '@ionic/react';
import { ShopHeaderProps } from '../model/ComponentProps';
import { Markets } from '../model/DomainModels';
import { isLoaded } from 'react-redux-firebase';
import { FirestoreIonImg } from '../services/FirebaseStorage';

const ShopHeader: React.FC<ShopHeaderProps> = ({ shop }) => {
  let loadedShop = {} as Markets;

  if (isLoaded(shop)) {
    loadedShop = shop.shop;
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="4">
          <FirestoreIonImg src={loadedShop.img_url as string}></FirestoreIonImg>
        </IonCol>
        <IonCol size="7.8" style={{}}>
          <FirestoreIonImg className="category_payments" src="/assets/img/payments.png"></FirestoreIonImg>
          <IonItem lines="none">
            <IonText style={{ textAlign: 'right' }}>{loadedShop.free_delivery_conditions}</IonText>
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ShopHeader;
