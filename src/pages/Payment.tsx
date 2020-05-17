import {
  IonContent,
  IonPage,
  IonButton,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonLabel,
  IonCheckbox,
  IonItem,
  IonImg,
  IonLoading,
  IonList,
  IonItemDivider
} from "@ionic/react";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { closeOutline } from "ionicons/icons";
import { useHistory, useParams } from "react-router-dom";
import { Invoice, CartItem, RootState } from "../model/DomainModels";
import { useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";
import StripePaymentContainer from "../components/StripePaymentContainer";

const Payment: React.FC = () => {

  const { invoice_id } = useParams<{ invoice_id: string }>();
  const cartItems: Array<CartItem> = [];
  const invoice: Invoice = {} as Invoice;
  const history = useHistory();

  useFirestoreConnect([{ collection: "Invoices", doc: invoice_id, storeAs: "Invoice" }]);

  const invoiceStore = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;

  const closehandler = async () => {
    history.goBack();
  };

  return (
    <IonPage id="checkout">
      <IonToolbar color="secondary">
        <IonButtons slot="end">
          <IonButton onClick={closehandler}>
            <IonIcon
              size="large"
              slot="icon-only"
              icon={closeOutline}
            ></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <IonList>
          <IonItemDivider style={{ backgroundColor: "#f7f7f7", paddingTop: 10, paddingBottom: 10 }}>
            <IonIcon slot="start" src="assets/icon/1x/SVG/credit-card.svg"></IonIcon>
            <IonLabel color="primary" style={{ paddingLeft: 10 }}>Payment Detail</IonLabel>
          </IonItemDivider>
          <StripePaymentContainer paymentMode={'applePay'} completeHandler={(res: any) => console.log(res)} ></StripePaymentContainer>
        </IonList>
      </IonContent>
    </IonPage >
  )
}

export default Payment;