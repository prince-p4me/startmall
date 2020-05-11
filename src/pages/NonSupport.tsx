import {
    IonHeader,
    IonContent,
    IonPage,
    IonFooter,
    IonImg
  } from "@ionic/react";
  import React from "react";
  
  interface NonSupportProps {}
  const NonSupport: React.FC<NonSupportProps> = () => {
    return (
      <IonPage className="nonsupport_page">
  
        <IonContent>
        <IonImg className="category_payments" src="/assets/img/payments.png"></IonImg>
         
        </IonContent>
      </IonPage>
    );
  };
  
  export default NonSupport;
  