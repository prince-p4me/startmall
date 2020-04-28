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
import { ShopHeaderProps } from "../model/ComponentProps";

const ShopHeader: React.FC<ShopHeaderProps> = ({image_url}) => {
  return (
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonImg src={image_url}></IonImg>
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
