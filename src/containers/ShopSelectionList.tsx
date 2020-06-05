import React from "react";
import {ShopSelectionListProps} from "../model/ComponentProps";
import {IonCard, IonItem, IonList, IonText} from "@ionic/react";
import {FirestoreIonImg} from "../services/FirebaseStorage";
import {useTranslation} from "react-i18next";

const ShopSelectionList: React.FC<ShopSelectionListProps> = ({shops, handleShopClick}) => {

  const {t} = useTranslation();

  console.log(shops);
  return (
    <IonList className="shop_selection">
      {shops.map((obj, index) => {
        return (
          <IonCard
            class="shop_card"
            onClick={() => {
              handleShopClick(obj);
            }} key={index}
          >
            <FirestoreIonImg src={obj.img_url as string}></FirestoreIonImg>
            <IonItem lines="none">
              <IonText>{t('provide')}: </IonText>
            </IonItem>
            <IonItem lines="none">
              <IonText>{obj.service_offering}</IonText>
            </IonItem>
            <IonItem lines="none">
              <IonText>{t('terms')}: </IonText>
            </IonItem>
            <IonItem lines="none">
              <IonText>{obj.cut_off_terms}</IonText>
            </IonItem>
          </IonCard>
        );
      })}
    </IonList>
  );
};

export default ShopSelectionList;
