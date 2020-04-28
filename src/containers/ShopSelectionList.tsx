import React from "react";
import { ShopSelectionListProps } from "../model/ComponentProps";
import {
  IonList,
  IonCard,
  IonLabel,
  IonImg,
  IonItem,
  IonText
} from "@ionic/react";

const ShopSelectionList: React.FC<ShopSelectionListProps> = ({shops, handleShopClick}) => {
  console.log(shops);
  return (
    <IonList>
      {shops.map(obj => {
        return (
          <IonCard
            class="shop_card"
            onClick={() => {
              handleShopClick(obj.id);
            }}
          >
            <IonLabel>{obj.name}</IonLabel>
            <IonImg src={obj.img_url as string}></IonImg>
            <IonItem lines="none">
              <IonText>Provide: </IonText>
              <IonText>{obj.service_offering}</IonText>
            </IonItem>
            <IonItem lines="none">
              <IonText>Terms: </IonText>
              <IonText>{obj.terms_condition}</IonText>
            </IonItem>
          </IonCard>
        );
      })}
    </IonList>
  );
};

export default ShopSelectionList;
