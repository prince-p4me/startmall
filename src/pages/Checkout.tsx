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
  IonTitle
} from "@ionic/react";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import ItemList from "../components/ItemList";
import { useHistory } from "react-router-dom";
import { closeOutline } from "ionicons/icons";
import { CheckoutProps, ErrorProps } from "../model/ComponentProps";
import {
  RootState,
  CartStateType,
  ShopStateType,
  ProfileData,
  AddressObj
} from "../model/DomainModels";
import ShopHeader from "../components/ShopHeader";
import ShopConditionAndOperatingHours from "../components/ShopConditionAndOperatingHours";
import { CartState } from "../services/FirebaseIniti";
import { useFirebase, isEmpty } from "react-redux-firebase";
import AddressForm from "../components/Address";
import CurrencyAmount from "../components/CurrencyAmount";
import ErrorDisplay from "../components/ErrorDisplay";

interface MockInvoice {
  // TODO: Please fix the DomainModels > Invoice object same as below write invoice function
  id: string;
  [key: string]: string | number | [] | any | null;
}

const Checkout: React.FC<CheckoutProps> = () => {
  const firebase = useFirebase();
  const db = firebase.firestore();
  const auth = useSelector<RootState>(state => state.firebase.auth);
  const [addressObj, setAddress] = useState<AddressObj>({ isValidAddress1: true, isValidNumber: true } as AddressObj);
  const [aggreement, setAggreement] = useState<boolean>(false);
  const [paymentType] = useState<string>("none");
  const [, setInvoiceId] = useState<string>("");
  const [, setInvoice] = useState<MockInvoice>({} as MockInvoice);
  const [showLoading, setShowLoading] = useState(false);
  // const [showError, setShowError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [errorProps, setErrorProps] = useState<ErrorProps>({} as ErrorProps);

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
      delivery_terms:"",
      service_offering: ""
    }
  });

  function mapStateToProps(state: CartState) {
    const { firebase, cart, shop, address } = state;
    setCartState(cart);
    setShop(shop);
    return { firebase, cart, shop, address };
  }

  const [CartItemList] = useState<React.ElementType>(connect(mapStateToProps)(ItemList));
  const [ShopHeaderWithShop] = useState<React.ElementType>(connect(mapStateToProps)(ShopHeader));
  const [EnhancedCondition] = useState<React.ElementType>(connect(mapStateToProps)(
    ShopConditionAndOperatingHours
  ));

  // const AddressComponent = connect(mapStateToProps)(Address);

  function writeUserData(my_auth: any): Promise<void> {
    let json_auth = JSON.parse(JSON.stringify(my_auth));
    let user: ProfileData = {
      providerId: json_auth.providerData[0].providerId,
      display_name: json_auth.displayName, //displayName
      payment_detail: "", //
      contact_mobile: "",
      address: addressObj,
      photo_url: json_auth.photoURL, //photoURL we get from firebase.auth() when sign in completed
      id: json_auth.uid, // uid  we get from firebase.auth() when sign in completed
      email: json_auth.email
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
      delivery_terms: shopState.shop.delivery_terms,
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
    return db
      .collection("Users")
      .doc(json_auth.uid)
      .set(user)
      .then(response => {
        console.error("user updated:--" + JSON.stringify(response));
        return db
          .collection("Invoices")
          .add(invoice)
          .then(res => {
            setInvoiceId(res.id);
            invoice.id = res.id;
            setInvoice(invoice);
            history.push("/payment/" + res.id);
            console.clear();
            console.log("Successfully inserted");
            setShowLoading(false);
          })
          .catch(err => {
            console.log("Not inserted+==" + JSON.stringify(err));
          });
      })
      .catch(() => {
        console.error("User not found");
      });
  }

  const handleComplete = async () => {
    setShowLoading(true);
    if (!addressObj.address1 || addressObj.address1 === "") {
      // alert("Please Type Address Line 1");
      // setErrorMessage("Please Type Address Line 1")
      // setShowError(true)
      setErrorProps({
        message: "Please Type Address Line 1",
        showError: true,
        type: 1,
        autoHide: true,
        buttonText:""
      })
      setAddress({ ...addressObj, isValidAddress1: false })
      setShowLoading(false);
      return;
    }
    if (!addressObj.phone || addressObj.phone === "") {
      // alert("Please Type the Contact person number");
      // setErrorMessage("Please Type the Contact person number")
      // setShowError(true)
      setErrorProps({
        message: "Please Type the Contact person number",
        showError: true,
        type: 1,
        autoHide: true,
        buttonText:""
      })
      setAddress({ ...addressObj, isValidNumber: false })
      setShowLoading(false);
      return;
    }
    // if (paymentType === "" || paymentType === "none") {
    //   // alert("Please select any payment option");
    //   setErrorMessage("Please select any payment option")
    //   setShowError(true)
    //   setShowLoading(false);
    //   return;
    // }
    if (!aggreement) {
      // alert("Please check our aggreement");
      // setErrorMessage("Please check our aggreement")
      // setShowError(true)
      setErrorProps({
        message: "Please check our aggreement",
        showError: true,
        type: 1,
        autoHide: true,
        buttonText:""
      })
      setShowLoading(false);
      return;
    }

    if (cartState.cartItemList.length === 0) {
      // alert("Please add products in card");
      // setErrorMessage("Please add products in card")
      // setShowError(true)
      setErrorProps({
        message: "Please add products in card",
        showError: true,
        type: 1,
        autoHide: true,
        buttonText:""
      })
      setShowLoading(false);
      return;
    }

    if (isEmpty(auth)) {
      // alert("Please login to continue checkout");
      // setErrorMessage("Please login to continue checkout")
      // setShowError(true)
      setErrorProps({
        message: "Please login to continue checkout",
        showError: true,
        type: 2,
        autoHide: false,
        buttonText:"LOG IN"
      })
      setShowLoading(false);
      return;
    }
    try {
      await writeUserData(auth);
      setShowLoading(false);
    } catch (error) {
      console.log("Can't insert the data for invoice");
      console.log(error);
      setShowLoading(false);
    }
  };

  // function renderInvoice() {

  // }

  // const completePayment = async () => {
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
  // }

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
        <IonTitle text-center>
          <b>CHECK OUT</b>
        </IonTitle>
      </IonToolbar>
      <IonContent>
        <ShopHeaderWithShop />
        <CartItemList />
        <IonItem lines="none">
          <IonLabel color="primary" style={{ textAlign: "right" }}>
            {/* Total incl GST ${cartState.cart.total} */}
            Total incl GST {<CurrencyAmount amount={cartState.cart.total} />}
          </IonLabel>
        </IonItem>
        <EnhancedCondition />
        <AddressForm address={addressObj} onAddressChange={setAddress} />
        <br></br>
        {/* <Payment payment={paymentType} onChange={setPaymentType} /> */}
        <IonItem lines="none">
          <IonImg
            class="footer_pay"
            slot="start"
            src="/assets/icon/1x/payment.png"
          ></IonImg>
        </IonItem>
        <IonItem lines="none">
          <IonCheckbox
            slot="start"
            checked={aggreement}
            onIonChange={e => {
              setAggreement(e.detail.checked);
            }}
          ></IonCheckbox>
          <IonLabel>
            <p>I read and agree on our Terms and Conditions</p>
          </IonLabel>
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
            <br/>
            <IonButton color="secondary" fill="solid" onClick={handleComplete}>
              Proceed to Payment
            </IonButton>
          </IonButtons>

          <ErrorDisplay errorProps={errorProps} closeHandler={() => {setErrorProps({...errorProps, showError: false})}} eventHandler={() => { history.push("/login"); setErrorProps({...errorProps, showError: false}); }} />

          <IonLoading
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Please wait..."}
            duration={5000}
          />
        </IonItem>
        <br></br>

      </IonContent>
    </IonPage>
  );
};

export default Checkout;
