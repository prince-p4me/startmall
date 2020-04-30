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
import { Markets } from "../model/DomainModels";
import { isLoaded } from "react-redux-firebase";

const ShopHeader: React.FC<ShopHeaderProps> = ({ shop }) => {
  var loadedShop = {} as Markets;

  if (isLoaded(shop)) {
    loadedShop = shop.shop;
  }

  console.log(loadedShop);

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="4">
          <IonImg src={loadedShop.img_url as string}></IonImg>
        </IonCol>
        <IonCol size="7">
          <IonImg className="category_payments" src="/assets/img/payments.png"></IonImg>
          <IonItem lines="none">
            <IonText>{loadedShop.free_delivery_conditions}</IonText>
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ShopHeader;
