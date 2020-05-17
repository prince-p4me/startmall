import React from "react";
import { IonItem, IonItemDivider, IonIcon, IonRadioGroup, IonRadio, IonLabel, IonList } from "@ionic/react";
import { PaymentProps } from "../model/ComponentProps";
import { chevronForwardOutline } from 'ionicons/icons';

const Payment: React.FC<PaymentProps> = ({ payment, onChange }) => {
  return (
    <IonList>
      <IonItemDivider style={{ backgroundColor: "#f7f7f7", paddingTop: 10, paddingBottom: 10 }}>
        <IonIcon slot="start" src="assets/icon/1x/SVG/credit-card.svg"></IonIcon>
        <IonLabel color="primary" style={{ paddingLeft: 10 }}>HOW TO PAY?</IonLabel>
      </IonItemDivider>
      <IonRadioGroup value={payment} onIonChange={e => onChange(e.detail.value)}>

        <IonItem lines="none">
          <IonRadio slot="start" value="direct_debit"></IonRadio>
          <IonLabel>
            <p>Direct Debit</p>
            <p>Bank Account number XXXX 1234</p>
          </IonLabel>
          <IonIcon slot="end" color="primary" icon={chevronForwardOutline}></IonIcon>
        </IonItem>
        <IonItem lines="none">
          <IonRadio slot="start" value="visa_master"></IonRadio>
          <IonLabel>
            <p>Debit or Credit card XXXX 4321</p>
          </IonLabel>
          <IonIcon slot="end" color="primary" icon={chevronForwardOutline}></IonIcon>
        </IonItem>
        <IonItem lines="none">
          <IonRadio slot="start" value="applepay"></IonRadio>
          <IonLabel>
            <p>Apple Pay</p>
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonRadio slot="start" value="cod"></IonRadio>
          <IonLabel><p>Cash on Delivery</p></IonLabel>
        </IonItem>
      </IonRadioGroup>
    </IonList>
  );
};

export default Payment;
