import {
  IonContent,
  IonPage,
  IonButton,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonLabel, IonCheckbox,
  IonItem, IonListHeader,
  IonItemDivider,
  IonFooter,
  IonImg
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import ItemList from "../components/ItemList";
import Payment from "../components/Payment";
import { useHistory } from "react-router-dom";
import { closeOutline, cart } from "ionicons/icons";
import { CheckoutProps } from "../model/ComponentProps";
import { RootState, PaymentObj, CartStateType, ShopStateType, ProfileData, AddressObj } from "../model/DomainModels";
import ShopHeader from "../components/ShopHeader";
import ShopConditionAndOperatingHours from "../components/ShopConditionAndOperatingHours";
import { CartState, firebaseStore } from "../services/FirebaseIniti";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { string } from "prop-types";
import AddressForm from "../components/Address";
import { async } from "q";
import { ApplePay } from '@ionic-native/apple-pay/ngx';

const Checkout: React.FC<CheckoutProps> = () => {

  const firebase = useFirebase();
  const db = firebase.firestore();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const [addressObj, setAddress] = useState<AddressObj>();
  const [aggreement, setAggreement] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<string>("none");
  const [invoice_id, setInvoiceId] = useState<string>("");
  const [invoice, setInvoice] = useState<{}>({});

  let history = useHistory();
  // const [state] = useState<CartState>();

  const [cartState, setCartState] = useState<CartStateType>({
    cartItemList: [],
    cart: {
      total: 0.0
    }
  });

  const [shopState, setShop] = useState<ShopStateType>({
    shop: {
      id: "",
      name: "",
      opening_hour: [],
      free_delivery_conditions: "",
      img_url: "",
      store_address: "",
      support_postcodes: [],
      cut_off_terms: "",
      service_offering: "",
    }
  });

  function mapStateToProps(state: CartState) {
    const { firebase, cart, shop, address } = state;
    setCartState(cart);
    setShop(shop);
    return { firebase, cart, shop, address };
  }

  const CartItemList = connect(mapStateToProps)(ItemList);
  const ShopHeaderWithShop = connect(mapStateToProps)(ShopHeader);
  const EnhancedCondition = connect(mapStateToProps)(ShopConditionAndOperatingHours);
  // const AddressComponent = connect(mapStateToProps)(Address);

  function writeUserData(my_auth: any): Promise<void> {
    let json_auth = JSON.parse(JSON.stringify(my_auth));
    let user: ProfileData = {
      providerId: json_auth.providerData[0].providerId,
      display_name: json_auth.displayName, //displayName
      payment_detail: "", //
      contact_mobile: "87687687687",
      address: addressObj,
      photo_url: json_auth.photoURL, //photoURL we get from firebase.auth() when sign in completed
      id: json_auth.uid, // uid  we get from firebase.auth() when sign in completed
      email: json_auth.email,
    };
    let invoice = {
      id: "",
      user_id: my_auth.uid,
      market_id: shopState.shop.id,
      market_name: shopState.shop.name,
      address: addressObj,
      total_amount: cartState.cart.total,
      platform_charges: 135.0,
      cut_off_terms: shopState.shop.cutoff_terms,
      delivery_date: "22 May 2020",
      order_date: "12 May 2020",
      status: "open",
      payment_status: "pending",
      cart_total_cost_inc_GST: cartState.cart.total,
      cart_items: cartState.cartItemList,
      batch_id: "",
      user: user,
      payment_type: paymentType
    };
    setInvoice(invoice);
    return db.collection("Users").doc(json_auth.uid).set(user).then((response) => {
      console.error("user updated:--" + JSON.stringify(response));
      return db.collection("Invoices").add(invoice).then((res) => {
        setInvoiceId(res.id);
        invoice.id = res.id;
        setInvoice(invoice);
      }).catch((err) => {
        console.log("Not inserted+==" + JSON.stringify(err));
      });
    }).catch((error) => {
      console.error("User not found");
    })
  }

  const handleComplete = async () => {
    if (paymentType == "" || paymentType == "none") {
      alert("Please select any payment option");
      return
    };
    if (!aggreement) {
      alert("Please check our aggreement");
      return;
    }
    try {
      await writeUserData(auth);
      history.push("/orders");
      console.clear();
      console.log("Successfully inserted");
    } catch (error) {
      console.log("Can't insert the data for invoice");
    }
  };

  function renderInvoice() {

  }

  const completePayment = async () => {
    // This block is optional -- only if you need to update order items/shipping
    // methods in response to shipping method selections
    // try {
    //   const applePayTransaction = await ApplePay.makePaymentRequest({
    //     items,
    //     shippingMethods,
    //     merchantIdentifier,
    //     currencyCode,
    //     countryCode,
    //     billingAddressRequirement: ['name', 'email', 'phone'],
    //     shippingAddressRequirement: 'none',
    //     shippingType: 'shipping'
    //   });

    //   const transactionStatus = await completeTransactionWithMerchant(applePayTransaction);
    //   await this.applePay.completeLastTransaction(transactionStatus);
    // } catch {
    //   // handle payment request error
    //   // Can also handle stop complete transaction but these should normally not occur
    // }

    // // only if you started listening before
    // await ApplePay.stopListeningForShippingContactSelection();
  }

  // useEffect(() => {
  //   console.log("address is:-" + JSON.stringify(address));
  // }, [auth, address]);

  const closehandler = async () => {
    history.goBack();
  };


  return (
    <IonPage id="checkout" className="checkout_page">
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
        <ShopHeaderWithShop />
        <CartItemList />
        <IonItem lines="none">
          <IonLabel color="primary" style={{ textAlign: "right" }}>Total incl GST ${cartState.cart.total}</IonLabel>
        </IonItem>
        <EnhancedCondition />
        <AddressForm address={addressObj} onAddressChange={setAddress} />
        <br></br>
        <Payment payment={paymentType} onChange={setPaymentType} />
        <IonItem lines="none">
          <IonImg
            class="footer_pay"
            slot="start"
            src="/assets/icon/1x/payment.png"
          ></IonImg>
        </IonItem>
        <IonItem lines="none">
          <IonCheckbox slot="start" checked={aggreement} onIonChange={e => {
            setAggreement(e.detail.checked);
          }}></IonCheckbox>
          <IonLabel><p>I read and agree on our Terms and Conditions</p></IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonButtons slot="end">
            <IonButton
              color="secondary"
              fill="outline"
              onClick={handleComplete}
            >
              Continue Shopping
              </IonButton>
            <IonButton
              color="secondary"
              fill="solid"
              onClick={handleComplete}
            >
              Confirm
              </IonButton>
          </IonButtons>
        </IonItem>
        <br></br>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
