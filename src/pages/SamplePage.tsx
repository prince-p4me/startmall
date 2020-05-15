import {
  IonHeader,
  IonContent,
  IonPage,
  IonFooter
} from "@ionic/react";
import React from "react";

interface SamplePageProps { }
const WishList: React.FC<SamplePageProps> = () => {
  return (
    <IonPage>
      <IonHeader></IonHeader>

      <IonContent></IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default WishList;
