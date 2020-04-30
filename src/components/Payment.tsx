import React from "react";
import { IonItem, IonItemDivider, IonList, IonCheckbox } from "@ionic/react";
import { PaymentProps } from "../model/ComponentProps";

const Payment: React.FC<PaymentProps> = () => {
  return (
    <IonList>
      <IonItemDivider>Direct Debit</IonItemDivider>

      <IonItem lines="none">
        <IonCheckbox></IonCheckbox>Bank Account number XXXXXX
      </IonItem>
      <IonItem lines="none">
        <IonCheckbox></IonCheckbox>Cash on Delivery
      </IonItem>
      <IonItem lines="none">
        <IonCheckbox></IonCheckbox>I read and agree on our Terms and Conditions
      </IonItem>
    </IonList>
  );
};

export default Payment;
