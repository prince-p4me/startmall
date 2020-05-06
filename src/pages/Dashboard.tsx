import {
  IonContent,
  IonPage,
  IonImg,
  IonItem,
  IonInput,
  IonButton,
  IonFooter
} from "@ionic/react";
import React, { useState } from "react";
import MainHeader from "../components/MainHeader";

const Dashboard: React.FC = () => {
  console.log("entering Dashboard");
  const [postcode] = useState("");
  // SplashScreen.show({
  //   showDuration: 2000,
  //   autoHide: true
  // });
  return (
    <IonPage>
      <MainHeader />

      <IonContent fullscreen>
        <IonImg src="/assets/icon/1x/cover.png" />

        <IonItem>
          <IonInput
            placeholder="Enter postcode to search"
            value={postcode}
          ></IonInput>
          <IonButton> Search</IonButton>
        </IonItem>
        <IonImg src="/assets/img/instructions.png" />
      </IonContent>
      <IonFooter>
        <IonItem lines="none">
          <IonImg
            class="footer_pay"
            slot="start"
            src="/assets/icon/1x/payment.png"
          ></IonImg>
          <IonButton slot="end"> Order now </IonButton>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default Dashboard;
