import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonImg,
  IonItem,
  IonText,
  IonCard
} from "@ionic/react";
import React from "react";
import "./Dashboard.css";
import { useHistory } from "react-router";

const ShopSelection: React.FC = () => {
  console.log("entering Dashboard");
  const history = useHistory();

  function handleShopClick() {
    history.push("/tabs/market");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
         <IonImg
          class="startmall_header "
          src="/assets/icon/1x/logo2.png"
        />
        
      </IonHeader>
      <IonText slot="right">SHOP CAN DELIVERY TO YOUR AREA</IonText>
      <IonContent fullscreen>
        <IonCard class="shop_card" onClick={handleShopClick}>
          <IonImg src="/assets/icon/1x/hi-fresh.png"></IonImg>
          <IonItem lines="none">
            <IonText>Provide Fruit .... </IonText>
          </IonItem>
          <IonItem lines="none">
            <IonText>No Incl Fruit .... </IonText>
          </IonItem>
          <IonItem lines="none">
            <IonText>Cutoff Order Fruit .... </IonText>
          </IonItem>
        </IonCard>
        <IonCard class="shop_card">
          <IonImg src="/assets/img/goldmark.png"></IonImg>
          <IonItem lines="none">
            <IonText>Provide Fruit .... </IonText>
          </IonItem>
          <IonItem lines="none">
            <IonText>No Incl Fruit .... </IonText>
          </IonItem>
          <IonItem lines="none">
            <IonText>Cutoff Order Fruit .... </IonText>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ShopSelection;
