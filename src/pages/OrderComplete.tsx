import React from "react";
import {CartItem, Invoice, Market} from "../model/DomainModels";
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {CartState} from "../services/FirebaseIniti";
import {connect, useSelector} from "react-redux";
import {closeOutline, readerOutline} from "ionicons/icons";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useFirestoreConnect} from "react-redux-firebase";
import CurrencyAmount from "../components/CurrencyAmount";
import {DeliveryIcon, DispatchIcon, GreenTick} from "../components/tick/GreenTick";
import moment from "moment";


const OrderComplete: React.FC<CartState> = () => {

  const payment  = useLocation();
  const isPaymentSuccess = payment.search.indexOf("payment=success") > -1;

  const { invoice_id } = useParams<{ invoice_id: string }>();
  const cartItems: Array<CartItem> = [];
  let invoice: Invoice = {} as Invoice;
  let history = useHistory();
  function closehandler() {
    history.push("/");
  }

  useFirestoreConnect([
      { collection: "Invoices", doc: invoice_id, storeAs: "Invoice" },
      {collection: "Markets"}
  ]);
    let Invoice: any = useSelector<any>((state: any) => (state.firestore.data.Invoice));
    let Markets: any = useSelector<any>((state: any) => (state.firestore.data.Markets));
    let isLoading = true;
    let market = {} as Market

  if (Invoice ) {
    isLoading = false
    invoice = Invoice
    invoice.cart_items.forEach(element => {
      let ele = { img_url: "", ...element, qty: 1 }

      let item = cartItems.filter(function (item: CartItem) {
        return item.id === element.id;
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
    if(Markets){
        market = Markets[Invoice.market_id];
        // let Market: any = useSelector<any>((state: any) => (state.firestore.data.Markets[Invoice.market_id]));
    }

  }

  const address: any = invoice.address;


  return (
    <IonPage>
        <IonLoading isOpen={isLoading} message={"Please wait..."} />
      <IonHeader>
        <IonToolbar>
          <IonTitle class="order-title">
            {
              isPaymentSuccess ? 'Order Completed' : 'View Order'
            }
          </IonTitle>
          <IonButtons slot="end" className="toolbar-x">
            <IonButton onClick={closehandler}>
              <IonIcon
                size="large"
                slot="icon-only"
                icon={closeOutline}
              />
            </IonButton>
          </IonButtons>
          <IonButtons slot="start"></IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {
          isPaymentSuccess ?
              <>
                <IonItem className="order_cutoff" lines="none" >
                    <span >{invoice.delivery_terms}</span>
                </IonItem>
                <IonItem className="order_completed" lines="none">
                  <IonLabel>
                    <GreenTick />
                  </IonLabel>
                </IonItem>
                <IonItem className="order_cutoff" lines="none">
                  <IonLabel>
                    <b>{"INV: " + invoice_id}</b>
                  </IonLabel>
                </IonItem>
                <IonItem className="order_completed">
                  <p>
                    We are processing your order at the moment. You will receieve the
                    order confirmation from us shortly.
                  </p>
                </IonItem>
              </>
              :
              <>
                  <ul className="list-unstyled multi-steps">
                      <li className="active">
                          <GreenTick />
                          <IonLabel color="primary"><p className='margin-0'>Confirmed</p></IonLabel>
                      </li>
                      <li className="active">
                          <DispatchIcon />
                          <IonLabel color="primary"><p className='margin-0'>Dispatched</p></IonLabel>
                      </li>
                      <li>
                          <DeliveryIcon />
                          <IonLabel ><p className='margin-0'>Delivered</p></IonLabel>
                      </li>
                  </ul>

                  <IonItem lines="none">
                      <IonButton className="btn-track-delivery" expand="block" onClick={() => history.push("/")}>Track Delivery</IonButton>
                  </IonItem>
                  <IonItem className="order_address m-t-10 text-center" lines="none">
                      <IonText class="margin-0">Estimated Arrival:  {invoice.delivery_date}</IonText>
                  </IonItem>
                  <IonItem className="m-t-10" lines="none">
                      <IonImg src={market.img_url} style={{width: 50}} />
                      <IonLabel className="shop-header-title" color="secondary" style={{'textAlign': 'left', 'marginLeft': '15px','fontSize': '28px'}}>{market.name || ''}</IonLabel>
                  </IonItem>
                  <IonItem className="m-t-10"></IonItem>
              </>
        }
        <IonItem className="order_completed" lines="none">
          <IonLabel color="primary">
            <IonIcon
                className="m-r-5"
                slot="start"
                icon={readerOutline}
            />
            Order Summary
          </IonLabel>
        </IonItem>
        <IonGrid >
          <IonRow>
            <IonCol size="5" ><IonItem lines="none"></IonItem></IonCol>
            <IonCol size="2.5" ><IonItem text-center lines="none">Qty</IonItem></IonCol>
            <IonCol size="3.5" text-center><IonItem text-center lines="none">Total</IonItem></IonCol>
          </IonRow>
          {cartItems.map(item => {
            return (
              <IonRow key={item.id}>
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
        <IonItem />
        <IonRow >
          <IonCol size="7.5" >
            <IonItem lines="none"><IonLabel class="ion-text-right">Total incl GST</IonLabel></IonItem>
          </IonCol>
          <IonCol size="3.5" >
            <IonItem lines="none"><IonLabel><CurrencyAmount amount={invoice.total_amount} /></IonLabel></IonItem>
          </IonCol>
        </IonRow>

        {
          address ?
              <>
                <IonItem className="order_completed" lines="none">

                  <IonLabel color="primary">
                    <IonImg src="/assets/icon/1x/SVG/delivery.svg" class="svg-img-icon" />
                    Delivery Details
                  </IonLabel>
                </IonItem>
                <IonItem className="order_address" lines="none">
                  <IonText class="margin-0">{address.name}</IonText> <br />
                </IonItem>
                <IonItem className="order_address" lines="none">
                  <IonText class="margin-0">{address.address1}</IonText>
                </IonItem>
                { address.address2? <IonItem className="order_address" lines="none"><IonLabel class="margin-0">{}</IonLabel></IonItem>: <></> }
                <IonItem className="order_address" lines="none">
                  <IonText class="margin-0">{address.state}   {address.postcode}</IonText>
                </IonItem>
                <IonItem className="order_address" lines="none">
                  <IonText class="margin-0">Mobile:  {address.phone}</IonText>
                </IonItem>

                <IonItem className="order_address" lines="none" />
                  {
                      invoice.order_date &&
                      <IonItem className="order_address" lines="none">
                        <IonText class="margin-0">Order Date: {moment((invoice.order_date as any).toDate()).format('DD MMM YYYY')}</IonText>
                      </IonItem>
                  }
                  {
                      invoice.delivery_date &&
                        <IonItem className="order_address" lines="none">
                          <IonText class="margin-0">Estimated Arrival: {moment((invoice.delivery_date as any).toDate()).format('DD MMM YYYY')}</IonText>
                        </IonItem>
                  }
              </>
              :
              <></>
        }

        <IonButton className="btn-continue-shopping" expand="block" onClick={() => history.push("/")}>Continue Shopping</IonButton>
      </IonContent>


    </IonPage>
  );
};

function mapStateToProps(state: CartState) {
  const { firebase, cart, shop } = state;
  return { firebase, cart, shop };
}

export default connect(mapStateToProps)(OrderComplete);
