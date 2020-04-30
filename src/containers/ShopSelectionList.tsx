import React from "react";
import { ShopSelectionListProps } from "../model/ComponentProps";
import {
  IonList,
  IonCard,
  IonImg,
  IonItem,
  IonText
} from "@ionic/react";

const ShopSelectionList: React.FC<ShopSelectionListProps> = ({
  shops,
  handleShopClick
}) => {
  console.log(shops);
  return (
    <IonList className="shop_selection">
      {shops.map(obj => {
        return (
          <IonCard
            class="shop_card"
            onClick={() => {
              handleShopClick(obj);
            }}
          >
            <IonImg src={obj.img_url as string} alt={obj.name}></IonImg>
            <IonItem lines="none">
              <IonText>Provide: </IonText>
            </IonItem>
            <IonItem lines="none">
              <IonText>{obj.service_offering}</IonText>
            </IonItem>
            <IonItem lines="none">
              <IonText>Terms: </IonText>
            </IonItem>
            <IonItem lines="none">
              <IonText>{obj.terms_condition}</IonText>
            </IonItem>
          </IonCard>
        );
      })}
    </IonList>
  );
};

export default ShopSelectionList;
