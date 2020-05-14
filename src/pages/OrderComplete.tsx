import React, { useState } from "react";
import { CartWithQty, RootState, Invoice, CartItem } from "../model/DomainModels";
import { ConvertCartWithQty } from "../services/CartService";
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
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { CartState } from "../services/FirebaseIniti";
import { connect, useSelector } from "react-redux";
import { closeOutline } from "ionicons/icons";
import { useHistory, useParams } from "react-router-dom";
import { useFirebase, useFirestoreConnect, FirestoreReducer } from "react-redux-firebase";
import CurrencyAmount from "../components/CurrencyAmount";


const OrderComplete: React.FC<CartState> = ({ shop, cart }) => {
  const firebase = useFirebase();

  const cartListWithQty: CartWithQty[] = ConvertCartWithQty(cart);
  const { invoice_id } = useParams<{ invoice_id: string }>();
  // const [ invoice,setInvoice ] = useState<Invoice>({} as Invoice);
  const cartListArray: Array<CartWithQty> = [];
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
      let ele = { ...element, qty: 1, img_url: "" }
      // ele.map((updateItem:CartItem) => ({
      //   ...updateItem,
      //   qty: 1       
      // }));
      // let ele:CartItem = {} as CartItem
      // ele.name = element.name;
      // ele.qty = 1;
      // ele.unit_price = element.unit_price;
      // ele.img_url = element.img_url;
      // ele.unit = element.unit;
      // ele.id = element.id;

      let item = cartItems.filter(function (item: CartItem) {
        return item.id == element.id;
      })
      if (item.length > 0) {
        let existedItem = item[0];
        existedItem.qty = existedItem.qty + 1;
        // let newList = cartItems;
        // cartItems = [...newList,existedItem]
      } else {
        cartItems.push(ele);
      }
    });
    console.log("ITEMS:" + JSON.stringify(cartItems));

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
            <b>{"INV " + invoice_id}</b>
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
        <IonGrid >
          <IonRow>
            <IonCol size="5" ><IonItem lines="none"></IonItem></IonCol>
            <IonCol size="2.5" ><IonItem text-center lines="none">Qty</IonItem></IonCol>
            <IonCol size="3.5" text-center><IonItem text-center lines="none">Total</IonItem></IonCol>
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
          {cartItems.map(item => {
            return (
              <IonRow>
                <IonCol size="5" >
                  <IonItem lines="none">{item.name}</IonItem>
                </IonCol>
                <IonCol size="2.5" ><IonItem lines="none">{item.qty}</IonItem></IonCol>
                <IonCol size="3.5" >
                  <IonItem lines="none"><CurrencyAmount amount={item.unit_price} /></IonItem>
                </IonCol>
              </IonRow>
            );
          })}
        </IonGrid>
        {/* </IonCardContent>
        </IonCard> */}
        <IonItem></IonItem>
        <IonItem className="total_cart" lines="none">Total incl GST <CurrencyAmount amount={invoice.total_amount} /></IonItem>
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
