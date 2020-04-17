import React from "react";
import { IonItem, IonItemDivider, IonList, IonCheckbox } from "@ionic/react";

interface PaymentProps {}

const Payment: React.FC<PaymentProps> = () => {
  return (
    <IonList>
      <IonItemDivider>Direct Debit</IonItemDivider>

      <IonItem>
        <IonCheckbox></IonCheckbox>Bank Account number XXXXXX
      </IonItem>
      <IonItemDivider>Cashs on delivery</IonItemDivider>
      <IonItem>
        <IonCheckbox></IonCheckbox>Cash on Delivery
      </IonItem>
      <IonItemDivider>Pay by Visa / Master</IonItemDivider>
      <IonItem>
        <IonCheckbox></IonCheckbox>Powered by Paypal
      </IonItem>
      <IonItem>
        <IonCheckbox></IonCheckbox>Agree on our Terms and Conditions
      </IonItem>
    </IonList>
  );
};

export default Payment;
