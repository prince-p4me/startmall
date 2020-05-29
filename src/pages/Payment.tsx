import {
  IonContent,
  IonPage,
  IonButton,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonLabel,
  IonList, IonHeader,
  IonItemDivider
} from "@ionic/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Invoice, RootState } from "../model/DomainModels";
import { useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";
import StripePaymentContainer from "../components/StripePaymentContainer";
import { StatusBar } from '@ionic-native/status-bar';
import { blankCart } from '../reducers/CartAction';
import GoBack from "../components/GoBack";

const Payment: React.FC = () => {

  const dispatch = useDispatch();
  const { invoice_id } = useParams<{ invoice_id: string }>();
  let invoice: Invoice = {} as Invoice;
  const history = useHistory();

  useFirestoreConnect([{ collection: "Invoices", doc: invoice_id, storeAs: "Invoice" }]);

  const invoiceStore = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;

  const onPaymentInit = async () => {
    dispatch(blankCart());
    history.push(`/orders/${invoice_id}?payment=success`);
  };

  useEffect(() => {
    StatusBar.overlaysWebView(false);
    StatusBar.styleDefault();
  }, []);

  if (invoiceStore.ordered.Invoice && invoiceStore.ordered.Invoice.length > 0) {
    invoice = invoiceStore.ordered.Invoice[0]
  }

  return (
    <IonPage id="checkout">
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <GoBack />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItemDivider style={{ backgroundColor: "#f7f7f7", paddingTop: 10, paddingBottom: 10 }}>
            <IonIcon slot="start" src="assets/icon/1x/SVG/credit-card.svg"></IonIcon>
            <IonLabel color="primary" style={{ paddingLeft: 10 }}>Payment Detail</IonLabel>
          </IonItemDivider>
          <StripePaymentContainer
            paymentMode={'all'}
            completeHandler={onPaymentInit}
            invoice={invoice}
          >
          </StripePaymentContainer>
        </IonList>
      </IonContent>
    </IonPage >
  )
}

export default Payment;
