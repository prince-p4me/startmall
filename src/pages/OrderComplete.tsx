import React from "react";
import { RootState, Invoice, CartItem } from "../model/DomainModels";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonFooter,
} from "@ionic/react";
import { CartState } from "../services/FirebaseIniti";
import { connect, useSelector } from "react-redux";
import { closeOutline } from "ionicons/icons";
import { useHistory, useParams } from "react-router-dom";
import { useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";


const OrderComplete: React.FC<CartState> = () => {

  const { invoice_id } = useParams<{ invoice_id: string }>();
  const cartItems: Array<CartItem> = [];
  let invoice: Invoice = {} as Invoice;
  let history = useHistory();
  // for (var cartlistitemqty in cartListWithQty) {
  //   cartListArray.push(cartListWithQty[cartlistitemqty]);
  //   console.log(cartlistitemqty);
  // }
  function closehandler() {
    history.push("/");
  }

  useFirestoreConnect([{ collection: "Invoices", doc: invoice_id, storeAs: "Invoice" }]);

  const invoiceStore = useSelector<RootState>(
    state => state.firestore
  ) as FirestoreReducer.Reducer;


  // setInvoice(invoice.ordered.Invoice[0])
  console.log("INVOICE: " + invoice_id);
  // console.log(JSON.stringify(invoice.ordered.Invoice[0]));

  if (invoiceStore.ordered.Invoice && invoiceStore.ordered.Invoice.length > 0) {
    // setInvoice(invoiceStore.ordered.Invoice[0])
    invoice = invoiceStore.ordered.Invoice[0]
    invoice.cart_items.forEach(element => {
      // let ele = element
      // let item = invoice.filter(function (item:CartItem) {
      //   if (item.id == element.id) {
      //     item.qty = 
      //   }
      //   return item.teacher_class_subject_id == element.id;
      // })
      // if (item.length > 0) {
      //   newData.push(item[0])
      // } else {
      //   newData.push(ele)
      // }
      cartItems.push(element);
    });

    // for (var item in invoice.cart_items) {

    //   cartItems.push(invoice.cart_items[item]);
    //   console.log(cartItems);
    // }
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={closehandler}>
              <IonIcon
                size="large"
                slot="icon-only"
                icon={closeOutline}
              ></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="start"></IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonItem className="order_cutoff" lines="none">
          <p>
            {invoice.cut_off_terms}
          </p>
        </IonItem>
        <IonItem className="order_cutoff" lines="none">
          {/* {invoice.cut_off_terms} */}
          <IonLabel>
            <b>{"Invoice Reference Numer: " + invoice_id}</b>
          </IonLabel>
        </IonItem>
        <IonItem className="order_completed" lines="none">
          <IonLabel>
            <b>Order Completed</b>
          </IonLabel>
        </IonItem>
        <IonItem className="order_completed">
          <p>
            We are processing your order at the moment. You will receieve the
            order confirmation from us shortly.
          </p>
        </IonItem>
        {/* <IonCard className="complete_order_card">
          <IonCardContent> */}
            <IonGrid>
              <IonRow>
                <IonCol size="4"></IonCol>
                <IonCol size="3">Qty</IonCol>
                <IonCol size="2">Total</IonCol>
              </IonRow>
              {/* {cartListArray.map(cartWithQty => {
            return (
              <IonRow>
                <IonCol size="4">
                  <IonItem lines="none">{cartWithQty.item.name}</IonItem>
                </IonCol>
                <IonCol size="3">{cartWithQty.count}</IonCol>
                <IonCol size="2">
                  <IonItem lines="none">${cartWithQty.item.unit_price}</IonItem>
                </IonCol>
              </IonRow>
            );
          })} */}
              {cartItems.map(cartWithQty => {
                return (
                  <IonRow>
                    <IonCol size="4">
                      <IonItem lines="none">{cartWithQty.name}</IonItem>
                    </IonCol>
                    <IonCol size="3">{1}</IonCol>
                    <IonCol size="2">
                      <IonItem lines="none">${cartWithQty.unit_price}</IonItem>
                    </IonCol>
                  </IonRow>
                );
              })}
            </IonGrid>
          {/* </IonCardContent>
        </IonCard> */}
        <IonItem></IonItem>
        <IonItem className="total_cart" lines="none">Total incl GST ${invoice.total_amount}</IonItem>
      </IonContent>
      <IonFooter>
        <IonButton expand="full" onClick={() => history.push("/")}>Continue Shopping</IonButton>
      </IonFooter>
    </IonPage>
  );
};

function mapStateToProps(state: CartState) {
  const { firebase, cart, shop } = state;
  return { firebase, cart, shop };
}

export default connect(mapStateToProps)(OrderComplete);
