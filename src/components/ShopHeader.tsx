import React from "react";
import "./ExploreContainer.css";
import {
  IonItem,
  IonCol,
  IonRow,
  IonGrid,
  IonText,
  IonImg
} from "@ionic/react";

const ShopHeader: React.FC = () => {
  return (
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonImg src="/assets/img/hifreshlogo.png"></IonImg>
          </IonCol>
          <IonCol>
             <IonImg src="/assets/img/payments.png"></IonImg>
            <IonItem lines="none">
              <IonText>
                Over $ 100 Free Delivery to Sydney Metro
              </IonText>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
  );
};

export default ShopHeader;
